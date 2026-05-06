/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import type { JSX } from "react";

import hljs from "highlight.js";
import "react-quill-new/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";

if (typeof window !== "undefined") {
  (window as any).hljs = hljs;
}

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const modules = {
  syntax: true,
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "direction"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }],
    [{ background: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
  ],
};

interface EditorProps {
  content?: string;
  onChange?: (value: string) => void;
}

export function Editor({ content = "", onChange }: EditorProps): JSX.Element {

  return (
    <ReactQuill
      id="editor"
      theme="snow"
      value={content}
      onChange={onChange}
      modules={modules}
      formats={["header", "bold", "italic", "underline", "strike", "align", "list", "size", "color", "background", "blockquote", "code-block", "link", "image"]}
      placeholder="Start typing your post..."
      className="bg-white"
    />
  );
}