import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Lodash
import { debounce } from "lodash";

// Tip Tap
import { NodeViewWrapper } from "@tiptap/react";

// Hooks
import useStore from "@/hooks/useStore";
import usePathSegments from "@/hooks/usePathSegments";

const Dropzone = ({ id, testId, editor, getPos, initialNumber = 1 }) => {
  const navigate = useNavigate();
  const { questionNumber } = useParams();
  const { pathSegments } = usePathSegments();
  const [dropzoneIndex, setDropzoneIndex] = useState(initialNumber);
  const { updateProperty, getData, getProperty } = useStore("answers");

  const text = getProperty(dropzoneIndex)?.text || "";
  const isActive = Number(questionNumber) === dropzoneIndex;

  const setActiveDropzone = () => {
    navigate(
      `/test/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${dropzoneIndex}`
    );
  };

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
          setActiveDropzone={setActiveDropzone}
        />
      ) : (
        <DropzoneComponent
          id={id}
          isActive={isActive}
          dropzoneIndex={dropzoneIndex}
          updateProperty={updateProperty}
          setActiveDropzone={setActiveDropzone}
        />
      )}
    </NodeViewWrapper>
  );
};

const DropzoneComponent = ({
  id,
  isActive,
  dropzoneIndex,
  updateProperty,
  setActiveDropzone,
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    setActiveDropzone();
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
      onClick={setActiveDropzone}
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
  setActiveDropzone,
}) => {
  const answersData = getData();

  const handleDrop = (e) => {
    e.preventDefault();
    setActiveDropzone();

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
      onClick={setActiveDropzone}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      className="min-w-40 max-w-max bg-white px-1.5 text-sm leading-6 border border-blue-500 text-center rounded cursor-move"
    />
  );
};

export default Dropzone;
