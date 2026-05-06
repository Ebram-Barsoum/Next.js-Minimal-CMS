"use client";

import { JSX } from "react";
import { deletePost } from "../services/post.services";

interface DeletePostBtnProps {
    postId: string;
    refreshPostsList: () => void
}

export default function DeletePostBtn({ postId, refreshPostsList }: DeletePostBtnProps): JSX.Element {
    const handleDeletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(postId);
            refreshPostsList();
        }
    }

    return (
        <button
            type="button"
            aria-label="delete post button"
            className="text-xs font-bold text-red-800"
            title="Delete post"
            onClick={handleDeletePost}
        >
            Delete
        </button>
    )
}
