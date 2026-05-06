import Image from "next/image";
import { JSX } from "react";
import Link from "next/link";

import { Post } from "../types/types.post";
import DeletePostBtn from "./DeletePostBtn";
import EditPostBtn from "./EditPostBtn";

interface PostCardProps {
    post: Post;
    refreshPostsList: () => void;
}

export default function PostCard({ post, refreshPostsList }: PostCardProps): JSX.Element {
    const displayedDate = new Date(post.updatedAt ? post.updatedAt : post.createdAt).toLocaleDateString();

    return (
        <div className="px-2 py-2 bg-white rounded-lg border-gray-300">
            <Image
                src={'/post-image.png'}
                alt="Post Image"
                width={400}
                height={300}
                className="rounded-lg h-40 w-full object-cover sm:h-auto"
                loading={'eager'}
            />

            <div className="p-2 flex flex-col gap-2">
                <h2 className="text-lg! font-medium capitalize">{post.title}</h2>

                <p className="text-sm text-gray-600 flex items-center justify-between">
                    <span>
                        {post.updatedAt ? "Updated At " : "Created At "}
                    </span>

                    {displayedDate}
                </p>

                <div className="flex items-center justify-between">
                    <Link
                        href={`/post/${post.id}`}
                        className="text-sm font-medium text-blue-800 transition duration-300 hover:underline hover:text-blue-600">
                        Read Details &raquo;
                    </Link>

                    <div className="flex items-center gap-2">
                        <EditPostBtn postId={post.id} />
                        <DeletePostBtn postId={post.id} refreshPostsList={refreshPostsList} />
                    </div>
                </div>
            </div>
        </div>
    )
}
