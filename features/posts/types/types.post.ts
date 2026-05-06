export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: Date | string;
    updatedAt: Date | string | null;
}