import { JSX } from "react";
import { NavLink } from "../config/navigation";
import Link from "next/link";

interface NavigatorProps {
    links: NavLink[];
}

export default function Navigator({ links }: NavigatorProps): JSX.Element {
    return (
        <nav>
            <ul className="flex items-center gap-4">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
