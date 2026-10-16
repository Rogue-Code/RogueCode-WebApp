import Link from "next/link";
import type { Post } from "@/data/community";

export function PostRow({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex items-center gap-5 text-paper hover:text-paper">
      <span className="placeholder-stripes aspect-[4/3] w-35 flex-none rounded-[14px] border border-edge" />
      <span>
        <span className="mb-1.5 block font-mono text-xs text-muted">
          {post.category} · {post.date}
        </span>
        <span className="block text-xl leading-[1.25] font-semibold group-hover:text-gold">{post.title}</span>
      </span>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4 text-paper hover:text-paper">
      <span className="placeholder-stripes aspect-[16/10] rounded-[20px] border border-edge transition-colors group-hover:border-gold" />
      <span className="font-mono text-xs text-muted">
        {post.category} · {post.readMinutes} MIN READ
      </span>
      <span className="text-2xl leading-[1.2] font-semibold tracking-[-0.02em] group-hover:text-gold">{post.title}</span>
      <span className="text-base leading-[1.55] text-muted">{post.excerpt}</span>
      <span className="text-sm text-subtle">
        {post.author} · {post.date}
      </span>
    </Link>
  );
}
