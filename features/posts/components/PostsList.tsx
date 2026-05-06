"use client";

import { JSX, useCallback, useEffect, useState } from "react";
import { getPosts } from "../services/post.services";
import { Post } from "../types/types.post";
import PostCard from "./PostCard";

export function PostsList(): JSX.Element {
    const [data, setData] = useState<Post[]>([]);

    const refreshPostsList = useCallback(() => setData(getPosts()), []);

    useEffect(() => {
        const getDataFromLocalStorage = () => {
            setData(getPosts());
        }

        getDataFromLocalStorage();
    }, []);

    if (!data.length) return <div className="p-6 bg-white border-gray-300 rounded-lg text-center w-fit mx-auto">No Content Found...! 🤷‍♂️</div>;

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {
                data.map((post: Post) => <PostCard key={post.id} post={post} refreshPostsList={refreshPostsList} />)
            }
        </div>
    )
}
