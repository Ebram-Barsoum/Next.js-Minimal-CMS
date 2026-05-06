import type { JSX } from "react";

import Logo from "./Logo";
import Navigator from "./Navigator";
import { navLinks } from "../config/navigation";

export default function Header(): JSX.Element {
    return (
        <header className="bg-white border-b border-b-gray-200 p-4 flex items-center justify-between gap-8 text-black md:px-8">
            <Logo />

            <Navigator links={navLinks} />
        </header>
    )
}
