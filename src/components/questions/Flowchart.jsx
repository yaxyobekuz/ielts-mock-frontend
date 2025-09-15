import { useEffect, useState } from "react";

// Random id generator
import { v4 as uuidv4 } from "uuid";

// Hooks
import useStore from "@/hooks/useStore";

// Helpers
import { countExactMatches } from "@/lib/helpers";

// Components
import Icon from "../Icon";
import RichTextPreviewer from "../RichTextPreviewer";

// Icons
import arrowDownIcon from "@/assets/icons/arrow-down.svg";

const target = '<span data-name="dropzone"></span>';

const Flowchart = ({
  items,
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
    <div className="flex items-start gap-5 w-full">
      <div className="space-y-2">
        {/* Title */}
        <b className="block text-center">{items.title}</b>

        {/* Blocks */}
        <div className="space-y-2">
          {items.data.map(({ text }, index) => {
            const prevContents = items.data
              .slice(0, index)
              .map((item) => item.text)
              .join("");

            const itemInitialNumber =
              countExactMatches(prevContents, target) + initialNumber;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <RichTextPreviewer
                  id={id}
                  text={text}
                  allowDropzone
                  rawKey={rawKey + index}
                  initialNumber={itemInitialNumber}
                  className="w-full p-2 text-editor border-2 border-[#333]"
                />

                {/* Arrow icon */}
                {items.data.length !== index + 1 ? (
                  <Icon src={arrowDownIcon} alt="Arrow down" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Answer choices wrapper */}
      <div className="sticky top-5">
        <b className="inline-block mb-2">{options.title}</b>

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

export default Flowchart;
