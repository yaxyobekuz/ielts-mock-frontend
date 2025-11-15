// Icons
import { MoveHorizontal } from "lucide-react";

// Data
import questionsType from "../data/questionsType";

// Hooks
import useStore from "@/hooks/useStore";
import useModule from "../hooks/useModule";
import usePathSegments from "../hooks/usePathSegments";

// Router
import { Navigate, useParams } from "react-router-dom";

// React
import { useMemo, useState, useRef, useEffect } from "react";

// Components
import RichTextPreviewer from "@/components/RichTextPreviewer";
import TextDraggable from "@/components/questions/TextDraggable";

const questionsMap = {};
questionsType.forEach((q) => (questionsMap[q.value] = q.component));
const TextComponent = questionsMap["text"];

const Reading = () => {
  const { partNumber, testId } = useParams();
  const { pathSegments } = usePathSegments();
  const { getProperty } = useStore("modules");
  const readingAnwers = getProperty("reading");
  const listeningAnwers = getProperty("listening");
  const module = pathSegments[2];

  const { getModuleData } = useModule(module, testId);
  const { parts } = getModuleData() || {};

  // Navigate
  if (readingAnwers?.isDone) {
    return <Navigate to={`/tutorial/${testId}`} />;
  }

  if (!listeningAnwers?.isDone) {
    return <Navigate to={`/test/${testId}/listening/1/1`} />;
  }

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

  const { sections, text, title, description } = currentPart || {};

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

  return (
    <div className="container h-full pt-4 !pr-0">
      {/* Part header */}
      <div className="w-full pr-4">
        <div className="w-full bg-[#f1f2ec] py-2.5 px-4 mb-4 rounded-md border border-gray-300">
          <h1 className="mb-1 font-bold">{title || `Part ${partNumber}`}</h1>
          <p>{description || "Read the text and answer questions."}</p>
        </div>
      </div>

      <div ref={containerRef} className="flex w-full h-[calc(100%-108px)]">
        {/* Left side */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="h-full overflow-y-auto ielts-theme-scroll heading-dropzone"
        >
          {/* For splitted answers section */}
          {sections.map(({ type, splitAnswers, text, _id }, index) => {
            if (type !== "text-draggable" || !splitAnswers) return;
            const prevSectionsTotalQuestions =
              sections
                .slice(0, index)
                .reduce((acc, sec) => acc + sec.questionsCount, 0) +
              cumulativeQuestions;

            return (
              <TextDraggable
                text={text}
                rawKey={_id}
                onlyShowText
                initialId={_id}
                key={"reading" + partNumber}
                className="size-full max-h-full"
                initialNumber={prevSectionsTotalQuestions + 1}
              />
            );
          })}

          <TextComponent
            text={text}
            initialNumber={0}
            key={"reading" + partNumber}
            rawKey={"reading" + partNumber}
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
          style={{ width: `${100 - leftWidth}%` }}
          className="h-full overflow-y-auto pl-5 pr-12 pb-12 ielts-theme-scroll"
        >
          {sections?.map((section, index) => {
            const prevSectionsTotalQuestions = sections
              .slice(0, index)
              .reduce((acc, sec) => acc + sec.questionsCount, 0);

            const questionRange = `${
              prevSectionsTotalQuestions + cumulativeQuestions + 1
            }-${
              prevSectionsTotalQuestions +
              section.questionsCount +
              cumulativeQuestions
            }`;

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
    <section id={`s-${index}`} className="mb-6">
      {/* Top */}
      <div className="flex items-start justify-between gap-5">
        <div className="mb-4 space-y-2">
          <h2 className="font-bold">Questions {questionRange}</h2>
          <RichTextPreviewer text={description} />
        </div>
      </div>

      {/* Main */}
      {QuestionComponent ? (
        <QuestionComponent
          {...section}
          rawKey={rawKey}
          initialNumber={initialQuestionNumber}
          initialId={
            section.type === "text-draggable" && section.splitAnswers
              ? rawKey
              : undefined
          }
        />
      ) : (
        <div className="bg-gray-50 border rounded p-4 text-yellow-800">
          Unknown question type: {type}
        </div>
      )}
    </section>
  );
};

export default Reading;
