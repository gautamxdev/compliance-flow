const steps = [
  {
    number: "01",
    title: "Select Client",
    description: "All work is anchored to a client. Start every task by choosing who the work is for.",
  },
  {
    number: "02",
    title: "Choose Financial Year",
    description: "Instantly separate current vs past work. No more mixing up FY 2023-24 with FY 2024-25.",
  },
  {
    number: "03",
    title: "Track Compliance Tasks",
    description: "GST, ITR, Audit, Notices — all with clear status, owner, and deadline tracking.",
  },
  {
    number: "04",
    title: "Upload Documents in Context",
    description: "No loose files. Every document knows why it exists and where it belongs.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-text-secondary text-lg">
            Four steps to organized compliance work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl border border-border bg-card group hover:border-primary/20 transition-colors"
            >
              <span className="text-5xl font-semibold text-muted-foreground/20 absolute top-4 right-4">
                {step.number}
              </span>
              <div className="relative">
                <h3 className="font-medium text-lg mb-3 pr-12">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
