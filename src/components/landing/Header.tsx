import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, Menu } from "lucide-react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "center",
  });
}

const NAV_LINKS = [
  { id: "problem", label: "The Problem" },
  { id: "who-its-for", label: "Who It's For" },
  { id: "core-idea", label: "See how it works" },
] as const;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const goTo = (id: string) => {
    setMobileOpen(false);
    // Let the sheet start closing before scrolling so focus isn't trapped mid-motion
    window.requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-divider">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <img src="/logo/firmops.svg" alt="FirmOps" className="h-12 w-14" />
          <span className="font-semibold text-xl text-text-primary">FirmOps</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          <a
            href="#problem"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("problem");
            }}
          >
            The Problem
          </a>
          <a
            href="#who-its-for"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("who-its-for");
            }}
          >
            Who It's For
          </a>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="
              relative h-9 px-4 text-sm gap-2 group
              border-transparent bg-background rounded-lg
              before:absolute before:inset-0 before:rounded-lg before:p-[1px]
              before:bg-[linear-gradient(120deg,rgba(99,102,241,0.9),rgba(59,130,246,0.9),rgba(99,102,241,0.9))]
              before:opacity-70 before:content-['']
              after:absolute after:inset-[1px] after:rounded-[8px] after:bg-background after:content-['']
              hover:before:opacity-100 hover:shadow-[0_0_18px_rgba(99,102,241,0.45)]
              transition-all duration-300
            "
            onClick={() => scrollToId("sample-dashboard")}
          >
            <span className="relative z-10 flex items-center gap-2">
              View sample dashboard
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hidden lg:flex text-text-secondary hover:text-text-primary"
            onClick={() => scrollToId("core-idea")}
          >
            See how it works
          </Button>
          <Button
            type="button"
            size="sm"
            className="relative h-9 overflow-hidden group px-6 hidden sm:inline-flex"
            onClick={() => scrollToId("cta")}
          >
            <span className="relative z-10">Request early access</span>
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-[shimmer-sweep_6s_infinite] group-hover:animate-none" />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 text-text-primary"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)] p-0">
              <SheetHeader className="border-b border-divider px-6 py-4 text-left">
                <SheetTitle className="text-text-primary">Menu</SheetTitle>
                <SheetDescription className="text-text-secondary">
                  Jump to a section of the FirmOps landing page.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
                {NAV_LINKS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="rounded-lg px-3 py-3 text-left text-sm text-text-secondary transition-colors hover:bg-muted hover:text-text-primary"
                    onClick={() => goTo(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  className="rounded-lg px-3 py-3 text-left text-sm text-text-secondary transition-colors hover:bg-muted hover:text-text-primary"
                  onClick={() => goTo("sample-dashboard")}
                >
                  View sample dashboard
                </button>
                <div className="mt-4 px-1">
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => goTo("cta")}
                  >
                    Request early access
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
