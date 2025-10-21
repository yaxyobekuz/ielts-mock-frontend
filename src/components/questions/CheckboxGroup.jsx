// Hooks
import useStore from "@/hooks/useStore";
import usePathSegments from "@/hooks/usePathSegments";

// Router
import { useNavigate, useParams } from "react-router-dom";

// React
import { useEffect, useMemo, useRef, useState } from "react";

const CheckboxGroup = ({ initialNumber, groups }) => {
  const navigate = useNavigate();
  const { questionNumber } = useParams();
  const { pathSegments: path } = usePathSegments();
  const { updateProperty, getData } = useStore("answers");
  const initialValues = getData();

  const groupNumbers = useMemo(() => {
    let current = initialNumber;
    return groups.map(({ maxSelected }) => {
      const start = current;
      const end = current + maxSelected - 1;
      current = end + 1;
      return { start, end, groupKey: `${start}-${end}` };
    });
  }, [groups, initialNumber]);

  const handleNavigate = (newQuestionNumber) => {
    if (newQuestionNumber === questionNumber) return;
    navigate(`/test/${path[1]}/${path[2]}/${path[3]}/${newQuestionNumber}`);
  };

  return (
    <ul className="space-y-6">
      {groups.map(({ question, answers, maxSelected }, index) => {
        const groupNumberRef = useRef(null);
        const { start, end, groupKey } = groupNumbers[index];
        const initialValue = initialValues[groupKey];
        const isActive =
          questionNumber === groupKey ||
          (questionNumber >= start && questionNumber <= end);

        useEffect(() => {
          if (!groupNumberRef) return;
          if (isActive) groupNumberRef.current?.focus();
        }, [index, questionNumber]);

        return (
          <li key={index}>
            <p className="mb-1">
              <b
                tabIndex={0}
                ref={groupNumberRef}
                onFocus={() => handleNavigate(groupKey)}
                className={`inline-block py-0.5 px-1.5 rounded mr-2 border-2 outline-none transition-colors duration-300 ${
                  isActive ? "border-blue-400" : "border-gray-200"
                }`}
              >
                {groupKey}
              </b>

              <span>{question}</span>
            </p>

            {/* Answers */}
            <Answers
              answers={answers}
              groupNumber={start}
              maxSelected={maxSelected}
              initialValue={initialValue}
              onChange={(value) => {
                handleNavigate(groupKey);
                updateProperty(groupKey, value);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

const Answers = ({
  answers,
  onChange,
  groupNumber,
  maxSelected,
  initialValue,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState(initialValue || []);

  const handleCheckboxChange = (index) => {
    const answer = answers[index].text;
    const isSelected = selectedAnswers.includes(answer);

    let updatedAnswers;
    if (isSelected) {
      updatedAnswers = selectedAnswers.filter((item) => item !== answer);
    } else {
      updatedAnswers = [...selectedAnswers, answer];
    }

    setSelectedAnswers(updatedAnswers);
    onChange && onChange(updatedAnswers);
  };

  return (
    <ul className="space-y-px">
      {answers.map(({ text }, index) => {
        const id = `answer-${groupNumber}-${index}`;
        const isChecked = selectedAnswers.includes(text);
        const isDisabled = !isChecked && selectedAnswers?.length >= maxSelected;

        return (
          <li key={index}>
            <label
              htmlFor={id}
              className={`${
                isDisabled ? "!bg-transparent" : "cursor-pointer"
              } ${
                isChecked ? "bg-[#bbd8f0]" : "hover:bg-[#e4e4e4]"
              } flex items-center gap-3.5 h-11 px-3.5 text-base`}
            >
              <input
                id={id}
                value={text}
                type="checkbox"
                disabled={isDisabled}
                defaultChecked={isChecked}
                name={`group-${groupNumber}`}
                onChange={() => handleCheckboxChange(index)}
                className="w-auto cursor-pointer disabled:opacity-50 disabled:cursor-auto"
              />

              <span>{text}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default CheckboxGroup;
