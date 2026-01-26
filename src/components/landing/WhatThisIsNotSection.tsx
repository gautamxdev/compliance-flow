import { X, Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const contrasts = [
  {
    bad: "Files without purpose",
    good: "Files tied to tasks & years",
  },
  {
    bad: "Replacing your books",
    good: "Works alongside Tally & Zoho",
  },
  {
    bad: "AI gimmicks",
    good: "Deterministic systems",
  },
  {
    bad: "Hidden chaos",
    good: "Surface truth early",
  },
];

const WhatThisIsNotSection = () => {
  const { ref, visible } = useInView();

  return (
    <section className="py-20 md:py-28 border-t border-divider overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-center">
            This is not another Drive folder or Excel tracker
          </h2>
          <p className="text-text-secondary text-lg text-center mb-12">
            Reframe your firm's clarity. An operational system built for structure.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {contrasts.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-transparent">
                    <X className="w-4 h-4 text-[#EF4444] transition-colors group-hover:text-primary" />
                  </div>
                  <span className="text-text-secondary line-through group-hover:no-underline group-hover:text-primary/50 transition-all">
                    {item.bad}
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-text-primary">
                    {item.good}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatThisIsNotSection;
