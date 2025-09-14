import { AnimatedFeatures } from '@/components/AnimatedFeatures';

/**
 * Main page for the Google Chrome Animation Recreation
 * Assignment for Huemn Interactive Pvt Ltd
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple navigation */}
      <nav className="fixed top-0 w-full z-50 glass backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
              <span className="text-xl font-semibold">Chrome Animation Recreation</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Huemn Interactive Assignment
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Main animated section */}
      <AnimatedFeatures />
      
      {/* Bottom spacer */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold gradient-text">Assignment Complete</h2>
          <p className="text-muted-foreground">Google Chrome scroll animations recreated</p>
          <div className="text-xs text-muted-foreground">
            Built with React + GSAP + TypeScript
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
