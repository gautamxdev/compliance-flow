import { ArrowRight } from "lucide-react";

const CoreIdeaSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Everything starts with the client
          </h2>
          <p className="text-text-secondary text-lg">
            A logical hierarchy where nothing exists without context. Every file has meaning.
          </p>
        </div>

        {/* Diagram */}
        <div className="bg-card rounded-xl border border-border p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 overflow-x-auto">
            {/* Block 1 - Firm */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="px-6 py-4 bg-primary text-primary-foreground rounded-lg">
                <p className="text-xs uppercase tracking-wide opacity-70 mb-1">Your</p>
                <p className="font-medium">CA Firm</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-5 h-5 text-text-tertiary flex-shrink-0" />
            <div className="md:hidden w-px h-6 bg-border ml-6"></div>

            {/* Block 2 - Client */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">Select</p>
                <p className="font-medium">Client</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-5 h-5 text-text-tertiary flex-shrink-0" />
            <div className="md:hidden w-px h-6 bg-border ml-6"></div>

            {/* Block 3 - Financial Year */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">Choose</p>
                <p className="font-medium">Financial Year</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-5 h-5 text-text-tertiary flex-shrink-0" />
            <div className="md:hidden w-px h-6 bg-border ml-6"></div>

            {/* Block 4 - Compliance Tasks */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">Track</p>
                <p className="font-medium">Compliance Tasks</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-5 h-5 text-text-tertiary flex-shrink-0" />
            <div className="md:hidden w-px h-6 bg-border ml-6"></div>

            {/* Block 5 - Documents */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">Attach</p>
                <p className="font-medium">Documents</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-divider">
            <p className="text-text-secondary max-w-xl">
              This structure ensures that every document, every task, and every deadline is tied to a specific client and financial year. Nothing floats without context.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreIdeaSection;
