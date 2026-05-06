"use client";

import hljs from "highlight.js";
import { Ref, useEffect, useRef } from "react";

export function useCodeFormatter(selector: string = "pre"): Ref<HTMLDivElement> {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.querySelectorAll(selector).forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });

    }, [selector]);

    return ref;
}
