import { useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Components
import Text from "./questions/Text";

const questionsMap = { text: Text };

const PartBody = ({ parts }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { partNumber, questionNumber } = useParams();

  // Memoize expensive calculations
  const { paths, currentPart, totalQuestions } = useMemo(() => {
    const pathsArray = location.pathname.split("/").filter(Boolean);
    const partNum = parseInt(partNumber);
    const part = parts.find((p) => p.number === partNum);
    const total = parts
      .slice(0, partNum - 1)
      .reduce((acc, part) => acc + part.questions, 0);

    return {
      paths: pathsArray,
      currentPart: part,
      totalQuestions: total,
    };
  }, [location.pathname, parts, partNumber]);

  const { description, sections } = currentPart || {};

  // Memoize navigation handler
  const handleNavigate = useCallback(
    (questionNum) => {
      navigate(`/${paths[0]}/${paths[1]}/${partNumber}/${questionNum}`);
    },
    [navigate, paths, partNumber]
  );

  // Memoize input resize handler
  const handleResizeInput = useCallback((e) => {
    const input = e.target;
    const hiddenText = input.parentElement?.querySelector(".hidden-text");

    if (hiddenText) {
      hiddenText.textContent = input.value;
      const newWidth = Math.max(108, hiddenText.offsetWidth) + 20;
      input.style.width = `${newWidth}px`;
    }
  }, []);

  // Handle question input focus and active state
  useEffect(() => {
    const questionInputs = document.querySelectorAll(".question-input");

    questionInputs.forEach((input) => {
      const isActiveInput =
        input.getAttribute("data-number") === questionNumber;
      input.classList.toggle("active", isActiveInput);

      if (isActiveInput) input.focus();
    });
  }, [questionNumber]); // Only depend on questionNumber, not full pathname

  // Handle event listeners for navigation and resizing
  useEffect(() => {
    const questionInputs = document.querySelectorAll(".question-input");

    const handleClick = (e) => {
      const questionNum = e.target.getAttribute("data-number");
      if (questionNum) handleNavigate(questionNum);
    };

    const handleFocus = (e) => {
      const questionNum = e.target.getAttribute("data-number");
      if (questionNum) handleNavigate(questionNum);
    };

    // Add event listeners
    questionInputs.forEach((input) => {
      input.addEventListener("click", handleClick);
      input.addEventListener("focus", handleFocus);
      input.addEventListener("input", handleResizeInput);
    });

    // Cleanup function
    return () => {
      questionInputs.forEach((input) => {
        input.removeEventListener("click", handleClick);
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("input", handleResizeInput);
      });
    };
  }, [handleNavigate, handleResizeInput]); // Dependencies are memoized

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
