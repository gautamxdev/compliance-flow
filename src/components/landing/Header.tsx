import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
          <Button variant="outline" size="sm" className="h-8 text-xs gap-2 group border-divider hover:bg-muted/50 transition-all">
            View sample dashboard
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden lg:flex text-text-secondary hover:text-text-primary">
            See how it works
          </Button>
          <Button size="sm" className="relative h-9 overflow-hidden group px-6">
            <span className="relative z-10">Request early access</span>
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-[shimmer-sweep_6s_infinite] group-hover:animate-none" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
