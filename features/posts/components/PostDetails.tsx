"use client";

import { JSX } from "react";
import "react-quill-new/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";

import { getPost } from "../services/post.services";
import { useCodeFormatter } from "@/features/editor";


interface PostDetailsProps {
    postId: string;
}

export function PostDetails({ postId }: PostDetailsProps): JSX.Element | null {
    const post = getPost(postId);

    const ref = useCodeFormatter();

    return (
        <div className="bg-white p-6 rounded-lg flex flex-col gap-6 ql-snow">
            <h1 className="text-2xl font-bold text-center">{post?.title}</h1>
            <div
                ref={ref}
                className="w-full ql-editor flex flex-col"
                dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
        </div>
    )
}
