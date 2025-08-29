import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Lodash
import { debounce } from "lodash";

// Hooks
import useStore from "@/hooks/useStore";

// Tip Tap
import { NodeViewWrapper } from "@tiptap/react";

const Dropzone = ({ id, testId, editor, getPos, initialNumber = 1 }) => {
  const { questionNumber } = useParams();
  const [dropzoneIndex, setDropzoneIndex] = useState(initialNumber);
  const { updateProperty, getData, getProperty } = useStore("answers");

  const text = getProperty(dropzoneIndex)?.text || "";
  const isActive = Number(questionNumber) === dropzoneIndex;

  const calculateIndex = useCallback(() => {
    let index = initialNumber;
    const currentPos = getPos();

    editor.state.doc?.descendants((node, pos) => {
      if (node.type.name === "dropzone" && pos < currentPos) {
        index++;
      }
    });

    setDropzoneIndex(index);
  }, [editor, getPos]);

  useEffect(() => {
    calculateIndex();
    const debouncedCalc = debounce(calculateIndex, 50);
    editor.on("update", debouncedCalc);

    return () => {
      editor.off("update", debouncedCalc);
      debouncedCalc.cancel();
    };
  }, [calculateIndex, editor]);

  return (
    <NodeViewWrapper className="inline-block px-1 py-px">
      {text ? (
        <DragAndDropComponent
          id={id}
          text={text}
          getData={getData}
          dropzoneIndex={dropzoneIndex}
          updateProperty={updateProperty}
        />
      ) : (
        <DropzoneComponent
          id={id}
          isActive={isActive}
          dropzoneIndex={dropzoneIndex}
          updateProperty={updateProperty}
        />
      )}
    </NodeViewWrapper>
  );
};

const DropzoneComponent = ({ id, isActive, dropzoneIndex, updateProperty }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const jsonData = e.dataTransfer.getData("application/json");
    if (!jsonData) return;
    const {
      value,
      index,
      id: valueId,
      fromDropzone,
    } = JSON?.parse(jsonData) || {};

    if (valueId !== id) return;

    updateProperty(dropzoneIndex, { text: value, fromDropzone, index });
  };

  return (
    <div
      onDrop={handleDrop}
      children={dropzoneIndex}
      onDragOver={(e) => e.preventDefault()}
      className={`${
        isActive
          ? "border-transparent outline-2 outline-blue-500 outline-dashed -outline-offset-1"
          : "border-gray-500"
      } w-40 bg-white font-bold border border-dashed text-center rounded`}
    />
  );
};

const DragAndDropComponent = ({
  id,
  text,
  getData,
  dropzoneIndex,
  updateProperty,
}) => {
  const answersData = getData();

  const handleDrop = (e) => {
    e.preventDefault();
    const jsonData = e.dataTransfer.getData("application/json");
    if (!jsonData) return;
    const {
      value,
      index,
      fromDropzone,
      id: valueId,
    } = JSON?.parse(jsonData) || {};

    if (valueId !== id || index === dropzoneIndex) return;

    updateProperty(dropzoneIndex, { text: value, fromDropzone, index });
  };

  const handleDragStart = (e) => {
    e.currentTarget.classList.add("opacity-15");
    const data = JSON.stringify({
      id,
      value: text,
      fromDropzone: true,
      index: dropzoneIndex,
    });
    e.dataTransfer.setData("application/json", data);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-15");
    const answersNumbers = Object.keys(answersData);
    const droppedElNumber = answersNumbers.find((answerNumber) => {
      const { fromDropzone } = answersData[answerNumber];
      return fromDropzone;
    });

    if (!droppedElNumber) return;

    const droppedElData = answersData[droppedElNumber];
    if (droppedElData?.index !== dropzoneIndex) return;

    updateProperty(dropzoneIndex, { text: "" });
    updateProperty(droppedElNumber, { text: droppedElData.text });
  };

  return (
    <div
      children={text}
      draggable="true"
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      className="min-w-40 max-w-max bg-white px-1.5 text-sm leading-6 border border-blue-500 text-center rounded cursor-move"
    />
  );
};

export default Dropzone;
