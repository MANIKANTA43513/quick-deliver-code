import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Zap, Palette, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Projects showcase section with scroll-triggered animations
 */
export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const projects = [
    {
      id: 1,
      title: "Animated Dashboard",
      description: "Real-time data visualization with smooth GSAP animations and interactive charts. Features glassmorphism design and responsive layouts.",
      technologies: ["React", "GSAP", "Chart.js", "Tailwind"],
      icon: <Zap className="h-8 w-8 text-primary" />,
      gradient: "bg-gradient-primary"
    },
    {
      id: 2,
      title: "Interactive Portfolio",
      description: "Modern portfolio website with advanced scroll animations, parallax effects, and smooth page transitions.",
      technologies: ["React", "Framer Motion", "TypeScript", "SCSS"],
      icon: <Palette className="h-8 w-8 text-secondary" />,
      gradient: "bg-gradient-secondary"
    },
    {
      id: 3,
      title: "Component Library",
      description: "Reusable component library with comprehensive documentation, theming support, and accessibility features.",
      technologies: ["React", "Storybook", "CSS-in-JS", "Jest"],
      icon: <Code2 className="h-8 w-8 text-accent" />,
      gradient: "bg-gradient-secondary"
    }
  ];

  useEffect(() => {
    const cards = cardsRef.current;

    // Animate title on scroll
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stagger animate project cards
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 100,
            rotationX: 15
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover animations
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      id="projects"
      ref={sectionRef} 
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary to-transparent"></div>
      
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold font-display gradient-text mb-6"
          >
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing modern frontend development with cutting-edge animations and user experience
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              ref={addToRefs}
              className="glass p-8 hover:shadow-glow transition-all duration-500 group overflow-hidden relative"
            >
              {/* Card gradient overlay */}
              <div className={`absolute inset-0 ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Project icon */}
                <div className="mb-6">
                  <div className="glass p-4 rounded-2xl w-fit">
                    {project.icon}
                  </div>
                </div>

                {/* Project details */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="glass border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="glass border-primary/20 hover:bg-primary/10 flex-1"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gradient-primary text-primary-foreground flex-1"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};