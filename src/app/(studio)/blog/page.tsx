import type { Metadata } from "next";
import { PostList } from "@/components/community/PostList";
import { getPosts } from "@/lib/data/community";

export const metadata: Metadata = {
  title: "Blog — Rogue Code",
  description: "Coding guides, interview prep and stories from the Rogue Code studio and academy.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <section className="container-page pt-[clamp(48px,7vw,96px)] pb-28">
      <p className="mb-4 font-mono text-[13px] tracking-[0.08em] text-gold">{"// BLOG"}</p>
      <h1 className="max-w-220 text-[clamp(44px,6.4vw,96px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
        Notes from people <span className="text-gold">who ship.</span>
      </h1>
      <p className="mt-6 mb-14 max-w-140 text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-paper-soft">
        Interview prep, engineering write-ups and student stories from the studio and the academy.
      </p>
      <PostList posts={posts} />
    </section>
  );
}
