import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <img
                src="/logo/firmops.svg"
                alt="FirmOps"
                className="h-6 w-auto"
              />
              <span className="font-semibold text-text-primary text-lg tracking-tight">
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
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Terms
            </Link>
            <a
              href="mailto:hello@compliancework.in"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-divider">
          <p className="text-xs text-text-tertiary text-center">
            © {new Date().getFullYear()} FirmOps · Made for CA firms in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
