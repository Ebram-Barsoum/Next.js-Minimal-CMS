import { PostForm } from "@/features/posts";
import { Metadata } from "next";
import type { JSX } from "react";

export const metadata: Metadata = {
    title: 'Post | New'
}

export default function AddPostPage(): JSX.Element {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-center">Add New Post</h1>
            <PostForm />
        </div>
    )
}
