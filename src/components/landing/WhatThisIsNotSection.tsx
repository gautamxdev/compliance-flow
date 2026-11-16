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
    <section id="what-this-is-not" aria-labelledby="what-this-is-not-heading" className="scroll-mt-24 py-20 md:py-28 border-t border-divider overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 id="what-this-is-not-heading" className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-center">
            Why firms outgrow folders and trackers
          </h2>
          <p className="text-text-secondary text-lg text-center mb-12">
            FirmOps fits into how your firm already works — it just removes ambiguity.
          </p>

          <ul className="grid sm:grid-cols-2 gap-6">
            {contrasts.map((item) => (
              <li
                key={item.good}
                className="group p-8 rounded-2xl border border-divider bg-card transition-colors duration-300 hover:border-text-tertiary relative overflow-hidden"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 transition-opacity duration-500 group-hover:opacity-40">
                    <span className="text-xs uppercase tracking-wide text-text-tertiary">
                      Before
                    </span>
                    <span className="text-text-tertiary font-medium">
                      {item.bad}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-wide text-primary">
                      After
                    </span>
                    <span className="font-semibold text-text-primary text-lg">
                      {item.good}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhatThisIsNotSection;
