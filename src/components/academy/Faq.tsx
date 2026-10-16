import { SectionTitle } from "@/components/ui/Eyebrow";
import { faqs } from "@/data/academy";

export function Faq() {
  return (
    <section className="container-page flex flex-wrap gap-12 py-28">
      <SectionTitle className="flex-[1_1_300px]">Questions</SectionTitle>
      <div className="flex flex-[2_1_560px] flex-col border-t border-edge">
        {faqs.map((faq, i) => (
          <details key={faq.question} open={i === 0} className="group border-b border-edge">
            <summary className="flex min-h-11 items-center justify-between gap-4 py-6 text-xl font-semibold">
              {faq.question}
              <span aria-hidden="true" className="font-mono text-gold">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="max-w-160 pb-6 text-base leading-[1.6] text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
