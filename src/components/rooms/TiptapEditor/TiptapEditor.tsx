import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { MdOutlineEventNote } from "react-icons/md";
import { ICON_COLOR } from "../Payment/Payment";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  if (!editor) {
    return null;
  }

  const handleSave = () => {
    const html = editor.getHTML();
    const json = editor.getJSON();
    console.log("HTML:", html);
    console.log("JSON:", json);
  };

  return (
    <div className="editor text-black">
      <div className="toolbar mb-1 flex items-center gap-2 text-sm text-[#525252]">
        <MdOutlineEventNote color={ICON_COLOR} />
        Ghi chú
      </div>
      <EditorContent
        className="border-2 shadow-sm p-2 outline-none  shadow-slate-200 border-gray-300 rounded-md max-h-[200px] overflow-y-auto"
        editor={editor}
      />

      {/* <Button onClick={handleSave} style={{ marginTop: "10px" }}>
        Save
      </Button> */}
    </div>
  );
};

export default TiptapEditor;
