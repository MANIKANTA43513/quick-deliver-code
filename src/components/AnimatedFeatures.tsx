import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedFeatures Component - Recreation of Google Chrome's scroll animations
 * 
 * This component recreates the sophisticated scroll-driven animations from the 
 * Google Chrome homepage, featuring 4 main scenes that transition as the user scrolls.
 * 
 * Core technique: Uses position:sticky with a tall container to create the illusion
 * of staying in place while providing scroll area for animations.
 */
export const AnimatedFeatures = () => {
  // Container refs
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  
  // Scene 1 refs - "The browser built to be yours"
  const scene1Ref = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  
  // Scene 2 refs - "Extensions"
  const scene2Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const extensionsRef = useRef<HTMLDivElement>(null);
  
  // Scene 3 refs - "Take control of your tabs"
  const scene3Ref = useRef<HTMLDivElement>(null);
  const headline3Ref = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Scene 4 refs - "Helpful features built-in"
  const scene4Ref = useRef<HTMLDivElement>(null);
  const headline4Ref = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing effect
        pin: false, // We use sticky positioning instead
        anticipatePin: 1,
      }
    });

    // Initial setup - hide all scenes except scene 1
    gsap.set([scene2Ref.current, scene3Ref.current, scene4Ref.current], {
      opacity: 0,
      y: 50
    });

    // Scene 1: "The browser built to be yours" (0% - 25%)
    tl.fromTo(headline1Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(browserRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3"
    )
    .fromTo(colorPickerRef.current,
      { opacity: 0, rotation: -10 },
      { opacity: 1, rotation: 0, duration: 0.4, ease: "power2.out" }, "-=0.2"
    )

    // Transition to Scene 2 (25% - 50%)
    .to([headline1Ref.current, scene1Ref.current], {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.in"
    }, "+=0.5")
    .to(scene2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .fromTo(headline2Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(extensionsRef.current?.children || [],
      { opacity: 0, scale: 0.8, rotation: 5 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 0.4, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      }, "-=0.3"
    )

    // Transition to Scene 3 (50% - 75%)
    .to([headline2Ref.current, scene2Ref.current], {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.in"
    }, "+=0.5")
    .to(scene3Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .fromTo(headline3Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(tabsRef.current?.children || [],
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.4, 
        stagger: 0.08,
        ease: "power2.out" 
      }, "-=0.3"
    )

    // Transition to Scene 4 (75% - 100%)
    .to([headline3Ref.current, scene3Ref.current], {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.in"
    }, "+=0.5")
    .to(scene4Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .fromTo(headline4Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(featuresRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.4, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      }, "-=0.3"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    // Main container - 4x viewport height for scroll area
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: '400vh' }}
    >
      {/* Sticky container - stays in center of viewport */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Scene 1: The browser built to be yours */}
        <div 
          ref={scene1Ref}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 
            ref={headline1Ref}
            className="text-5xl md:text-7xl font-bold mb-12 gradient-text max-w-4xl leading-tight"
          >
            The browser built to be yours
          </h1>
          
          {/* Browser mockup */}
          <div 
            ref={browserRef}
            className="relative w-[600px] h-[400px] glass rounded-2xl border border-primary/20 overflow-hidden"
          >
            {/* Browser chrome */}
            <div className="h-12 bg-muted border-b border-border flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 bg-background rounded-lg mx-4 px-3 py-1 text-sm text-muted-foreground">
                chrome://settings/appearance
              </div>
            </div>
            
            {/* Browser content with color picker */}
            <div className="p-8 relative">
              <div className="text-left mb-6">
                <h3 className="text-xl font-semibold mb-2">Themes</h3>
                <p className="text-muted-foreground">Personalize your browser</p>
              </div>
              
              {/* Color picker widget */}
              <div 
                ref={colorPickerRef}
                className="absolute right-8 top-8"
              >
                <div className="glass p-4 rounded-xl border border-primary/20">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
                      'bg-orange-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'].map((color, i) => (
                      <div 
                        key={i}
                        className={`w-8 h-8 ${color} rounded-full cursor-pointer hover:scale-110 transition-transform`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-center text-muted-foreground">Custom Colors</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 2: Extensions */}
        <div 
          ref={scene2Ref}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 
            ref={headline2Ref}
            className="text-5xl md:text-7xl font-bold mb-12 gradient-text max-w-4xl leading-tight"
          >
            Extensions
          </h1>
          
          {/* Extension icons */}
          <div 
            ref={extensionsRef}
            className="flex gap-8 items-center"
          >
            {/* Google Translate */}
            <div className="glass p-6 rounded-2xl hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div className="text-sm font-medium">Translate</div>
            </div>
            
            {/* Arts & Culture */}
            <div className="glass p-6 rounded-2xl hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">🎨</span>
              </div>
              <div className="text-sm font-medium">Arts & Culture</div>
            </div>
            
            {/* Password Manager */}
            <div className="glass p-6 rounded-2xl hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">🔐</span>
              </div>
              <div className="text-sm font-medium">Password Manager</div>
            </div>
            
            {/* AdBlock */}
            <div className="glass p-6 rounded-2xl hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">🛡️</span>
              </div>
              <div className="text-sm font-medium">AdBlock</div>
            </div>
          </div>
        </div>

        {/* Scene 3: Take control of your tabs */}
        <div 
          ref={scene3Ref}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 
            ref={headline3Ref}
            className="text-5xl md:text-7xl font-bold mb-12 gradient-text max-w-4xl leading-tight"
          >
            Take control of your tabs
          </h1>
          
          {/* Tab groups mockup */}
          <div 
            ref={tabsRef}
            className="glass p-6 rounded-2xl w-[500px] border border-primary/20"
          >
            {/* Tab groups */}
            <div className="space-y-4">
              {/* Project Alpha group */}
              <div className="flex items-center gap-3 p-3 bg-blue-500/20 rounded-lg border-l-4 border-blue-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Project Alpha</span>
                <div className="ml-auto text-xs text-muted-foreground">3 tabs</div>
              </div>
              
              {/* Portfolio group */}
              <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border-l-4 border-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">Portfolio</span>
                <div className="ml-auto text-xs text-muted-foreground">5 tabs</div>
              </div>
              
              {/* Research group */}
              <div className="flex items-center gap-3 p-3 bg-purple-500/20 rounded-lg border-l-4 border-purple-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Research</span>
                <div className="ml-auto text-xs text-muted-foreground">7 tabs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 4: Helpful features built-in */}
        <div 
          ref={scene4Ref}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 
            ref={headline4Ref}
            className="text-5xl md:text-7xl font-bold mb-12 gradient-text max-w-4xl leading-tight"
          >
            Helpful features built-in
          </h1>
          
          {/* Feature cards */}
          <div 
            ref={featuresRef}
            className="flex gap-6"
          >
            {/* Password Manager */}
            <div className="glass p-6 rounded-2xl w-64 border border-primary/20 hover-lift">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">🔑</span>
              </div>
              <h3 className="font-semibold mb-2">Password Manager</h3>
              <p className="text-sm text-muted-foreground">Keep your passwords secure and accessible</p>
            </div>
            
            {/* Safety Check */}
            <div className="glass p-6 rounded-2xl w-64 border border-primary/20 hover-lift">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2">Safety Check</h3>
              <p className="text-sm text-muted-foreground">Review your security and privacy settings</p>
            </div>
            
            {/* Smart Downloads */}
            <div className="glass p-6 rounded-2xl w-64 border border-primary/20 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">⬇️</span>
              </div>
              <h3 className="font-semibold mb-2">Smart Downloads</h3>
              <p className="text-sm text-muted-foreground">Intelligent download management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};