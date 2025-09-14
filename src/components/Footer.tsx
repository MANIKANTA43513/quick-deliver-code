import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Github, 
  Linkedin, 
  Mail, 
  Heart, 
  ArrowUp,
  ExternalLink 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated footer with social links and back-to-top functionality
 */
export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      href: "https://github.com",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn", 
      href: "https://linkedin.com",
      color: "hover:text-blue-400"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      href: "mailto:developer@huemn.com",
      color: "hover:text-green-400"
    }
  ];

  const quickLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
    { label: "Resume", href: "#", external: true }
  ];

  useEffect(() => {
    // Animate footer content on scroll
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Back to top button visibility
    gsap.set(backToTopRef.current, { opacity: 0, scale: 0.8 });

    ScrollTrigger.create({
      start: "top -100",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === -1) {
          gsap.to(backToTopRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(backToTopRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in"
          });
        }
      }
    });

    // Floating animation for social icons
    const socialIcons = footerRef.current?.querySelectorAll('.social-icon');
    socialIcons?.forEach((icon, index) => {
      gsap.to(icon, {
        y: -5,
        duration: 2 + index * 0.3,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: index * 0.2
      });
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative mt-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary to-transparent"></div>

      <div 
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 py-16"
      >
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="glass p-3 rounded-xl">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold gradient-text">Frontend Dev</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Crafting beautiful, performant web experiences with modern technologies 
              and attention to detail.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-icon glass p-3 rounded-xl transition-all duration-300 ${link.color} hover:scale-110`}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                >
                  {link.label}
                  {link.external && <ExternalLink className="h-3 w-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Built With</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "GSAP", "Tailwind"].map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="glass border-primary/20"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              This portfolio showcases modern frontend development practices 
              and smooth animations.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>for the Huemn Interactive assignment</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 Frontend Developer</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <Button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 glass border-primary/20 hover:bg-primary/10 p-3 rounded-full"
        size="sm"
        variant="outline"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
};