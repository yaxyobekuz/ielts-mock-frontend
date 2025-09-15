// React
import { useEffect, useMemo } from "react";

// Data
import questionsType from "@/data/questionsType";

// Hooks
import useStore from "@/hooks/useStore";
import useModule from "@/hooks/useModule";
import usePathSegments from "@/hooks/usePathSegments";

// Router
import { useNavigate, useParams } from "react-router-dom";

const questionsMap = {};
questionsType.forEach((q) => (questionsMap[q.value] = q.component));

const Listening = () => {
  const navigate = useNavigate();
  const { partNumber, testId } = useParams();
  const { getProperty } = useStore("modules");
  const { pathSegments, location } = usePathSegments();
  const listeningAnwers = getProperty("listening");
  const module = pathSegments[4];

  const { getModuleData } = useModule(module, testId);
  const parts = getModuleData();

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

  const { sections } = currentPart || {};

  useEffect(() => {
    if (listeningAnwers?.isDone) {
      navigate(`/tests/test/${testId}/module/reading/1/1`);
    }
  }, [listeningAnwers]);

  // Return error if part not found
  if (!currentPart) {
    return (
      <div className="container">
        <div className="py-8">
          <div className="w-full bg-red-50 py-3 px-4 mb-5 rounded-xl border border-red-300">
            <p className="text-red-700">Part not found</p>
          </div>
        </div>
      </div>
    );
  }

  const questionRange = `${cumulativeQuestions + 1}–${
    currentPart?.totalQuestions + cumulativeQuestions
  }`;

  return (
    <div className="container">
      <div className="pt-8 pb-16">
        {/* Part header */}
        <div className="w-full bg-[#f1f2ec] py-2.5 px-4 mb-5 rounded-md border border-gray-300">
          <h1 className="mb-1 font-bold">Part {partNumber}</h1>
          <p>Listen and answer questions {questionRange}.</p>
        </div>

        {/* Sections content */}
        <div className="w-full">
          {sections?.map((section, index) => {
            const prevSectionsTotalQuestions = sections
              .slice(0, index)
              .reduce((acc, sec) => acc + sec.questionsCount, 0);

            return (
              <Section
                index={index}
                section={section}
                key={section._id}
                rawKey={section._id}
                questionRange={questionRange}
                initialQuestionNumber={
                  prevSectionsTotalQuestions + cumulativeQuestions + 1
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Individual section component
const Section = ({
  index,
  rawKey,
  section,
  questionRange,
  initialQuestionNumber,
}) => {
  const { description, type } = section;
  const QuestionComponent = questionsMap[type];

  return (
    <section id={`s-${index}`} className="mb-6 ">
      {/* Top */}
      <div className="flex items-start justify-between gap-5">
        {/* Section details */}
        <div className="mb-4 space-y-2">
          <h2 className="font-bold">Questions {questionRange}</h2>
          <p>{description}</p>
        </div>
      </div>

      {/* Main */}
      {QuestionComponent ? (
        <QuestionComponent
          {...section}
          rawKey={rawKey}
          initialNumber={initialQuestionNumber}
        />
      ) : (
        <div className="bg-gray-50 border rounded p-4 text-yellow-800">
          Unknown question type: {type}
        </div>
      )}
    </section>
  );
};

export default Listening;
