// Data access for events and the blog — swap the seed data for Firestore here.
import { events, posts, type EventItem, type Post } from "@/data/community";

export async function getEvents(): Promise<EventItem[]> {
  return events;
}

export async function getEvent(slug: string): Promise<EventItem | undefined> {
  return events.find((e) => e.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}
