"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PillNavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface PillNavProps {
  logo?: React.ReactNode;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  onItemClick?: (href: string) => void;
}

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  onItemClick
}: PillNavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label') as HTMLElement;
        const white = pill.querySelector('.pill-label-hover') as HTMLElement;

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();

        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.8, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.8, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.8, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, y: 0 });
    }

    // Initial load animation
    const logo = logoRef.current;
    const navItems = navItemsRef.current;

    if (logo) {
      gsap.set(logo, { scale: 0 });
      gsap.to(logo, { scale: 1, duration: 0.6, ease });
    }

    if (navItems) {
      gsap.set(navItems, { width: 0, overflow: 'hidden' });
      gsap.to(navItems, { width: 'auto', duration: 0.6, ease });
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;

    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    }) as gsap.core.Tween;
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;

    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    }) as gsap.core.Tween;
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease,
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
  };

  const handleItemClick = (href: string) => {
    setIsMobileMenuOpen(false);
    onItemClick?.(href);
  };

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 ${className}`}>
      <nav className="w-full flex items-center justify-between md:justify-start" aria-label="Primary">
        {/* Logo - Now on the LEFT */}
        <div
          ref={logoRef}
          className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden glass-morphism border border-primary/30 cursor-pointer order-first"
          style={{ width: '48px', height: '48px' }}
        >
          {logo}
        </div>

        {/* Desktop Nav - Now on the RIGHT with ml-auto */}
        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-auto glass-morphism border border-primary/20 backdrop-blur-xl"
          style={{ height: '48px' }}
        >
          <ul role="menubar" className="list-none flex items-stretch m-0 p-[4px] h-full gap-[4px]">
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              return (
                <li key={item.href} role="none" className="flex h-full">
                  <button
                    role="menuitem"
                    onClick={() => handleItemClick(item.href)}
                    className="relative overflow-hidden inline-flex items-center justify-center gap-2 h-full no-underline rounded-full box-border font-semibold text-sm leading-none tracking-wide whitespace-nowrap cursor-pointer px-4 text-foreground bg-gradient-to-r from-primary/20 to-blue-500/20 hover:from-primary/35 hover:to-blue-500/35 transition-all duration-300"
                    aria-label={item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none bg-gradient-to-br from-primary to-blue-500"
                      aria-hidden="true"
                      ref={el => {
                        circleRefs.current[i] = el;
                      }}
                    />

                    {item.icon && <span className="relative z-[2]">{item.icon}</span>}

                    <span className="label-stack relative inline-block leading-none z-[2]">
                      <span className="pill-label relative z-[2] inline-block leading-none">
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-foreground"
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>

                    {isActive && (
                      <span
                        className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-2 h-2 rounded-full z-[4] bg-gradient-to-r from-primary to-blue-500"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border border-primary/30 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative glass-morphism backdrop-blur-xl"
          style={{ width: '48px', height: '48px' }}
        >
          <span className="hamburger-line w-4 h-0.5 rounded origin-center bg-foreground" />
          <span className="hamburger-line w-4 h-0.5 rounded origin-center bg-foreground" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3.5rem] left-4 right-4 rounded-3xl shadow-2xl z-[998] origin-top glass-morphism border border-primary/30 backdrop-blur-xl bg-background/90"
      >
        <ul className="list-none m-0 p-2 flex flex-col gap-1">
          {items.map(item => {
            const isActive = activeHref === item.href;

            return (
              <li key={item.href}>
                <button
                  onClick={() => handleItemClick(item.href)}
                  className={`w-full flex items-center gap-3 py-3 px-4 text-sm font-medium rounded-2xl transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-r from-primary to-blue-500 text-foreground'
                      : 'bg-white/5 text-muted-foreground hover:bg-gradient-to-r hover:from-primary/30 hover:to-blue-500/30 hover:text-foreground'
                    }`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;

