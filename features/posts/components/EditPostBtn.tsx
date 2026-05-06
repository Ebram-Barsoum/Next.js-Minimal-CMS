import Link from "next/link";
import type { JSX } from "react";

interface EditPostBtnProps {
    postId: string;
}

export default function EditPostBtn({ postId }: EditPostBtnProps): JSX.Element {
    return (
        <Link
            href={`/post/${postId}/update`}
            className="text-xs font-bold text-green-600"
        >
            Edit
        </Link>
    )
}
