import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostRow } from "@/components/community/PostRow";
import { getPost, getPosts } from "@/lib/data/community";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: `${post.title} — Rogue Code Blog`, description: post.excerpt } : { title: "Post not found" };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const more = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="container-page pt-14 pb-28">
      <Link href="/blog" className="font-mono text-[13px] text-muted">
        ← All posts
      </Link>
      <header className="mx-auto mt-10 max-w-200">
        <p className="font-mono text-xs tracking-[0.08em] text-gold">
          {post.category} · {post.readMinutes} MIN READ
        </p>
        <h1 className="mt-5 text-[clamp(40px,5.4vw,80px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
          {post.title}
        </h1>
        <p className="mt-6 text-lg text-muted">
          <span className="font-semibold text-paper">{post.author}</span> · {post.date}
        </p>
      </header>
      <div className="placeholder-stripes mx-auto mt-12 aspect-[21/9] max-w-260 rounded-3xl border border-edge" />
      <div className="mx-auto mt-14 flex max-w-170 flex-col gap-6 text-[19px] leading-[1.7] text-paper-soft">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {more.length > 0 && (
        <aside className="mx-auto mt-24 max-w-200 border-t border-line pt-12">
          <h2 className="mb-8 text-[clamp(26px,2.6vw,34px)] font-bold tracking-[-0.03em]">Keep reading</h2>
          <div className="flex flex-col gap-5">
            {more.map((p) => (
              <PostRow key={p.slug} post={p} />
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
