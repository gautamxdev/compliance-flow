import { Filter } from "lucide-react";

const filters = [
  "All pending GST filings this week",
  "All work handled by Rahul M.",
  "All FY 2022-23 audits",
  "Clients with active notices",
  "Tasks due in next 7 days",
  "Completed filings this month",
];

const VisibilitySection = () => {
  return (
    <section className="py-20 md:py-28 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Filters Preview */}
          <div className="order-2 lg:order-1">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-text-secondary" />
                <span className="text-sm font-medium">Quick Filters</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter, index) => (
                  <button
                    key={index}
                    className="px-3 py-2 text-sm bg-muted hover:bg-accent text-text-secondary hover:text-text-primary rounded-lg border border-transparent hover:border-border transition-colors text-left"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Firm-wide visibility without micromanagement
            </h2>
            <p className="text-text-secondary text-lg mb-6">
              Get instant answers to operational questions. These are filters, not folders — dynamic views into your firm's work.
            </p>
            <p className="text-text-secondary">
              Partners can see the complete picture. Managers can track workload. Staff know exactly what's assigned to them. All without constant check-ins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisibilitySection;
