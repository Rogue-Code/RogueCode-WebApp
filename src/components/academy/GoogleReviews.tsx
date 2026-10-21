import Image from "next/image";
import { siGoogle } from "simple-icons";
import { buttonClasses } from "@/components/ui/Button";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";
import { hiddenReviewAuthors, maxReviews, pinnedReviews } from "@/data/reviews";
import { getGoogleReviews, googleReviewLinks, type GoogleReview } from "@/lib/googleReviews";

function GoogleMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={siGoogle.path} />
    </svg>
  );
}

function Stars({ rating, className = "text-lg" }: { rating: number; className?: string }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className={`tracking-[0.1em] ${className}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} aria-hidden="true" className={n <= Math.round(rating) ? "text-gold" : "text-edge-strong"}>
          ★
        </span>
      ))}
    </span>
  );
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export async function GoogleReviews() {
  const data = await getGoogleReviews();
  const links = googleReviewLinks();
  // Your pinned picks first, then Google's live ones, minus hidden reviewers and duplicates
  const hidden = new Set(hiddenReviewAuthors.map((name) => name.toLowerCase()));
  const seen = new Set<string>();
  const reviews: GoogleReview[] = [...pinnedReviews, ...(data?.reviews ?? [])]
    .filter((review) => {
      const key = review.author.toLowerCase();
      if (hidden.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, maxReviews);
  // Live figures when the Places API is set up, otherwise the snapshot in site.ts
  const rating = data?.rating ?? site.google.rating;
  const count = data?.count ?? site.google.reviewCount;

  return (
    <section id="reviews" className="border-t border-line">
      <div className="container-page py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>{"// GOOGLE REVIEWS"}</Eyebrow>
            <SectionTitle>What students say about us.</SectionTitle>
            {rating !== undefined && (
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-5xl font-extrabold tracking-[-0.04em]">{rating.toFixed(1)}</span>
                <span className="flex flex-col gap-1">
                  <Stars rating={rating} className="text-2xl" />
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                    <GoogleMark className="size-3.5" />
                    {count} review{count === 1 ? "" : "s"} on Google
                  </span>
                </span>
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={links.write} {...external} className={buttonClasses("gold", "md")}>
              <GoogleMark className="size-4" /> Write a review
            </a>
            <a href={links.all} {...external} className={buttonClasses("outline", "md")}>
              See all on Google <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
            {reviews.map((review) => (
              <figure
                key={`${review.author}-${review.when}`}
                className="flex flex-col gap-4 rounded-[20px] border border-edge bg-royal p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <Stars rating={review.rating} />
                  <GoogleMark className="size-4 text-muted" />
                </div>
                <blockquote className="line-clamp-6 text-base leading-[1.6] text-paper-soft">
                  {review.text}
                </blockquote>
                {review.url && (
                  <a href={review.url} {...external} className="self-start text-sm font-semibold text-gold">
                    Read on Google <span aria-hidden="true">↗</span>
                  </a>
                )}
                <figcaption className="mt-auto flex items-center gap-3 border-t border-edge pt-5">
                  {review.photo ? (
                    <Image
                      src={review.photo}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-full bg-edge object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-ink"
                    >
                      {review.author.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="flex flex-col">
                    {review.authorUrl ? (
                      <a href={review.authorUrl} {...external} className="font-semibold">
                        {review.author}
                      </a>
                    ) : (
                      <span className="font-semibold">{review.author}</span>
                    )}
                    <span className="text-sm text-muted">{review.when}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[20px] border border-dashed border-outline p-8">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-paper text-ink">
                <GoogleMark className="size-6" />
              </span>
              <div>
                <p className="text-xl font-semibold">Studied with us?</p>
                <p className="mt-1 text-base text-muted">
                  Tell others what it was like. Your review helps the next student choose.
                </p>
              </div>
            </div>
            <a href={links.write} {...external} className={buttonClasses("gold", "md")}>
              Write a review on Google
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
