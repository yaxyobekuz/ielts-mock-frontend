// Icons
import { Check } from "lucide-react";

// Components
import TestHeader from "@/components/TestHeader";
import ErrorContent from "@/components/ErrorContent";

// Hooks
import useStore from "@/hooks/useStore";
import useModule from "@/hooks/useModule";
import usePathSegments from "@/hooks/usePathSegments";
import usePreventUnload from "@/hooks/usePreventUnload";

// Router
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

const TestLayout = ({ audioLoading, audioPlaying }) => {
  usePreventUnload();
  const { testId } = useParams();
  const { pathSegments } = usePathSegments();
  const module = pathSegments[2];

  const { getModuleData } = useModule(module, testId);
  const { parts } = getModuleData() || {};

  if (!parts) {
    return (
      <ErrorContent
        link={{ url: "/", name: "Bosh sahifa" }}
        error={{ code: true, message: "Ma'lumotlar topilmadi" }}
      />
    );
  }

  return (
    <div className="h-screen font-Inter">
      <TestHeader
        testId={testId}
        audioLoading={audioLoading}
        audioPlaying={audioPlaying}
        isListeningPage={pathSegments[2] === "listening"}
        isDeliveringPage={pathSegments[3] === "delivering"}
      />

      <main className="max-h-[calc(100%-112px)] h-full overflow-y-auto ielts-theme-scroll">
        <Outlet />
      </main>

      <Footer parts={parts} testId={testId} module={module} />
    </div>
  );
};

const Footer = ({ parts = [] }) => {
  const { getData } = useStore("answers");
  const { pathSegments } = usePathSegments();
  const isWritingPage = pathSegments[2] === "writing";
  const { getData: getAllWords } = useStore("answers");
  const { partNumber, questionNumber, testId } = useParams();
  const answersData = getData();
  const allWords = getAllWords();

  // Pre-calculate offsets for all parts to avoid repeated slicing
  const questionOffsets = parts.reduce((acc, part, idx) => {
    acc[part.number] = parts
      .slice(0, idx)
      .reduce((sum, p) => sum + p.totalQuestions, 0);
    return acc;
  }, {});

  return (
    <footer className="flex h-14">
      {parts.map(({ number, totalQuestions }) => {
        const words = allWords[number];
        const isActivePart = number === Number(partNumber);
        const Navigation = isActivePart ? "div" : Link;
        const prevQuestionsCount = questionOffsets[number];
        const partUrl = `/test/${testId}/${pathSegments[2]}/${number}/${
          prevQuestionsCount + 1
        }`;

        const partAnswers = Array.from(
          { length: totalQuestions },
          (_, index) => {
            const qNum = prevQuestionsCount + index + 1;
            return answersData[qNum]?.text;
          }
        );

        // Check if all questions in the part are answered
        const isActivePartNumLine = (() => {
          if (isWritingPage) return words;
          return partAnswers.every(Boolean);
        })();
        const answeredCount = partAnswers.filter(Boolean).length;

        return (
          <Navigation
            key={number}
            to={isActivePart ? undefined : partUrl}
            className={`
            ${isWritingPage ? "w-full" : ""}
            ${isActivePart ? "min-w-max px-1.5" : "grow hover:bg-gray-100"}
            
            ${
              isActivePartNumLine && !isActivePart
                ? "border-t-green-700"
                : "border-t-transparent"
            }
            
            flex items-center justify-center gap-4 border-t-[3px] transition-colors duration-300`}
          >
            {/* Part number display */}
            <div
              className={`flex items-center justify-center relative ${
                isWritingPage ? "w-full" : ""
              }`}
            >
              {isActivePartNumLine && (
                <Check
                  size={16}
                  color="#15803d"
                  strokeWidth={4.5}
                  strokeLinecap="square"
                />
              )}

              <span
                className={`${
                  isActivePart ? "font-bold pr-5" : "font-normal"
                } pl-3.5 text-dark`}
              >
                Part {number}
              </span>

              {isActivePart && (
                <div
                  className={`${
                    isActivePartNumLine ? "bg-green-700" : "bg-gray-300"
                  } absolute -top-[17px] w-[calc(100%+16px)] h-[2.5px]`}
                />
              )}
            </div>

            {/* Progress indicator for inactive parts */}
            {!isActivePart && !isActivePartNumLine && !isWritingPage && (
              <span className="text-gray-500">
                {answeredCount} of {totalQuestions}
              </span>
            )}

            {/* Question navigation for active part */}
            {isActivePart && (
              <div className="flex">
                {Array.from({ length: totalQuestions }, (_, idx) => {
                  const qNum = prevQuestionsCount + idx + 1;
                  const isCurrentQ = Number(questionNumber) === qNum;
                  const isAnswered = Boolean(answersData[qNum]?.text);

                  return (
                    <Link
                      key={qNum}
                      to={`/test/${testId}/${pathSegments[2]}/${number}/${qNum}`}
                      className={`inline-block relative px-1 border-2 rounded transition-colors duration-300 hover:border-blue-500 hover:font-bold ${
                        isCurrentQ
                          ? "font-bold border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <div
                        className={`${
                          isAnswered ? "bg-green-700" : "bg-gray-300"
                        } absolute w-[calc(100%+2px)] inset-x-0 -top-[17px] h-[2.5px]`}
                      />
                      <span>{qNum}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </Navigation>
        );
      })}

      {/* Delivering */}
      <NavLink
        to={`/test/${testId}/${pathSegments[2]}/delivering`}
        className="delivering-link flex items-center justify-center shrink-0 w-20 h-full bg-gray-100 ml-auto transition-colors duration-200 hover:text-white hover:bg-black"
      >
        <Check
          size={18}
          strokeWidth={6}
          strokeLinecap="square"
          className="transition-colors duration-200"
        />
      </NavLink>
    </footer>
  );
};

export default TestLayout;
