import React from "react";

import type { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #eee", padding: "10px" }}>
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </button>

      {/* Underline */}
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
      >
        <u>U</u>
      </button>

      {/* Heading */}
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
    </div>
  );
}
