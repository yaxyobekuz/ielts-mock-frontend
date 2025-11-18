// React
import { useEffect, useRef } from "react";

// Helpers
import { getLetterByIndex } from "@/lib/helpers";

// Hooks
import useStore from "@/hooks/useStore";
import usePathSegments from "@/hooks/usePathSegments";

// Router
import { useNavigate, useParams } from "react-router-dom";

const GridMatching = ({ initialNumber, grid, _id: sectionId }) => {
  const navigate = useNavigate();
  const { questionNumber } = useParams();
  const { pathSegments: path } = usePathSegments();
  const { updateProperty, getData } = useStore("answers");
  const answers = getData();

  const handleInputSelect = (questionNumber, index) => {
    updateProperty(questionNumber, { text: getLetterByIndex(index) });
  };

  const handleNavigate = (newQuestionNumber) => {
    if (newQuestionNumber == questionNumber) return;
    navigate(`/test/${path[1]}/${path[2]}/${path[3]}/${newQuestionNumber}`);
  };

  return (
    <div className="py-5">
      {/* Head */}
      <div className="flex min-w-max h-12">
        <div className="btn w-full min-w-48 max-w-md h-12 p-0 rounded-none border-r border-black font-bold" />
        {Array.from({ length: grid.answerColumns }, (_, i) => (
          <div
            key={i}
            className="shrink-0 btn size-12 p-0 rounded-none border-r border-black font-bold last:border-r-0"
          >
            {getLetterByIndex(i)}
          </div>
        ))}
      </div>

      {/* Body */}
      {grid.questions.map((question, qIndex) => {
        const groupNumberRef = useRef(null);
        const qNumber = qIndex + initialNumber;
        const isActive = questionNumber == qNumber;

        useEffect(() => {
          if (!groupNumberRef) return;
          if (isActive) groupNumberRef.current?.focus();
        }, [qIndex, qNumber, questionNumber]);

        return (
          <div key={qIndex} className="flex min-h-12">
            {/* Question */}
            <div className="flex items-start gap-3 min-w-48 max-w-md w-full h-auto p-1.5 rounded-none border-t border-r border-black">
              <b
                tabIndex={0}
                ref={groupNumberRef}
                onFocus={() => handleNavigate(qNumber)}
                className={`inline-block py-0.5 px-1.5 rounded mr-2 border-2 outline-none transition-colors duration-300 ${
                  isActive ? "border-blue-400" : "border-transparent"
                }`}
              >
                {qNumber}
              </b>
              <p>{question.text}</p>
            </div>

            {/* Answers */}
            {Array.from({ length: grid.answerColumns }, (_, aIndex) => {
              const defaultChecked =
                answers[qNumber]?.text === getLetterByIndex(aIndex);

              return (
                <label
                  key={aIndex}
                  className="shrink-0 btn w-12 h-auto p-0 rounded-none border-t border-r border-black has-[:checked]:bg-blue-100 hover:bg-blue-50 last:border-r-0"
                >
                  <input
                    type="radio"
                    defaultChecked={defaultChecked}
                    name={`section-${sectionId}-question-${qIndex}`}
                    onChange={() => {
                      handleNavigate(qNumber);
                      handleInputSelect(qNumber, aIndex);
                    }}
                  />
                </label>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridMatching;
