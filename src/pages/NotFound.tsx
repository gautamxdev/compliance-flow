import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { suggestPage } from "@/lib/suggestRoute";

/**
 * The SPA answers every unknown URL with 200, so tell crawlers not to index
 * the 404 screen while it is showing. Restores any previous robots tag after.
 */
function useNoIndex() {
  useEffect(() => {
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previous = meta?.getAttribute("content") ?? null;
    const created = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex");
    return () => {
      if (created) meta?.remove();
      else if (previous !== null) meta?.setAttribute("content", previous);
    };
  }, []);
}

const NotFound = () => {
  const { pathname } = useLocation();
  const suggestion = suggestPage(pathname);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useNoIndex();

  // Client-side navigation does not announce a new page, so put focus on the
  // 404 heading: screen readers read it and Tab continues from the message.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [pathname]);

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
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mb-4 text-3xl font-semibold tracking-tight text-text-primary focus:outline-none md:text-4xl"
        >
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
        {suggestion ? (
          <p className="mb-4 text-sm text-text-secondary" data-testid="route-suggestion">
            Did you mean{" "}
            <Link
              to={suggestion.path}
              className="font-medium text-text-primary underline underline-offset-2 hover:opacity-80"
            >
              {suggestion.label}
            </Link>
            ?
          </p>
        ) : null}
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
