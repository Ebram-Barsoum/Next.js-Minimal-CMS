"use client";

import { JSX, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import useLocalStorage from "@/shared/hooks/useLocalStorage";

import { Editor } from "@/features/editor";
import { Post } from "../types/types.post";
import { addPost, getPost, updatePost } from "../services/post.services";
import { useRouter } from "next/navigation";

interface PostFormProps {
    postId?: string;
}

type FormInputs = Pick<Post, "title" | "content">;

const FORM_DRAFT_KEY = "post-draft-postId";

export function PostForm({ postId }: PostFormProps): JSX.Element {
    const router = useRouter();
    const {
        data,
        saveIntoLocalStorage,
        removeFromLocalStorage
    } = useLocalStorage<FormInputs>(FORM_DRAFT_KEY.replace('postId', postId || ''));

    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm<FormInputs>();

    // Initialize form for editing existing post
    useEffect(() => {
        if (postId) {
            const post = getPost(postId);
            if (post) {
                reset(post);
            }
        }

        return () => {
            if (postId) {
                removeFromLocalStorage();
            }
        }
    }, [postId, reset, removeFromLocalStorage]);

    // load draft data from local storage
    useEffect(() => {
        if (data?.title || (data?.content && data?.content !== "<p></p>")) {
            reset(data);
        }
    }, []);

    // save into local storage
    const watchedTitle = watch("title");
    const watchedContent = watch("content");

    useEffect(() => {
        const timerID = setTimeout(() => {
            if (watchedTitle || (watchedContent && watchedContent !== "<p></p>")) {
                saveIntoLocalStorage({ title: watchedTitle, content: watchedContent });
            }
            else {
                removeFromLocalStorage();
            }

        }, 500);

        return () => clearTimeout(timerID);
    }, [watchedTitle, watchedContent, saveIntoLocalStorage, removeFromLocalStorage]);

    const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
        const post: Post = {
            id: postId ?? crypto.randomUUID(),
            ...data,
            createdAt: new Date(),
            updatedAt: postId ? new Date() : null,
        }

        if (!postId) {
            addPost(post);
            removeFromLocalStorage();
            reset();
            router.push(`/`);
        }
        else {
            updatePost(post);
            reset(data);
            router.push(`/post/${post.id}`);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="title">Post Title</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Enter post title ..."
                    className="bg-white p-2 border border-gray-200 rounded-lg focus:outline-none"
                    {...register("title", {
                        required: "Title is required",
                        minLength: {
                            value: 10,
                            message: "Title must be at least 10 characters",
                        }
                    })}
                />
                {
                    errors.title &&
                    <span className="text-red-500 text-sm font-medium">{errors.title.message}</span>
                }
            </div>

            <div className="flex flex-col gap-2">
                <p>Post Content</p>
                <Controller
                    name="content"
                    control={control}
                    rules={{
                        required: "Content is required",
                        minLength: {
                            value: 10,
                            message: "Content must be at least 10 characters",
                        }
                    }}
                    render={({ field }) => (
                        <Editor
                            content={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                {
                    errors.content &&
                    <span className="text-red-500 text-sm font-medium">{errors.content.message}</span>
                }
            </div>

            <button
                type="submit"
                className="w-full h-10 bg-black text-white rounded-lg"
            >
                {postId ? "Update Post" : "Create Post"}
            </button>
        </form>
    )
}
