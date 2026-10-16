import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-royal">
      <div className="container-page flex flex-wrap gap-16 py-28">
        <div className="flex-[1_1_440px]">
          <h2 className="text-[clamp(44px,6vw,88px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            Let&apos;s write
            <br />
            something
            <br />
            <span className="text-gold">that runs.</span>
          </h2>
          <div className="mt-12 flex flex-col gap-3.5 text-lg">
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3">
              <Icon name="mail" size={20} strokeWidth={1.8} />
              {site.contact.email}
            </a>
            <a href={`tel:${site.contact.phone}`} className="flex items-center gap-3">
              <Icon name="phone" size={20} strokeWidth={1.8} />
              {site.contact.phone}
            </a>
            <span className="flex items-start gap-3 text-paper-soft">
              <Icon name="mapPin" size={20} strokeWidth={1.8} className="mt-0.75 flex-none" />
              {site.contact.address}
            </span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
