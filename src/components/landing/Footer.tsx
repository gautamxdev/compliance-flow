import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prefersReducedMotion } from "@/lib/scrollToId";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });

    // Move keyboard focus to the site header so SR/keyboard users aren't left at the footer.
    const header = document.getElementById("site-header");
    if (header) {
      header.focus({ preventScroll: true });
    }
  };

  return (
    <footer className="border-t border-divider py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-1">
              <img
                src="/logo/firmops.svg"
                alt=""
                className="h-6 w-auto"
              />
              <span className="text-lg font-semibold tracking-tight text-text-primary">
                FirmOps
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              A structured workspace for CA firms
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-6 text-sm"
            aria-label="Footer"
          >
            <Link
              to="/privacy"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Terms
            </Link>
            <a
              href="mailto:hello@compliancework.in"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Contact
            </a>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-text-secondary"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              Back to top
            </Button>
          </nav>
        </div>

        <div className="mt-8 border-t border-divider pt-8">
          <p className="text-center text-xs text-text-tertiary">
            © {new Date().getFullYear()} FirmOps · Made for CA firms in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
