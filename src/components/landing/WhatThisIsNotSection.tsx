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

const WhatThisIsNotSection = () => {
  return (
    <section className="py-20 md:py-28 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-center">
            This is not another Drive folder or Excel tracker
          </h2>
          <p className="text-text-secondary text-lg text-center mb-12">
            It's an operations system built specifically for CA firm compliance work.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {notThings.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-text-tertiary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
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
