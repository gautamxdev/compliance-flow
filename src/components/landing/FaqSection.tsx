import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    id: "faq-tally",
    question: "Is FirmOps a replacement for Tally or Zoho Books?",
    answer:
      "No. FirmOps sits alongside your existing accounting tools. It organises clients, financial years, filings, and documents so compliance work has a clear home — it does not replace your books of account.",
  },
  {
    id: "faq-who",
    question: "Who is FirmOps built for?",
    answer:
      "CA firms in India that run recurring compliance work — GST, ITR, tax audit, and notices — across partners, managers, and articles. It is designed for teams that have outgrown folders and Excel trackers.",
  },
  {
    id: "faq-early-access",
    question: "How does early access work?",
    answer:
      "Request a demo from the landing page. We schedule a walkthrough with your firm, gather feedback on your workflows, and onboard selected firms as the product matures. There is no paid subscription during early access.",
  },
  {
    id: "faq-data",
    question: "Will our client data stay under our control?",
    answer:
      "Yes. When production launches, client and filing data you store in FirmOps stays under your firm's control. See our Privacy Policy for how we handle early-access contact details today.",
  },
] as const;

export type FaqId = (typeof faqs)[number]["id"];

/** Resolve a location hash to a known FAQ item id, or undefined. */
export function faqIdFromHash(hash: string): FaqId | undefined {
  const id = hash.replace(/^#/, "");
  return faqs.find((faq) => faq.id === id)?.id;
}

/**
 * Hash to show in the address bar for the open FAQ item, so the current answer
 * can be shared as a link. Closing every item falls back to the section itself.
 */
export function faqHashFor(openId: string | undefined): string {
  return openId ? `#${openId}` : "#faq";
}

/** Absolute link to a single FAQ answer on the current page. */
export function faqShareUrl(id: FaqId, href: string = window.location.href): string {
  const url = new URL(href);
  url.hash = id;
  return url.toString();
}

const LINK_COPIED_RESET_MS = 2000;

const FaqSection = () => {
  const { hash } = useLocation();
  const [copiedId, setCopiedId] = useState<FaqId | null>(null);
  const copiedTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (copiedTimerRef.current !== null) window.clearTimeout(copiedTimerRef.current);
    },
    [],
  );

  const copyLink = async (id: FaqId) => {
    const url = faqShareUrl(id);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      if (copiedTimerRef.current !== null) window.clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = window.setTimeout(() => {
        copiedTimerRef.current = null;
        setCopiedId(null);
      }, LINK_COPIED_RESET_MS);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };
  const [openItem, setOpenItem] = useState<string | undefined>(() =>
    faqIdFromHash(hash),
  );

  useEffect(() => {
    const matched = faqIdFromHash(hash);
    if (matched) setOpenItem(matched);
  }, [hash]);

  const changeOpenItem = (value: string) => {
    const next = value || undefined;
    setOpenItem(next);
    // Keep the URL in step with the open answer without adding history
    // entries or triggering the router's hash scroll.
    const hash = faqHashFor(next);
    if (window.location.hash !== hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}${hash}`,
      );
    }
  };

  // Escape folds the open answer away and leaves focus on its question.
  const onAccordionKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Escape" || !openItem) return;
    const trigger = document.getElementById(openItem)?.querySelector<HTMLButtonElement>("h3 button");
    e.preventDefault();
    changeOpenItem("");
    trigger?.focus();
  };

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-divider py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="faq-heading"
            className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Questions firms usually ask
          </h2>
          <p className="text-lg text-text-secondary">
            Straight answers before you request a demo.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          value={openItem ?? ""}
          onValueChange={changeOpenItem}
          onKeyDown={onAccordionKeyDown}
          className="mx-auto max-w-2xl rounded-xl border border-border bg-card px-6"
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} id={faq.id}>
              <AccordionTrigger className="text-left text-base text-text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-text-secondary">
                <p>{faq.answer}</p>
                <button
                  type="button"
                  onClick={() => copyLink(faq.id)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded text-xs font-medium text-text-tertiary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Copy link to this answer"
                >
                  {copiedId === faq.id ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {copiedId === faq.id ? "Link copied" : "Copy link"}
                </button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p role="status" className="sr-only">
          {copiedId ? "Link to this answer copied to clipboard" : ""}
        </p>
      </div>
    </section>
  );
};

export default FaqSection;
