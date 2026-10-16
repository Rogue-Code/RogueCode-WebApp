import Link from "next/link";
import { getEvents, getPosts } from "@/lib/data/community";
import { EventRow } from "@/components/community/EventRow";
import { PostRow } from "@/components/community/PostRow";

function ColumnHeader({ title, linkLabel, href }: { title: string; linkLabel: string; href: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 className="text-[clamp(30px,3vw,42px)] font-bold tracking-[-0.03em]">{title}</h2>
      <Link href={href} className="py-2.5 font-semibold">
        {linkLabel}
      </Link>
    </div>
  );
}

export async function EventsAndBlog() {
  const [events, posts] = await Promise.all([getEvents(), getPosts()]);

  return (
    <section className="border-t border-line">
      <div className="container-page flex flex-wrap gap-16 py-28">
        <div id="events" className="flex-[1_1_460px]">
          <ColumnHeader title="Upcoming events" linkLabel="All events" href="/events" />
          <div className="flex flex-col">
            {events.slice(0, 3).map((event) => (
              <EventRow key={event.slug} event={event} />
            ))}
          </div>
        </div>

        <div id="blog" className="flex-[1_1_460px]">
          <ColumnHeader title="From the blog" linkLabel="All posts" href="/blog" />
          <div className="flex flex-col gap-5">
            {posts.slice(0, 3).map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
