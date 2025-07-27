import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

// Components
import Text from "./questions/Text";
import Flowchart from "./questions/Flowchart";
import RadioGroup from "./questions/RadioGroup";
import TextDraggable from "./questions/TextDraggable";

const questionsMap = {
  text: Text,
  flowchart: Flowchart,
  "radio-group": RadioGroup,
  "text-draggable": TextDraggable,
};

const PartBody = ({ parts }) => {
  const location = useLocation();
  const { partNumber } = useParams();

  // Calculate current part and cumulative question count
  const { currentPart, cumulativeQuestions } = useMemo(() => {
    const partNum = parseInt(partNumber);
    const part = parts.find((p) => p.number === partNum);
    const cumulative = parts
      .slice(0, partNum - 1)
      .reduce((acc, part) => acc + part.totalQuestions, 0);

    return {
      currentPart: part,
      cumulativeQuestions: cumulative,
    };
  }, [location.pathname, parts, partNumber]);

  const { description, sections } = currentPart || {};

  // Return error if part not found
  if (!currentPart) {
    return (
      <div className="h-[calc(100%-112px)] overflow-y-auto scroll-smooth">
        <div className="py-8 px-5">
          <div className="w-full bg-red-50 py-3 px-4 mb-5 rounded border border-red-300">
            <p className="text-red-700">Part not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100%-112px)] overflow-y-auto scroll-smooth">
      <div className="py-8 px-5">
        {/* Part header */}
        <header className="w-full bg-[#f1f2ec] py-3 px-4 mb-5 rounded border border-gray-300">
          <h1 className="mb-1 font-bold">Part {partNumber}</h1>
          <p>{description}</p>
        </header>

        {/* Sections content */}
        <main className="w-full">
          {sections?.map((section, index) => {
            const prevSectionsTotalQuestionsCount = sections
              .slice(0, index)
              .reduce((acc, sec) => acc + sec.questionsCount, 0);

            return (
              <Section
                section={section}
                key={`${section.questionType}-${index}`}
                initialQuestionNumber={
                  prevSectionsTotalQuestionsCount + cumulativeQuestions + 1
                }
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

// Individual section component
const Section = ({ section, initialQuestionNumber }) => {
  const { title, description, questionType, content } = section;

  const QuestionComponent = questionsMap[questionType];

  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      {QuestionComponent ? (
        <QuestionComponent {...content} initialNumber={initialQuestionNumber} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-300 rounded p-4 text-yellow-800">
          Unknown question type: {questionType}
        </div>
      )}
    </section>
  );
};

export default PartBody;
