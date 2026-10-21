/**
 * Choose which Google reviews the academy page shows.
 *
 * Google's API only returns 5 reviews (its pick of "most relevant"), so:
 *  - `pinnedReviews` are shown first. Copy any review you like from your Google listing.
 *  - `hiddenReviewAuthors` are never shown, e.g. reviews about the studio rather than the academy.
 *  - The live reviews from Google fill the remaining spots, up to `maxReviews`.
 */

export type PinnedReview = {
  author: string;
  rating: number;
  text: string;
  /** When it was posted, as you'd like it shown, e.g. "March 2026". */
  when: string;
  /** Optional: the review's link on Google Maps (Share → Copy link). */
  url?: string;
};

export const pinnedReviews: PinnedReview[] = [
  // {
  //   author: "Reviewer name",
  //   rating: 5,
  //   text: "Copy the review text from Google here.",
  //   when: "March 2026",
  // },
];

/** Reviewer names exactly as they appear on Google (not case-sensitive). */
export const hiddenReviewAuthors: string[] = [
  "ATHARVA UDAVANT", // review is about the IT services, not the academy
];

export const maxReviews = 9;
