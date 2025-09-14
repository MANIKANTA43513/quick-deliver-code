import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowDown, Code, Sparkles } from 'lucide-react';

/**
 * Hero Section Component
 * Features advanced GSAP animations and glassmorphism design
 */
export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initialize elements with hidden state
    gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
      opacity: 0,
      y: 50
    });

    gsap.set(floatingRef.current, {
      opacity: 0,
      scale: 0.8
    });

    // Animate hero elements in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(floatingRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.6");

    // Continuous floating animation for icons
    gsap.to(floatingRef.current, {
      y: -20,
      rotation: 5,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-secondary rounded-full opacity-15 blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main heading with gradient text */}
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold font-display mb-6 gradient-text leading-tight"
        >
          Interactive
          <br />
          Frontend
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafted with React, GSAP animations, and modern design principles.
          <span className="block mt-2 text-primary font-medium">
            Clean code • Smooth animations • Pixel perfect
          </span>
        </p>

        {/* Action buttons */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold"
            onClick={scrollToProjects}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="glass border-primary/20 hover:bg-primary/10 px-8 py-4 text-lg"
          >
            <Code className="mr-2 h-5 w-5" />
            Source Code
          </Button>
        </div>

        {/* Floating tech icons */}
        <div 
          ref={floatingRef}
          className="flex justify-center items-center gap-8 mb-8"
        >
          <div className="glass p-4 rounded-2xl hover-lift">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-12 h-12" />
          </div>
          <div className="glass p-4 rounded-2xl hover-lift" style={{ animationDelay: '0.5s' }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-12 h-12" />
          </div>
          <div className="glass p-4 rounded-2xl hover-lift" style={{ animationDelay: '1s' }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind" className="w-12 h-12" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-primary mx-auto cursor-pointer" onClick={scrollToProjects} />
        </div>
      </div>
    </section>
  );
};