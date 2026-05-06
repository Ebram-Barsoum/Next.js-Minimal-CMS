import { Metadata } from "next";
import type { JSX } from "react";

import { PostForm } from "@/features/posts";

export const metadata: Metadata = {
    title: 'Post | Update'
}

export default async function UpdatePostPage({ params }: { params: Promise<{ postId: string }> }): Promise<JSX.Element> {
    const { postId } = await params;

    return <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Update Post</h1>
        <PostForm postId={postId} />
    </div>
}
