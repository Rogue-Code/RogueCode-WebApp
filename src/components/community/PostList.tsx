"use client";

import { useState } from "react";
import type { Post } from "@/data/community";
import { FilterChips } from "./FilterChips";
import { PostCard } from "./PostRow";

export function PostList({ posts }: { posts: Post[] }) {
  const categories = ["ALL", ...new Set(posts.map((p) => p.category))];
  const [category, setCategory] = useState("ALL");
  const visible = posts.filter((p) => category === "ALL" || p.category === category);

  return (
    <>
      <div className="mb-12">
        <FilterChips
          label="Filter posts"
          options={categories.map((c) => ({ value: c, label: c === "ALL" ? "All" : c.toLowerCase() }))}
          value={category}
          onChange={setCategory}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8 gap-y-14">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
