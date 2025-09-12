import { useParams } from "react-router-dom";

// Tip tap
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";

// Nodes
import DropzoneNode from "../format/nodes/DropzoneNode";
import AnswerInputNode from "../format/nodes/AnswerInputNode";

const RichTextPreviewer = ({
  id,
  text,
  initialNumber,
  className = "",
  allowInput = false,
  allowDropzone = false,
}) => {
  if (!text) return null;
  const { testId } = useParams();

  const editor = useEditor(
    {
      content: text,
      editable: false,
      extensions: [
        Image,
        StarterKit.configure({ heading: false }),
        ...(allowInput ? [AnswerInputNode({ initialNumber, testId, id })] : []),
        ...(allowDropzone ? [DropzoneNode({ initialNumber, testId, id })] : []),
      ],
    },
    [text, initialNumber]
  );

  return (
    <EditorContent editor={editor} className={`${className} text-editor`} />
  );
};

export default RichTextPreviewer;
