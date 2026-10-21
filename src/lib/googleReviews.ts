// Fetches the business's rating and latest reviews from the Google Places API (New).
// Needs GOOGLE_PLACES_API_KEY in the environment and site.google.placeId.
import "server-only";
import { cacheLife } from "next/cache";
import { site } from "@/data/site";

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  /** Reviewer's profile photo on lh3.googleusercontent.com. */
  photo?: string;
  /** The review on Google Maps, for reading it in full. */
  url?: string;
  rating: number;
  text: string;
  /** e.g. "2 months ago", as Google words it. */
  when: string;
};

export type GoogleReviews = {
  rating?: number;
  count?: number;
  reviews: GoogleReview[];
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    googleMapsUri?: string;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

/**
 * Links that need no API key. With a Place ID they open Google's review form and review list
 * directly; without one they fall back to the Maps listing, which has both.
 */
export function googleReviewLinks() {
  const id = site.google.placeId && encodeURIComponent(site.google.placeId);
  return {
    write: id ? `https://search.google.com/local/writereview?placeid=${id}` : site.google.mapsUrl,
    all: id ? `https://search.google.com/local/reviews?placeid=${id}` : site.google.mapsUrl,
  };
}

/** Returns undefined when not configured or Google can't be reached; refreshed every few hours. */
export async function getGoogleReviews(): Promise<GoogleReviews | undefined> {
  "use cache";
  cacheLife("hours");

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const id = site.google.placeId;
  if (!key || !id) return undefined;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    });
    if (!res.ok) {
      console.error("[google reviews]", res.status, await res.text());
      return undefined;
    }
    const data = (await res.json()) as PlacesResponse;
    return {
      rating: data.rating,
      count: data.userRatingCount,
      reviews: (data.reviews ?? [])
        .map((r) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          authorUrl: r.authorAttribution?.uri,
          photo: r.authorAttribution?.photoUri?.startsWith("https://lh3.googleusercontent.com/")
            ? r.authorAttribution.photoUri
            : undefined,
          url: r.googleMapsUri,
          rating: r.rating ?? 0,
          text: r.originalText?.text ?? r.text?.text ?? "",
          when: r.relativePublishTimeDescription ?? "",
        }))
        .filter((r) => r.text),
    };
  } catch (error) {
    console.error("[google reviews]", error);
    return undefined;
  }
}
