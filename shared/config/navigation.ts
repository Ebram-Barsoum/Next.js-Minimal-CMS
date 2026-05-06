export interface NavLink {
    href: string;
    label: string;
}

export const navLinks: NavLink[] = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/post/new",
        label: "New Post",
    },
];