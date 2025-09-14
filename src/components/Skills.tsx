import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Palette, 
  Code2, 
  Smartphone, 
  Database, 
  Globe 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Skills section with animated progress bars and floating elements
 */
export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement[]>([]);

  const skillCategories = [
    {
      id: 1,
      title: "Frontend Development",
      icon: <Code2 className="h-6 w-6 text-primary" />,
      skills: [
        { name: "React/TypeScript", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Vue.js", level: 85 },
        { name: "Angular", level: 80 }
      ]
    },
    {
      id: 2,
      title: "Animation & Design",
      icon: <Palette className="h-6 w-6 text-secondary" />,
      skills: [
        { name: "GSAP", level: 92 },
        { name: "Framer Motion", level: 88 },
        { name: "CSS Animations", level: 95 },
        { name: "Figma/Design", level: 85 }
      ]
    },
    {
      id: 3,
      title: "Performance & Tools",
      icon: <Zap className="h-6 w-6 text-accent" />,
      skills: [
        { name: "Webpack/Vite", level: 85 },
        { name: "Testing (Jest)", level: 80 },
        { name: "Web Performance", level: 90 },
        { name: "Git/DevOps", level: 87 }
      ]
    }
  ];

  useEffect(() => {
    // Animate section title
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
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate skill cards
    skillsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Animate progress bars
    progressRef.current.forEach((progress) => {
      if (progress) {
        const level = parseInt(progress.dataset.level || '0');
        gsap.fromTo(progress,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: progress,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  const addToSkillsRefs = (el: HTMLDivElement) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  const addToProgressRefs = (el: HTMLDivElement) => {
    if (el && !progressRef.current.includes(el)) {
      progressRef.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-primary rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-secondary rounded-full opacity-5 blur-3xl"></div>

      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold font-display gradient-text mb-6"
          >
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertise in modern frontend technologies and animation frameworks
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.id}
              ref={addToSkillsRefs}
              className="glass p-8 rounded-2xl hover:shadow-glow transition-all duration-500"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="glass p-3 rounded-xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary" className="glass">
                        {skill.level}%
                      </Badge>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        ref={addToProgressRefs}
                        data-level={skill.level}
                        className="h-full bg-gradient-primary rounded-full origin-left"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional tech stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8 gradient-text">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React", "TypeScript", "GSAP", "Tailwind CSS", "Next.js", 
              "Framer Motion", "Vite", "Git", "Figma", "Jest"
            ].map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="glass border-primary/20 text-lg px-4 py-2 hover:bg-primary/10 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};