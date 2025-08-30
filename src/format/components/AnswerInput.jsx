import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Lodash
import { debounce } from "lodash";

// Tip Tap
import { NodeViewWrapper } from "@tiptap/react";

// Hooks
import useStore from "@/hooks/useStore";
import usePathSegments from "@/hooks/usePathSegments";

const AnswerInput = ({ editor, getPos, initialNumber = 1 }) => {
  // Calculate the index of current input
  const calculateIndex = useCallback(() => {
    let index = initialNumber;
    const currentPos = getPos();

    editor.state?.doc?.descendants((node, pos) => {
      if (node.type.name === "answer-input" && pos < currentPos) {
        index++;
      }
    });

    return index;
  }, [editor, getPos, initialNumber]);

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const hiddenTextRef = useRef(null);
  const { questionNumber } = useParams();
  const { pathSegments } = usePathSegments();
  const [inputWidth, setInputWidth] = useState("max");
  const { updateProperty, getProperty } = useStore("answers");
  const [inputIndex, setInputIndex] = useState(calculateIndex());
  const [text, setText] = useState(getProperty(inputIndex)?.text || "");
  const isActiveInput = inputIndex === Number(questionNumber);

  // Navigate to this input if not active
  const setActiveInput = useCallback(() => {
    if (isActiveInput) return;

    navigate(
      `/tests/test/${pathSegments[2]}/module/${pathSegments[4]}/${pathSegments[5]}/${inputIndex}`
    );
  }, [isActiveInput, navigate, pathSegments, inputIndex]);

  const debouncedPropertyChange = useRef(
    debounce((value, index) => {
      updateProperty(index, { text: value });
    }, 300)
  ).current;

  // Handle input change
  const handleInputChange = useCallback(
    ({ target: { value } }) => {
      setText(value);
      setActiveInput();
      debouncedPropertyChange(value, inputIndex);
    },
    [setActiveInput, debouncedPropertyChange, inputIndex]
  );

  // Cleanup debounced
  useEffect(() => {
    return () => {
      debouncedPropertyChange.flush();
    };
  }, [debouncedPropertyChange]);

  // Update index when document changes
  useEffect(() => {
    setInputIndex(calculateIndex());
  }, [calculateIndex]);

  // Adjust width based on text
  useEffect(() => {
    if (hiddenTextRef.current) {
      setInputWidth(hiddenTextRef.current.offsetWidth + 20);
    }
  }, [text]);

  // Auto focus active input
  useEffect(() => {
    if (isActiveInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActiveInput]);

  return (
    <NodeViewWrapper className="inline-block px-1 py-px max-w-full">
      {/* Hidden span to calculate width */}
      <span ref={hiddenTextRef} className="hidden-text">
        {text}
      </span>

      <input
        type="text"
        value={text}
        ref={inputRef}
        autoComplete="off"
        onClick={setActiveInput}
        onFocus={setActiveInput}
        placeholder={inputIndex}
        onChange={handleInputChange}
        style={{ width: inputWidth }}
        id={`answer-input-${inputIndex}`}
        className={`answer-input ${isActiveInput ? "active" : ""}`}
      />
    </NodeViewWrapper>
  );
};

export default AnswerInput;
