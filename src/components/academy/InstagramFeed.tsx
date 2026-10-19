import { buttonClasses } from "@/components/ui/Button";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { instagramPosts } from "@/data/academy";
import { site } from "@/data/site";

export function InstagramFeed() {
  return (
    <section aria-label="Rogue Code on Instagram" className="container-page py-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>{"// @ROGUE.CODE"}</Eyebrow>
          <SectionTitle>From our Instagram</SectionTitle>
        </div>
        <a
          href={site.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("outline", "md")}
        >
          Follow {site.instagram.handle} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {instagramPosts.map((post) => (
          <a
            key={post.href}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Photo
              src={post.image}
              alt={post.alt}
              sizes="(min-width: 1024px) 300px, 50vw"
              className="aspect-square rounded-[20px] border border-edge transition-colors group-hover:border-gold"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
