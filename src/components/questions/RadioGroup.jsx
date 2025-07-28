import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Hooks
import useLocalStorage from "../../hooks/useLocalStorage";

const RadioGroup = ({ initialNumber, questionGroups }) => {
  const questionNumberRef = useRef();
  const { questionNumber } = useParams();

  useEffect(() => {
    const elQuestionNumber = questionNumberRef.current;

    // Scroll to the current question number
    if (elQuestionNumber) {
      elQuestionNumber.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [questionNumber]);

  return (
    <ul className="space-y-6">
      {questionGroups.map(({ questionText, choiceOptions }, index) => {
        let groupNumber = initialNumber + index;
        const isCurrentQuestion = groupNumber === parseInt(questionNumber);

        return (
          <li key={index}>
            <p className="mb-1">
              <b
                ref={questionNumberRef}
                className={`${
                  isCurrentQuestion ? "border-blue-500" : "border-transparent"
                } inline-block py-0.5 px-1.5 rounded mr-2 border-2 transition-colors duration-300`}
              >
                {groupNumber}
              </b>
              <span>{questionText}</span>
            </p>

            {/* Options */}
            <Options groupNumber={groupNumber} choiceOptions={choiceOptions} />
          </li>
        );
      })}
    </ul>
  );
};

const Options = ({ choiceOptions, groupNumber }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Cache path segments
  const pathSegments = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname]
  );

  const { getData, updateProperty } = useLocalStorage("answers");

  // Get current data once
  const currentData = useMemo(() => getData(), [getData]);

  // Navigate to specific group
  const handleNavigate = useCallback(
    (targetGroup) => {
      const [first, second, third] = pathSegments;
      navigate(`/${first}/${second}/${third}/${targetGroup}`);
    },
    [pathSegments, navigate]
  );

  // Handle input change and navigation
  const handleInputChange = useCallback(
    (group, value) => {
      updateProperty(group, value);
      handleNavigate(group);
    },
    [updateProperty, handleNavigate]
  );

  return (
    <ul>
      {choiceOptions.map(({ text }, index) => (
        <li key={`${groupNumber}-${index}`}>
          <label
            onClick={() => handleNavigate(groupNumber)}
            className="flex items-center gap-3.5 h-11 px-3.5 rounded-md cursor-pointer hover:bg-gray-100"
          >
            <input
              type="radio"
              value={text}
              name={`option-${groupNumber}`}
              defaultChecked={currentData[groupNumber] === text}
              onChange={() => handleInputChange(groupNumber, text)}
            />
            <span>{text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioGroup;
