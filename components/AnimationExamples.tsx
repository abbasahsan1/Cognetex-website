import { BlurFade } from "./ui/blur-fade";
import { SplitText } from "./ui/split-text";
import { GradualSpacing } from "./ui/gradual-spacing";
import { ShimmerButton } from "./ui/shimmer-button";

/**
 * Example usage of the installed animation components
 * 
 * These components are designed to work seamlessly with the Cognetex Design System
 */

export function AnimationExamples() {
  return (
    <div className="space-y-12 p-8">
      {/* BlurFade Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">BlurFade Component</h2>
        <BlurFade delay={0.2} duration={0.8}>
          <div className="glass-morphism p-6 rounded-2xl">
            <p className="text-lg">
              This content fades in with a blur effect when scrolled into view.
            </p>
          </div>
        </BlurFade>
      </section>

      {/* SplitText Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">SplitText Component</h2>
        <SplitText
          text="Cognetex - Engineering Tomorrow's Technology"
          className="text-4xl font-bold"
          delay={0}
          duration={0.05}
          animateBy="char"
        />
      </section>

      {/* GradualSpacing Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">GradualSpacing Component</h2>
        <GradualSpacing
          text="INNOVATION"
          className="text-5xl font-bold bg-gradient-to-r from-white via-orange-100 to-[#E08A20] bg-clip-text text-transparent"
          delay={0}
          duration={0.5}
          delayMultiple={0.08}
        />
      </section>

      {/* ShimmerButton Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">ShimmerButton Component</h2>
        <div className="flex gap-4">
          <ShimmerButton
            shimmerColor="#E08A20"
            background="linear-gradient(135deg, rgba(224, 138, 32, 0.8), rgba(240, 160, 64, 0.9))"
          >
            Primary Button
          </ShimmerButton>
          
          <ShimmerButton
            shimmerColor="#F0A040"
            background="rgba(26, 24, 31, 0.8)"
            className="border border-[#E08A20]/30"
          >
            Secondary Button
          </ShimmerButton>
        </div>
      </section>

      {/* Combined Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Combined Effects</h2>
        <BlurFade delay={0.1}>
          <div className="glass-morphism p-8 rounded-3xl">
            <SplitText
              text="Code It. Scale It. Nail It."
              className="text-3xl font-bold mb-6"
              delay={0.2}
              duration={0.04}
              animateBy="word"
            />
            <p className="text-gray-300 mb-6">
              Experience the power of seamless animations combined with the Cognetex Design System.
            </p>
            <ShimmerButton>Get Started</ShimmerButton>
          </div>
        </BlurFade>
      </section>
    </div>
  );
}

/**
 * Usage in your components:
 * 
 * 1. BlurFade - Wrap any content that should fade in with blur
 *    <BlurFade delay={0.2} duration={0.8}>
 *      <YourContent />
 *    </BlurFade>
 * 
 * 2. SplitText - Animate text character by character or word by word
 *    <SplitText text="Your text" animateBy="char" />
 * 
 * 3. GradualSpacing - Animate text with spacing effects
 *    <GradualSpacing text="HEADING" />
 * 
 * 4. ShimmerButton - Interactive button with shimmer effect
 *    <ShimmerButton onClick={handleClick}>
 *      Button Text
 *    </ShimmerButton>
 * 
 * All components use the Cognetex Design System colors (#E08A20, #F0A040)
 * and follow the animation timing (var(--animation-easing-standard))
 */
