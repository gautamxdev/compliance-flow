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
<Button
  variant="outline"
  size="sm"
  className="
  relative h-9 px-4 text-sm gap-2 group
  border-transparent
  bg-background
  rounded-lg
  before:absolute before:inset-0 before:rounded-lg
  before:p-[1px]
  before:bg-[linear-gradient(120deg,rgba(99,102,241,0.9),rgba(59,130,246,0.9),rgba(99,102,241,0.9))]
  before:opacity-70
  before:content-['']
  after:absolute after:inset-[1px] after:rounded-[8px]
  after:bg-background after:content-['']
  hover:before:opacity-100
  hover:shadow-[0_0_18px_rgba(99,102,241,0.45)]
  transition-all duration-300
"
  onClick={() => {
    const el = document.getElementById("sample-dashboard");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }}
>
  <span className="relative z-10 flex items-center gap-2">
    View sample dashboard
    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
  </span>
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
