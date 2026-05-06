import { Post } from "../types/types.post";

export function getPosts(): Post[] {
    const posts = localStorage.getItem("posts") || "[]";

    return JSON.parse(posts);
}

export function getPost(id: string): Post | undefined {
    const posts = getPosts();
    return posts.find((post: Post) => post.id === id);
}

export function addPost(post: Post): void {
    const posts = getPosts();
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

export function updatePost(post: Post): void {
    const posts = getPosts();
    const index = posts.findIndex((p: Post) => p.id === post.id);
    posts[index] = post;
    localStorage.setItem("posts", JSON.stringify(posts));
}

export function deletePost(id: string): void {
    const posts = getPosts();
    const index = posts.findIndex((p: Post) => p.id === id);
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
}