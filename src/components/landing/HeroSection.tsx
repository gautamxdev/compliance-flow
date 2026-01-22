import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useCallback } from "react";

const HeroSection = () => {
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // It's safe to omit cardRef from the dependency array because refs are stable and do not change between renders.
 const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
  if (!cardRef.current) return;

  const rect = cardRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateY = ((x - centerX) / centerX) * 4;
  const rotateX = ((centerY - y) / centerY) * 4;

  // NEW: background position (0–100%)
  const bgX = (x / rect.width) * 100;
  const bgY = (y / rect.height) * 100;

  setTilt({ rotateX, rotateY });
  setBgPos({ x: bgX, y: bgY });
}, []);
  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6 animate-fade-in">
            A structured workspace for CA firms to run compliance work without chaos.
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Clients, financial years, filings, and documents — all connected logically.
            <br />
            No folders. No Excel trackers. No guesswork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="h-12 px-8 text-base">
              Request early access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              See how it works
            </Button>
          </div>
        </div>

{/* Interface Mockup */}
<div
  className="mt-16 md:mt-20 animate-fade-in"
  style={{ animationDelay: "0.3s", perspective: "900px" }}
>
  {/* OUTER WRAPPER = BORDER */}
  <div
    ref={cardRef}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    onMouseEnter={handleMouseEnter}
    className="relative rounded-xl"
   style={{
  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
  transition: "transform 120ms ease-out",
  padding: "4px",
background: isHovering
  ? `
radial-gradient(
  120% 120% at ${bgPos.x}% ${bgPos.y}%,
  hsl(210 100% 98%),
  hsl(230 90% 82%),
  hsl(260 85% 65%)
)
  `
  : "hsl(220 13% 90%)",
}}
  >
    {/* REAL CARD */}
    <div
      className="bg-card rounded-[11px] shadow-sm overflow-hidden"
      style={{
        boxShadow: isHovering
          ? "0 8px 28px -8px hsl(220 15% 20% / 0.14)"
          : "0 1px 3px 0 hsl(220 15% 20% / 0.04)",
        transition: "box-shadow 160ms ease-out",
      }}
    >

            {/* Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-divider bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[hsl(0,72%,51%)]"></div>
                <div className="w-3 h-3 rounded-full bg-[hsl(45,93%,47%)]"></div>
                <div className="w-3 h-3 rounded-full bg-[hsl(142,71%,45%)]"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-text-tertiary">FirmOps— Client Dashboard</span>
              </div>
            </div>
            
            {/* Sidebar + Content */}
            <div className="flex">
              {/* Sidebar */}
              <div className="w-56 border-r border-divider bg-muted/20 p-4 hidden md:block">
                <div className="space-y-1">
                  <div className="px-3 py-2 bg-accent rounded-md text-sm font-medium">All Clients</div>
                  <div className="px-3 py-2 text-sm text-text-secondary hover:bg-accent/50 rounded-md">FY 2024-25</div>
                  <div className="px-3 py-2 text-sm text-text-secondary hover:bg-accent/50 rounded-md">Pending Filings</div>
                  <div className="px-3 py-2 text-sm text-text-secondary hover:bg-accent/50 rounded-md">Notices</div>
                </div>
                <div className="mt-6 pt-4 border-t border-divider">
                  <p className="text-xs text-text-tertiary uppercase tracking-wide mb-2 px-3">Clients</p>
                  <div className="space-y-1">
                    <div className="px-3 py-1.5 text-sm text-text-secondary">Sharma Enterprises</div>
                    <div className="px-3 py-1.5 text-sm text-text-secondary">Patel Industries</div>
                    <div className="px-3 py-1.5 text-sm text-text-secondary">Kumar & Sons</div>
                  </div>
                </div>
              </div>

              {/* Main Content - Table */}
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Sharma Enterprises — FY 2024-25</h3>
                  <span className="text-xs text-text-tertiary">4 tasks</span>
                </div>
                
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Task</th>
                        <th className="text-left px-4 py-2.5 font-medium text-text-secondary hidden sm:table-cell">Status</th>
                        <th className="text-left px-4 py-2.5 font-medium text-text-secondary hidden md:table-cell">Assigned</th>
                        <th className="text-left px-4 py-2.5 font-medium text-text-secondary hidden lg:table-cell">Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-divider">
                        <td className="px-4 py-3">GST R1 - October</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">Filed</span>
                        </td>
                        <td className="px-4 py-3 text-text-secondary hidden md:table-cell">Rahul M.</td>
                        <td className="px-4 py-3 text-text-tertiary hidden lg:table-cell">11 Nov 2024</td>
                      </tr>
                      <tr className="border-t border-divider">
                        <td className="px-4 py-3">GST R1 - November</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-warning/10 text-warning">Pending</span>
                        </td>
                        <td className="px-4 py-3 text-text-secondary hidden md:table-cell">Priya K.</td>
                        <td className="px-4 py-3 text-text-tertiary hidden lg:table-cell">11 Dec 2024</td>
                      </tr>
                      <tr className="border-t border-divider">
                        <td className="px-4 py-3">ITR Filing</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">Filed</span>
                        </td>
                        <td className="px-4 py-3 text-text-secondary hidden md:table-cell">Amit S.</td>
                        <td className="px-4 py-3 text-text-tertiary hidden lg:table-cell">31 Jul 2024</td>
                      </tr>
                      <tr className="border-t border-divider">
                        <td className="px-4 py-3">Tax Audit</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-text-secondary">In Progress</span>
                        </td>
                        <td className="px-4 py-3 text-text-secondary hidden md:table-cell">Rahul M.</td>
                        <td className="px-4 py-3 text-text-tertiary hidden lg:table-cell">30 Sep 2024</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default HeroSection;
