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

  // Memoize expensive calculations
  const { currentPart, totalQuestions } = useMemo(() => {
    const partNum = parseInt(partNumber);
    const part = parts.find((p) => p.number === partNum);
    const total = parts
      .slice(0, partNum - 1)
      .reduce((acc, part) => acc + part.questions, 0);

    return {
      currentPart: part,
      totalQuestions: total,
    };
  }, [location.pathname, parts, partNumber]);

  const { description, sections } = currentPart || {};

  // Early return if no current part
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
        {/* Subheader */}
        <header className="w-full bg-[#f1f2ec] py-3 px-4 mb-5 rounded border border-gray-300">
          <h1 className="mb-1 font-bold">Part {partNumber}</h1>
          <p>{description}</p>
        </header>

        {/* Content */}
        <main className="w-full">
          {sections?.map((section, index) => (
            <Section
              key={`${section.type}-${index}`} // Better key for potential reordering
              section={section}
              totalQuestions={totalQuestions}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

// Extract section component for better performance and readability
const Section = ({ section, totalQuestions }) => {
  const { title, description, type, data } = section;

  const QuestionComponent = questionsMap[type];

  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      {QuestionComponent ? (
        <QuestionComponent {...data} initialNumber={totalQuestions + 1} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-300 rounded p-4 text-yellow-800">
          Unknown section type: {type}
        </div>
      )}
    </section>
  );
};

export default PartBody;
