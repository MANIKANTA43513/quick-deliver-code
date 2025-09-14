import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, Home, User, Mail, Briefcase } from 'lucide-react';

/**
 * Modern navigation with glassmorphism and smooth animations
 */
export const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { href: '#projects', label: 'Projects', icon: <Briefcase className="h-4 w-4" /> },
    { href: '#skills', label: 'Skills', icon: <User className="h-4 w-4" /> },
    { href: '#contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> }
  ];

  useEffect(() => {
    // Initial animation
    const tl = gsap.timeline();
    
    gsap.set([logoRef.current, menuRef.current], { opacity: 0, y: -20 });
    
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .to(menuRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3");

    // Scroll detection
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current,
          { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [isMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href === '#home' ? '#root' : href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass backdrop-blur-xl border-b border-primary/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              ref={logoRef}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              <div className="glass p-2 rounded-xl">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">Frontend Dev</span>
            </div>

            {/* Desktop Menu */}
            <div 
              ref={menuRef}
              className="hidden md:flex items-center gap-8"
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              <Button 
                className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
                onClick={() => scrollToSection('#contact')}
              >
                Hire Me
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden glass"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden glass border-t border-primary/10"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-200 font-medium p-2 rounded-lg hover:bg-primary/10"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                
                <Button 
                  className="bg-gradient-primary text-primary-foreground mt-2"
                  onClick={() => scrollToSection('#contact')}
                >
                  Hire Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  );
};