import { SectionTitle } from "@/components/ui/Eyebrow";
import { faqs } from "@/data/academy";

export function Faq() {
  return (
    <section className="bg-lilac text-ink">
      <div className="container-page flex flex-wrap gap-12 py-28">
        <SectionTitle className="flex-[1_1_300px]">Questions</SectionTitle>
        <div className="flex flex-[2_1_560px] flex-col border-t border-lilac-line">
          {faqs.map((faq, i) => (
            <details key={faq.question} open={i === 0} className="group border-b border-lilac-line">
              <summary className="flex min-h-11 items-center justify-between gap-4 py-6 text-xl font-semibold">
                {faq.question}
                <span aria-hidden="true" className="font-mono text-ink-400">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="max-w-160 pb-6 text-base leading-[1.6] text-ink-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
