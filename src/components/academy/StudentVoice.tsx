import { CountUp } from "@/components/ui/CountUp";
import { site } from "@/data/site";
import { getGoogleReviews, googleReviewLinks } from "@/lib/googleReviews";

export async function StudentVoice() {
  // Same cached call as the reviews section, so this stays in step with Google
  const google = await getGoogleReviews();
  const reviewCount = google?.count ?? site.google.reviewCount;
  const rating = google?.rating ?? site.google.rating;

  return (
    <section aria-label="Student story" className="border-y border-line">
      <div className="container-page flex flex-wrap items-center gap-12 py-24">
        <figure className="flex-[3_1_560px]">
          <blockquote className="text-[clamp(28px,3.2vw,44px)] leading-[1.2] font-medium tracking-[-0.025em]">
            “I enrolled for the DSA course which has drastically improved my problem solving skills
            and the faculty here just awesome😍 Probably the best classes for learning to code.”
          </blockquote>
          <figcaption className="mt-7 text-[17px] text-muted">
            <span className="font-semibold text-paper">Dashank Doshi</span> · Data Structures &amp;
            Algorithms ·{" "}
            <a
              href={googleReviewLinks().all}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline underline-offset-4"
            >
              Google review
            </a>
          </figcaption>
        </figure>
        <div className="flex flex-[1_1_260px] flex-col gap-6">
          <div>
            <p className="text-[56px] leading-none font-bold tracking-[-0.04em] text-gold">
              <CountUp text="1000+" />
            </p>
            <p className="mt-2 text-muted">Students trained</p>
          </div>
          <div>
            <p className="text-[56px] leading-none font-bold tracking-[-0.04em]">
              <CountUp text={String(reviewCount)} numberClassName="" />
            </p>
            <p className="mt-2 text-muted">
              Google reviews, rated <span className="font-semibold text-paper">{rating.toFixed(1)} ★</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
