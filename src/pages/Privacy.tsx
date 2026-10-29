import { Link } from "react-router-dom";
import { LEGAL_LAST_UPDATED, formatLegalDate, legalIsoDate } from "@/lib/legal";

const Privacy = () => {
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
          Privacy Policy
        </h1>
        <p className="mb-4 text-sm text-text-secondary">
          Last updated:{" "}
          <time dateTime={legalIsoDate(LEGAL_LAST_UPDATED)} data-testid="legal-last-updated">
            {formatLegalDate(LEGAL_LAST_UPDATED)}
          </time>
        </p>
        <div className="space-y-4 text-base leading-relaxed text-text-secondary">
          <p>
            FirmOps is built for CA firms in India. We collect only what we need
            to run early-access demos and product waitlists: your name, firm
            name, email, and any notes you send us.
          </p>
          <p>
            We do not sell personal data. Demo and waitlist details are used to
            reply to your request and to share product updates you asked for.
            You can request deletion at any time by emailing{" "}
            <a
              href="mailto:hello@compliancework.in"
              className="text-text-primary underline underline-offset-2 hover:opacity-80"
            >
              hello@compliancework.in
            </a>
            .
          </p>
          <p>
            When the product launches, client and filing data you store in
            FirmOps will stay under your firm&apos;s control. We will update this
            page before any production data processing begins.
          </p>
        </div>
        <nav
          aria-label="Legal"
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          <Link
            to="/"
            className="font-medium text-text-primary underline underline-offset-2 hover:opacity-80"
          >
            Back to home
          </Link>
          {/* Visitors reading one legal page usually want the other next. */}
          <Link
            to="/terms"
            className="text-text-secondary underline underline-offset-2 hover:text-text-primary"
          >
            Read the Terms of Use
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default Privacy;
