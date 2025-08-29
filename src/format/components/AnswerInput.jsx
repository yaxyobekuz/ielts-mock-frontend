// Lodash
import { debounce } from "lodash";

// Tip Tap
import { NodeViewWrapper } from "@tiptap/react";

// React
import { useCallback, useEffect, useRef, useState } from "react";

const AnswerInput = ({ editor, getPos, initialNumber = 1, id, testId }) => {
  const hiddenTextRef = useRef(null);
  const [text, setText] = useState("");
  const [inputWidth, setInputWidth] = useState("max");
  const [inputIndex, setInputIndex] = useState(initialNumber);

  const calculateIndex = useCallback(() => {
    let index = initialNumber;
    const currentPos = getPos();

    editor.state?.doc?.descendants((node, pos) => {
      if (node.type.name === "answer-input" && pos < currentPos) {
        index++;
      }
    });

    setInputIndex(index);
  }, [editor, getPos]);

  useEffect(() => {
    calculateIndex();
    const debouncedCalc = debounce(calculateIndex, 50);
    editor.on("update", debouncedCalc);

    return () => {
      debouncedCalc?.cancel();
      editor.off("update", debouncedCalc);
    };
  }, [calculateIndex, editor]);

  useEffect(() => {
    if (hiddenTextRef.current) {
      setInputWidth(hiddenTextRef.current.offsetWidth + 20);
    }
  }, [text]);

  return (
    <NodeViewWrapper className="inline-block px-1 py-px max-w-full">
      <span ref={hiddenTextRef} className="hidden-text">
        {text}
      </span>

      <input
        type="text"
        value={text}
        className="answer-input"
        placeholder={inputIndex}
        style={{ width: inputWidth }}
        id={`answer-input-${inputIndex}`}
        onChange={(e) => setText(e.target.value)}
      />
    </NodeViewWrapper>
  );
};

export default AnswerInput;
