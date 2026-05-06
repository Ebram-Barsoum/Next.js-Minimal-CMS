import type { Metadata } from "next";
import { JSX } from "react";

import { PostsList } from "@/features/posts";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <PostsList />
    </div>
  );
}
