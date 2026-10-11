import { useEffect, useState } from "react";
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

const FaqSection = () => {
  const { hash } = useLocation();
  const [openItem, setOpenItem] = useState<string | undefined>(() =>
    faqIdFromHash(hash),
  );

  useEffect(() => {
    const matched = faqIdFromHash(hash);
    if (matched) setOpenItem(matched);
  }, [hash]);

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
          onValueChange={(value) => setOpenItem(value || undefined)}
          className="mx-auto max-w-2xl rounded-xl border border-border bg-card px-6"
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} id={faq.id}>
              <AccordionTrigger className="text-left text-base text-text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-text-secondary">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
