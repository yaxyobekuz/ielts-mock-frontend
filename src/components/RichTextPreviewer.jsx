// Hooks
import useStore from "@/hooks/useStore";

// React
import { useEffect, useState } from "react";

// Router
import { useParams } from "react-router-dom";

// Icons
import { Eraser, PaintBucket } from "lucide-react";

// TipTap
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { useEditor, EditorContent } from "@tiptap/react";

// Nodes
import DropzoneNode from "../format/nodes/DropzoneNode";
import AnswerInputNode from "../format/nodes/AnswerInputNode";

const RichTextPreviewer = ({
  id,
  text,
  rawKey,
  initialNumber,
  className = "",
  allowInput = false,
  allowDropzone = false,
}) => {
  if (!text) return null;
  const { testId } = useParams();
  const [menuPos, setMenuPos] = useState(null);
  const { getProperty, updateProperty } = useStore("contents");

  const contentFromStore = getProperty(rawKey);
  const content = contentFromStore || text;

  const editor = useEditor({
    content,
    extensions: [
      Image,
      StarterKit.configure({ heading: false }),
      Highlight.configure({ multicolor: false }),
      ...(allowInput ? [AnswerInputNode({ initialNumber, testId, id })] : []),
      ...(allowDropzone ? [DropzoneNode({ initialNumber, testId, id })] : []),
    ],
    editorProps: { handlePaste: () => true, handleKeyDown: () => true },
    onTransaction({ transaction }) {
      const isHighlight = transaction.steps.some(
        (step) =>
          step.toJSON().stepType === "addMark" ||
          step.toJSON().stepType === "removeMark"
      );
      if (!isHighlight) {
        transaction.setMeta("addToHistory", false);
        transaction.setMeta("preventDispatch", true);
      }
    },
  });

  const clearSelection = () => {
    const sel = window.getSelection();
    if (sel) sel.removeAllRanges();
    setMenuPos(null);

    // Save content to store
    updateProperty(rawKey, editor.getHTML());

    // Clear editor selection
    editor?.commands.setTextSelection(editor.state.selection.to);
    editor?.commands.blur();
  };

  const handleSetHighlight = () => {
    editor.chain().focus().setHighlight({ color: "yellow" }).run();
    clearSelection();
  };

  const handleRemoveHighlight = () => {
    editor.chain().focus().unsetHighlight().run();
    clearSelection();
  };

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const { from, to } = editor.state.selection;
      if (from === to) return setMenuPos(null);

      const domSelection = window.getSelection();
      if (!domSelection.rangeCount) return;

      const range = domSelection.getRangeAt(0);
      const rects = range.getClientRects();
      if (!rects.length) return;

      const lastRect = rects[rects.length - 1];
      setMenuPos({
        top: lastRect.bottom + window.scrollY + 5,
        left: lastRect.right + window.scrollX,
      });
    };

    editor.on("selectionUpdate", update);
    return () => editor.off("selectionUpdate", update);
  }, [editor]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest(".text-editor-menu")) return;

      const sel = window.getSelection();
      if (!sel || sel.toString().trim() === "") {
        setMenuPos(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {menuPos && (
        <div
          style={{ top: menuPos.top, left: menuPos.left }}
          className="flex items-center gap-1 absolute z-50 bg-white p-1 border rounded-md shadow transition-all duration-300"
        >
          {/* Set */}
          <button
            title="Paint"
            aria-label="Paint"
            onClick={handleSetHighlight}
            className="flex items-center justify-center size-8 transition-colors duration-200 rounded-sm hover:bg-gray-100"
          >
            <PaintBucket size={20} />
          </button>

          {/* Divider */}
          <div className="w-0.5 h-6 bg-gray-200 rounded-full" />

          {/* Remove */}
          <button
            title="Erase"
            aria-label="Erase"
            onClick={handleRemoveHighlight}
            className="flex items-center justify-center size-8 transition-colors duration-200 rounded-sm hover:bg-gray-100"
          >
            <Eraser size={20} />
          </button>
        </div>
      )}

      <EditorContent editor={editor} className={`${className} text-editor`} />
    </>
  );
};

export default RichTextPreviewer;
