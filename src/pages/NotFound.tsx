import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();

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

      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-text-tertiary">
          Error 404
        </p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          This page doesn&apos;t exist
        </h1>
        {/* Echo the missing address so a typo in a shared link is easy to spot. */}
        <p className="mb-4 max-w-full text-sm text-text-secondary">
          Nothing lives at{" "}
          <code
            className="break-all rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-text-primary"
            data-testid="missing-path"
          >
            {pathname}
          </code>
        </p>
        <p className="mb-10 text-base leading-relaxed text-text-secondary">
          The link may be broken, or the page may have moved. Head back to the
          FirmOps home page to continue.
        </p>
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Back to home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
