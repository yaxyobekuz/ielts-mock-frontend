import { useMemo, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// Icons
import { MoveHorizontal } from "lucide-react";

// Data
import questionsType from "../data/questionsType";

// Hooks
import useModule from "../hooks/useModule";
import usePathSegments from "../hooks/usePathSegments";

const questionsMap = {};
questionsType.forEach((q) => (questionsMap[q.value] = q.component));
const TextComponent = questionsMap["text"];

const Reading = () => {
  const { partNumber, testId } = useParams();
  const { pathSegments } = usePathSegments();
  const module = pathSegments[4];

  const { getModuleData } = useModule(module, testId);
  const parts = getModuleData();

  // Calculate current part and cumulative question count
  const { currentPart, cumulativeQuestions } = useMemo(() => {
    const partNum = parseInt(partNumber);
    const part = parts?.find((p) => p.number === partNum);
    const cumulative = parts
      ?.slice(0, partNum - 1)
      ?.reduce((acc, part) => acc + part.totalQuestions, 0);

    return {
      currentPart: part,
      cumulativeQuestions: cumulative,
    };
  }, [parts, partNumber, module]);

  const { sections, text } = currentPart || {};

  // Left panel width state
  const isDragging = useRef(false);
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50);

  useEffect(() => {
    const updateSelectStyle = (select = "auto") => {
      document.body.style.userSelect = select;
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      updateSelectStyle("none");

      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      updateSelectStyle("auto");
      isDragging.current = false;
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    <div className="container h-full pt-4">
      {/* Part header */}
      <div className="w-full bg-[#f1f2ec] py-2.5 px-4 mb-4 rounded-md border border-gray-300">
        <h1 className="mb-1 font-bold">Part {partNumber}</h1>
        <p>Read the text and answer questions {questionRange}.</p>
      </div>

      <div
        className="flex w-full h-[calc(100%-108px)] relative"
        ref={containerRef}
      >
        {/* Left side */}
        <div
          className="h-full overflow-y-auto"
          style={{ width: `${leftWidth}%` }}
        >
          <TextComponent
            text={text}
            initialNumber={0}
            className="size-full max-h-full"
          />
        </div>

        {/* Divider */}
        <div
          onMouseDown={() => (isDragging.current = true)}
          className="flex items-center justify-center shrink-0 w-[3px] cursor-e-resize bg-gray-400 relative"
        >
          <div className="flex items-center justify-center absolute z-10 size-8 bg-gray-50 border-[3px] border-gray-400 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-gray-200">
            <MoveHorizontal size={18} strokeWidth={2} />
          </div>
        </div>

        {/* Right side */}
        <div
          className="h-full overflow-y-auto pl-5"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {sections?.map((section, index) => {
            const prevSectionsTotalQuestions = sections
              .slice(0, index)
              .reduce((acc, sec) => acc + sec.questionsCount, 0);

            return (
              <Section
                index={index}
                section={section}
                questionRange={questionRange}
                key={`${section.questionType}-${index}`}
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
const Section = ({ index, section, initialQuestionNumber, questionRange }) => {
  const { description, type } = section;
  const QuestionComponent = questionsMap[type];

  return (
    <section id={`s-${index}`} className="mb-6">
      {/* Top */}
      <div className="flex items-start justify-between gap-5">
        <div className="mb-4 space-y-2">
          <h2 className="font-bold">Questions {questionRange}</h2>
          <p>{description}</p>
        </div>
      </div>

      {/* Main */}
      {QuestionComponent ? (
        <QuestionComponent {...section} initialNumber={initialQuestionNumber} />
      ) : (
        <div className="bg-gray-50 border rounded p-4 text-yellow-800">
          Unknown question type: {type}
        </div>
      )}
    </section>
  );
};

export default Reading;
