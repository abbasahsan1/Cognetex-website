"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

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
      gsap.set(menu, { height: 0, opacity: 0, display: 'none' });
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

    const menu = mobileMenuRef.current;

    if (menu) {
      if (newState) {
        gsap.set(menu, { display: 'block', height: 0, opacity: 0 });
        gsap.to(menu, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' });
      } else {
        gsap.to(menu, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(menu, { display: 'none' });
          }
        });
      }
    }
  };

  const handleItemClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const menu = mobileMenuRef.current;
    if (menu) {
        gsap.to(menu, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
              gsap.set(menu, { display: 'none' });
            }
          });
    }
    onItemClick?.(href);
  };

  return (
    <div className={`fixed top-4 left-0 right-0 z-50 px-4 flex justify-center ${className}`}>
      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
        <nav className="w-full flex items-center justify-between glass-morphism rounded-full p-2 border border-primary/20 backdrop-blur-xl bg-background/60 relative z-50">
          {/* Logo */}
          <div
            ref={logoRef}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden cursor-pointer"
            style={{ width: '48px', height: '48px' }}
          >
            {logo}
          </div>

          {/* Desktop Nav */}
          <div
            ref={navItemsRef}
            className="hidden md:flex items-center h-full"
          >
            <ul role="menubar" className="list-none flex items-center m-0 p-0 gap-1 h-full">
              {items.map((item, i) => {
                const isActive = activeHref === item.href;

                return (
                  <li key={item.href} role="none" className="flex h-full">
                    <button
                      role="menuitem"
                      onClick={() => handleItemClick(item.href)}
                      className="relative overflow-hidden inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm transition-all duration-300"
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
                        <span className="pill-label relative z-[2] inline-block leading-none text-foreground/80">
                          {item.label}
                        </span>
                        <span
                          className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-white"
                          aria-hidden="true"
                        >
                          {item.label}
                        </span>
                      </span>

                      {isActive && (
                        <span
                          className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-1 h-1 rounded-full z-[4] bg-primary"
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
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden rounded-full w-12 h-12 flex items-center justify-center text-foreground hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className="w-full mt-2 glass-morphism rounded-3xl overflow-hidden border border-primary/20 backdrop-blur-xl bg-background/90 absolute top-full left-0 z-40 hidden"
        >
          <ul className="list-none m-0 p-4 flex flex-col gap-2">
            {items.map(item => {
              const isActive = activeHref === item.href;

              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleItemClick(item.href)}
                    className={`w-full flex items-center gap-3 py-3 px-4 text-base font-medium rounded-xl transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
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
    </div>
  );
};

export default PillNav;

