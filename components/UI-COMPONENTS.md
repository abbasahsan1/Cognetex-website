# Cognetex UI Components

This directory contains reusable UI components for the Cognetex website, built with React, TypeScript, and Tailwind CSS.

## 📦 Installed Components

All components are designed to work seamlessly with the **Cognetex Design System** (Dark Copper palette).

### Animation Components

#### 1. **BlurFade** (`ui/blur-fade.tsx`)
Fade-in animation with blur effect on scroll.

```tsx
import { BlurFade } from "@/components/ui/blur-fade";

<BlurFade delay={0.2} duration={0.8} blur="6px" yOffset={6}>
  <div>Your content</div>
</BlurFade>
```

**Props:**
- `children`: React.ReactNode
- `delay`: number (default: 0) - Delay before animation starts
- `duration`: number (default: 0.6) - Animation duration in seconds
- `blur`: string (default: "6px") - Initial blur amount
- `yOffset`: number (default: 6) - Vertical offset in pixels
- `inView`: boolean (default: true) - Animate when scrolled into view

---

#### 2. **SplitText** (`ui/split-text.tsx`)
Animates text by splitting into characters or words.

```tsx
import { SplitText } from "@/components/ui/split-text";

<SplitText 
  text="Cognetex - Engineering Tomorrow's Technology"
  animateBy="char"
  delay={0}
  duration={0.05}
/>
```

**Props:**
- `text`: string - The text to animate
- `animateBy`: "char" | "word" (default: "char")
- `delay`: number (default: 0) - Initial delay
- `duration`: number (default: 0.05) - Stagger duration between elements

---

#### 3. **GradualSpacing** (`ui/gradual-spacing.tsx`)
Animates text with scaling and letter-spacing effects.

```tsx
import { GradualSpacing } from "@/components/ui/gradual-spacing";

<GradualSpacing 
  text="INNOVATION"
  delay={0}
  duration={0.5}
  delayMultiple={0.04}
/>
```

**Props:**
- `text`: string - The text to animate
- `delay`: number (default: 0) - Initial delay
- `duration`: number (default: 0.5) - Animation duration per character
- `delayMultiple`: number (default: 0.04) - Delay multiplier between chars

---

#### 4. **ShimmerButton** (`ui/shimmer-button.tsx`)
Interactive button with shimmer and mouse-tracking effects.

```tsx
import { ShimmerButton } from "@/components/ui/shimmer-button";

<ShimmerButton
  shimmerColor="#E08A20"
  background="linear-gradient(135deg, rgba(224, 138, 32, 0.8), rgba(240, 160, 64, 0.9))"
  onClick={handleClick}
>
  Get Started
</ShimmerButton>
```

**Props:**
- Extends all standard button props
- `shimmerColor`: string (default: "#E08A20")
- `shimmerSize`: string (default: "0.1em")
- `borderRadius`: string (default: "16px")
- `shimmerDuration`: string (default: "2s")
- `background`: string (default: Design System gradient)

---

## 🎨 Design System Integration

All components use the Cognetex Design System tokens:

- **Primary Accent**: `#E08A20`
- **Hover Accent**: `#F0A040`
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Duration**: `300ms` standard, `150ms` fast

### CSS Variables Used:
```css
--color-accent-primary: #E08A20;
--color-accent-hover: #F0A040;
--animation-duration-standard: 300ms;
--animation-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🚀 Usage Examples

### Hero Section with Animations

```tsx
import { BlurFade } from "@/components/ui/blur-fade";
import { SplitText } from "@/components/ui/split-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Hero() {
  return (
    <section>
      <BlurFade delay={0.1}>
        <SplitText 
          text="Cognetex"
          className="text-8xl font-bold"
          animateBy="char"
        />
      </BlurFade>
      
      <BlurFade delay={0.3}>
        <p className="text-xl text-gray-300">
          Engineering tomorrow's technology, today
        </p>
      </BlurFade>
      
      <BlurFade delay={0.5}>
        <ShimmerButton onClick={() => console.log('Clicked!')}>
          Get Started
        </ShimmerButton>
      </BlurFade>
    </section>
  );
}
```

### Service Cards with Staggered Animation

```tsx
import { BlurFade } from "@/components/ui/blur-fade";

const services = [
  { title: "AI Development", description: "..." },
  { title: "Full Stack", description: "..." },
  // ...
];

export function Services() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {services.map((service, index) => (
        <BlurFade key={index} delay={index * 0.1}>
          <div className="glass-morphism p-8 rounded-3xl">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        </BlurFade>
      ))}
    </div>
  );
}
```

---

## 📋 Installation Methods

### Method 1: Manual (Current)
Components are already installed in `components/ui/`. Just import and use them.

### Method 2: CLI (For Future Components)

**Using shadcn:**
```bash
npx shadcn@latest add https://reactbits.dev/r/ComponentName-TS-TW
```

**Using jsrepo:**
```bash
npx jsrepo add https://reactbits.dev/ts/tailwind/Category/ComponentName
```

**Supported variants:**
- `TS-TW` - TypeScript + Tailwind (Current project setup)
- `TS-CSS` - TypeScript + Plain CSS
- `JS-TW` - JavaScript + Tailwind
- `JS-CSS` - JavaScript + Plain CSS

---

## 🎯 Best Practices

1. **Use BlurFade for sections**: Wrap entire sections for smooth scroll-in effects
2. **Stagger animations**: Use incremental delays for lists (0.1s, 0.2s, 0.3s)
3. **Combine effects**: Layer BlurFade + SplitText for impactful hero sections
4. **Performance**: All components use `will-change` and CSS transforms for GPU acceleration
5. **Accessibility**: Components respect `prefers-reduced-motion` when implemented

---

## 🔧 Customization

All components accept standard React props and can be customized:

```tsx
// Custom styling
<BlurFade className="custom-class" style={{ ... }}>
  <Content />
</BlurFade>

// Override design system colors
<ShimmerButton 
  shimmerColor="#custom-color"
  background="custom-gradient"
>
  Button
</ShimmerButton>
```

---

## 📚 More Information

- [React Bits Documentation](https://reactbits.dev)
- [Cognetex Design System](./design-system.md)
- [Animation Examples](./AnimationExamples.tsx)

---

## 🐛 Troubleshooting

**Issue**: Animations not working
- Ensure `globals.css` includes the shimmer keyframe
- Check that Intersection Observer is supported

**Issue**: TypeScript errors
- Run `npm run type-check` to verify
- Ensure all prop types match the component interface

**Issue**: Styling conflicts
- Components use inline styles for animations
- Use `className` prop for additional Tailwind classes

---

**Built with ❤️ for Cognetex**
