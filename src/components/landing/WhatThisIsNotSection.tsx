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
  return (
    <section className="py-20 md:py-28 border-t border-divider overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-center">
            This is not another Drive folder or Excel tracker
          </h2>
          <p className="text-text-secondary text-lg text-center mb-12">
            Reframe your firm's clarity. An operational system built for structure.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {contrasts.map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-divider bg-card transition-all duration-500 hover:rotate-1 hover:border-slate-300 relative overflow-hidden"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 transition-opacity duration-500 group-hover:opacity-40">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-slate-400 font-medium line-through decoration-red-200">
                      {item.bad}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="font-semibold text-text-primary text-lg">
                      {item.good}
                    </span>
                  </div>
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
