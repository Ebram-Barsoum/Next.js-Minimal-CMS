import type { Metadata } from "next";
import { JSX } from "react";

import { PostDetails } from "@/features/posts";

export const metadata: Metadata = {
    title: 'Post | Details'
}

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }): Promise<JSX.Element> {
    const { postId } = await params;

    return <PostDetails postId={postId} />
}
