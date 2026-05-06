import Link from "next/link";
import type { JSX } from "react";

export default function Logo(): JSX.Element {
    return (
        <h1 className="text-2xl font-bold font-monospace">
            <Link href="/">Bloggy</Link>
        </h1>
    )
}
