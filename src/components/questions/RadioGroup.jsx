// React
import { useEffect, useRef } from "react";

// Hooks
import useStore from "@/hooks/useStore";
import usePathSegments from "@/hooks/usePathSegments";

// Router
import { useNavigate, useParams } from "react-router-dom";

const RadioGroup = ({ initialNumber, groups }) => {
  const navigate = useNavigate();
  const { questionNumber } = useParams();
  const { pathSegments: path } = usePathSegments();
  const { updateProperty, getData } = useStore("answers");
  const initialValues = getData();

  const handleNavigate = (newQuestionNumber) => {
    if (newQuestionNumber === questionNumber) return;
    navigate(`/test/${path[1]}/${path[2]}/${path[3]}/${newQuestionNumber}`);
  };

  return (
    <ul className="space-y-6">
      {groups.map(({ question, answers }, index) => {
        const groupNumberRef = useRef(null);
        const groupNumber = initialNumber + index;
        const initialValue = initialValues[groupNumber];
        const isActive = questionNumber === String(groupNumber);

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
                onFocus={() => handleNavigate(groupNumber)}
                className={`inline-block py-0.5 px-1.5 rounded mr-2 border-2 outline-none transition-colors duration-300 ${
                  isActive ? "border-blue-400" : "border-gray-200"
                }`}
              >
                {groupNumber}
              </b>
              <span>{question}</span>
            </p>

            {/* Answers */}
            <Answers
              answers={answers}
              groupNumber={groupNumber}
              initialValue={initialValue?.text}
              onSelect={(value) => {
                handleNavigate(groupNumber);
                updateProperty(groupNumber, { text: value });
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

const Answers = ({ answers, groupNumber, onSelect, initialValue }) => {
  return (
    <ul>
      {answers.map(({ text }, index) => (
        <li key={index}>
          <label className="flex items-center gap-3.5 h-11 px-3.5 rounded-md cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              value={text}
              className="size-3.5"
              name={`answer-${groupNumber}`}
              defaultChecked={initialValue === text}
              onChange={(e) => onSelect(e.target.value)}
            />
            <span>{text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioGroup;
