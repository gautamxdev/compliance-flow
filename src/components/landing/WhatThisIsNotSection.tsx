import { X } from "lucide-react";

const notThings = [
  {
    title: "Not a document dumping tool",
    description: "Every file has context and purpose.",
  },
  {
    title: "Not accounting software",
    description: "We don't replace Tally or Zoho Books.",
  },
  {
    title: "Not AI gimmicks",
    description: "No chatbots. No magic. Just structure.",
  },
  {
    title: "Not another folder system",
    description: "Folders hide problems. We surface clarity.",
  },
];

// Asymmetric vertical offsets
const cardOffsets = ["sm:translate-y-0", "sm:translate-y-3", "sm:-translate-y-2", "sm:translate-y-1"];

const WhatThisIsNotSection = () => {
  return (
    <section className="py-16 md:py-20 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-center">
            This is not another Drive folder or Excel tracker
          </h2>
          <p className="text-text-secondary text-base text-center mb-10">
            It's an operations system built specifically for CA firm compliance work.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {notThings.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-lg border border-border/60 bg-card/50 ${cardOffsets[index]}`}
              >
                <div className="w-7 h-7 rounded-full bg-muted/80 flex items-center justify-center flex-shrink-0">
                  <X className="w-3.5 h-3.5 text-text-tertiary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-0.5">{item.title}</h3>
                  <p className="text-xs text-text-secondary">{item.description}</p>
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
