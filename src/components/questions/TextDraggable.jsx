import { useEffect, useState } from "react";

// Random id generator
import { v4 as uuidv4 } from "uuid";

// Hooks
import useStore from "@/hooks/useStore";

// Components
import RichTextPreviewer from "../RichTextPreviewer";

const TextDraggable = ({
  text,
  rawKey,
  options,
  initialNumber,
  questionsCount,
}) => {
  const [id] = useState(uuidv4());
  const { getData } = useStore("answers");
  const [optionsState, setOptionsState] = useState(options?.data || []);
  const answersData = getData();

  useEffect(() => {
    let answersTexts = [];
    const answersNumbers = Object.keys(answersData);

    for (let i = 0; i < answersNumbers.length; i++) {
      const answerNumber = answersNumbers[i];
      const answerText = answersData[answerNumber].text;
      const maxAnswerNumber = questionsCount + initialNumber - 1;

      if (
        !answerText ||
        initialNumber > answerNumber ||
        answerNumber > maxAnswerNumber
      ) {
        continue;
      }

      answersTexts.push(answerText);
    }

    setOptionsState((options) => {
      const newOptions = options.map((option) => ({
        ...option,
        isUsed: answersTexts.includes(option.option),
      }));

      return newOptions;
    });
  }, [answersData]);

  return (
    <div className="flex gap-5 w-full">
      <RichTextPreviewer
        id={id}
        text={text}
        allowDropzone
        rawKey={rawKey}
        initialNumber={initialNumber}
      />

      <div className="min-w-max space-y-2 pr-5">
        <b className="inline-block">{options.title}</b>

        {/* Answer options */}
        <ul className="max-w-max rounded-md space-y-2">
          {optionsState.map((option, index) => (
            <Option key={index} {...option} id={id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Option = ({ option, id, isUsed }) => {
  const handleDragStart = (e) => {
    if (isUsed) return;
    e.currentTarget.classList.add("opacity-15");
    const data = JSON.stringify({ id, value: option });
    e.dataTransfer.setData("application/json", data);
  };

  const handleDragEnd = (e) => {
    if (isUsed) return;
    e.currentTarget.classList.remove("opacity-15");
  };

  return (
    <li
      draggable={!isUsed}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      className={`${
        isUsed ? "opacity-15 cursor-default select-none" : "cursor-move"
      } max-w-max bg-white px-2 rounded border border-gray-400 transition-opacity duration-200`}
    >
      {option}
    </li>
  );
};

export default TextDraggable;
