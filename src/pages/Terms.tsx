import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-divider">
        <div className="container mx-auto flex h-16 items-center px-6">
          <Link to="/" className="flex items-center gap-1">
            <img src="/logo/firmops.svg" alt="" className="h-10 w-12" />
            <span className="text-xl font-semibold text-text-primary">FirmOps</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-6 py-16">
        <p className="mb-2 text-sm text-text-tertiary">Legal</p>
        <h1 className="mb-6 text-3xl font-semibold tracking-tight text-text-primary">
          Terms of Use
        </h1>
        <p className="mb-4 text-sm text-text-secondary">
          Last updated: 20 September 2026
        </p>
        <div className="space-y-4 text-base leading-relaxed text-text-secondary">
          <p>
            These terms cover the FirmOps marketing site and early-access demo
            requests. The site is informational; requesting a demo does not
            create a paid subscription.
          </p>
          <p>
            You agree to provide accurate contact details when requesting early
            access, and not to misuse the site (scraping, attempting to break
            security, or sending abusive messages).
          </p>
          <p>
            FirmOps is offered as-is during the early-access period. We may
            change features, availability, or these terms as the product
            matures. Questions:{" "}
            <a
              href="mailto:hello@compliancework.in"
              className="text-text-primary underline underline-offset-2 hover:opacity-80"
            >
              hello@compliancework.in
            </a>
            .
          </p>
        </div>
        <p className="mt-10">
          <Link
            to="/"
            className="text-sm font-medium text-text-primary underline underline-offset-2 hover:opacity-80"
          >
            Back to home
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Terms;
