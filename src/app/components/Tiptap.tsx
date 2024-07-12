import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaBold, FaItalic, FaStrikethrough, FaParagraph, FaUnderline, FaListUl, FaListOl, FaUndo, FaRedo } from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import Underline from "@tiptap/extension-underline";
import { VscHorizontalRule } from "react-icons/vsc";
import { useController } from "react-hook-form";

export default function Tiptap(props: { label: string; name: string; control: any; rules: any }) {
  const { field } = useController({ name: props.name, control: props.control, rules: props.rules });

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: field.value,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      field.onChange(editor.getHTML());
    },
    onBlur() {
      field.onBlur();
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex_jb_ic ">
      <label className="w-[30%] font-montserrat-500 text-[14px] text-main_text">{props.label}</label>
      <div className="w-[60%] border border-[#A8B7C7] rounded-[5px] pt-2 overflow-hidden">
        <div className="control-group px-4">
          <div className="button-group flex gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              style={{ backgroundColor: editor.isActive("bold") ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaBold color="#26333D" size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              style={{ backgroundColor: editor.isActive("italic") ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaItalic color="#26333D" size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              style={{ backgroundColor: editor.isActive("underline") ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaUnderline color="#26333D" size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              style={{ backgroundColor: editor.isActive("strike") ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaStrikethrough color="#26333D" size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setParagraph().run()}
              style={{ backgroundColor: editor.isActive("paragraph") ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaParagraph color="#26333D" size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              style={{ backgroundColor: editor.isActive("heading", { level: 1 }) ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <LuHeading1 color="#26333D" size={17} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              style={{ backgroundColor: editor.isActive("heading", { level: 2 }) ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <LuHeading2 color="#26333D" size={17} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              style={{ backgroundColor: editor.isActive("heading", { level: 3 }) ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <LuHeading3 color="#26333D" size={17} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              style={{ backgroundColor: editor.isActive("bulletList") ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaListUl color="#26333D" size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              style={{ backgroundColor: editor.isActive("orderedList") ? "rgb(107 114 128)" : "transparent" }}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaListOl color="#26333D" size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <VscHorizontalRule color="#26333D" size={17} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaUndo color="#26333D" size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className={"w-[25px] h-[25px] rounded-[5px] border border-[#26333D] flex_center"}
            >
              <FaRedo color="#26333D" size={14} />
            </button>
          </div>
        </div>
        <EditorContent name={field.name} ref={field.ref} editor={editor} className="editor min-h-[40px] pl-0 w-full" />
      </div>
      <div className="w-[30%]"></div>
    </div>
  );
}
