import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b border-divider">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/logo/firmops.svg"
            alt="FirmOps"
            className="h-12 w-14"
          />
          <span className="font-semibold text-xl text-text-primary">
      FirmOps
    </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            The Problem
          </a>
          <a href="#who-its-for" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Who It's For
          </a>
        </nav>

        {/* CTA */}
        <Button size="sm" className="relative h-9 overflow-hidden group">
          <span className="relative z-10">Request Early Access</span>
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-[shimmer-sweep_4s_infinite]" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
