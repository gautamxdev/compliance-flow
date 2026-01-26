import { X, Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

const notThings = [
  {
    title: "Not a document dumping tool",
    old: "Files with no purpose",
    new: "Every file has context.",
  },
  {
    title: "Not accounting software",
    old: "Replacing your books",
    new: "Connected to your books.",
  },
  {
    title: "Not AI gimmicks",
    old: "Chatbot hallucinations",
    new: "Structured clarity.",
  },
  {
    title: "Not another folder system",
    old: "Hiding problems",
    new: "Surfacing answers.",
  },
];

const WhatThisIsNotSection = () => {
  const { ref, visible } = useInView();
  const [flipped, setFlipped] = useState<number[]>([]);

  const toggleFlip = (index: number) => {
    setFlipped(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  return (
    <section className="py-20 md:py-28 border-t border-divider overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="max-w-3xl mx-auto"
        >
          <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-center transition-all duration-700 ${visible ? "opacity-100" : "opacity-0 translate-y-2"}`}>
            This is not another Drive folder or Excel tracker
          </h2>
          <p className={`text-text-secondary text-lg text-center mb-12 transition-all duration-700 delay-100 ${visible ? "opacity-100" : "opacity-0 translate-y-2"}`}>
            It's an operations system built specifically for CA firm compliance work.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {notThings.map((item, index) => (
              <div
                key={index}
                onClick={() => toggleFlip(index)}
                className={`group h-[160px] perspective-1000 cursor-pointer transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${flipped.includes(index) ? "rotate-y-180" : ""}`}>
                  {/* Front: Chaos */}
                  <div className="absolute inset-0 backface-hidden p-6 rounded-xl border border-border bg-card flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                      <X className={`w-4 h-4 text-red-600 transition-all duration-1000 ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-red-600/70">{item.old}</p>
                    </div>
                  </div>

                  {/* Back: Structure */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 p-6 rounded-xl border border-green-200 bg-green-50 dark:bg-green-900/10 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-green-900 dark:text-green-100">FirmOps Approach</h3>
                      <p className="text-sm text-green-600">{item.new}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </section>
  );
};

export default WhatThisIsNotSection;
