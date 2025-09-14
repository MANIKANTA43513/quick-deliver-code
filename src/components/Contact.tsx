import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send, 
  MapPin, 
  Phone,
  Calendar,
  CheckCircle 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact section with form animations and floating elements
 */
export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "developer@huemn.com",
      href: "mailto:developer@huemn.com"
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/developer",
      href: "https://github.com"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/developer",
      href: "https://linkedin.com"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Available Globally",
      href: null
    }
  ];

  useEffect(() => {
    // Animate title
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

    // Animate form and contact info
    gsap.fromTo([formRef.current, contactInfoRef.current],
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating animation for contact cards
    const contactCards = contactInfoRef.current?.children;
    if (contactCards) {
      Array.from(contactCards).forEach((card, index) => {
        gsap.to(card, {
          y: -10,
          duration: 2 + index * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
          delay: index * 0.3
        });
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission with animation
    const form = e.target as HTMLFormElement;
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<div class="flex items-center gap-2"><svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</div>';
      
      setTimeout(() => {
        submitBtn.innerHTML = '<div class="flex items-center gap-2"><svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Sent!</div>';
        
        setTimeout(() => {
          submitBtn.textContent = originalText || 'Send Message';
          form.reset();
        }, 2000);
      }, 1500);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-secondary rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold font-display gradient-text mb-6"
          >
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life with cutting-edge frontend development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card 
            ref={formRef}
            className="glass p-8 hover:shadow-glow transition-all duration-500"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
              <p className="text-muted-foreground">
                Let's discuss your project requirements
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input 
                    placeholder="Your name"
                    className="glass border-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    className="glass border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input 
                  placeholder="Project inquiry"
                  className="glass border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Tell me about your project..."
                  className="glass border-primary/20 focus:border-primary min-h-[120px]"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div 
            ref={contactInfoRef}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground">
                Available for freelance projects and full-time opportunities
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <Card 
                  key={info.label}
                  className="glass p-6 hover:shadow-subtle transition-all duration-300 hover-lift"
                >
                  <div className="flex items-center gap-4">
                    <div className="glass p-3 rounded-xl">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-muted-foreground">
                        {info.label}
                      </h4>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-foreground hover:text-primary transition-colors"
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-foreground">{info.value}</span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Availability status */}
            <Card className="glass p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-glow"></div>
                  <span className="font-semibold text-green-400">Available</span>
                </div>
                <Badge variant="secondary" className="glass">
                  <Calendar className="h-3 w-3 mr-1" />
                  Open for projects
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Currently accepting new projects starting Q4 2024
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};