// Router
import {
  Link,
  Outlet,
  NavLink,
  useParams,
  useNavigate,
} from "react-router-dom";

// React
import { useEffect, useRef, useState } from "react";

// Components
import TestHeader from "@/components/TestHeader";
import ErrorContent from "@/components/ErrorContent";

// Hooks
import useStore from "@/hooks/useStore";
import useModule from "@/hooks/useModule";
import usePathSegments from "@/hooks/usePathSegments";
import usePreventUnload from "@/hooks/usePreventUnload";

// Icons
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const TestLayout = ({ audioLoading, audioPlaying, onStopAudio }) => {
  usePreventUnload();
  const { testId } = useParams();
  const navigate = useNavigate();
  const { pathSegments } = usePathSegments();
  const module = pathSegments[2];

  const { getModuleData } = useModule(module, testId);
  const { parts } = getModuleData() || {};

  const durations = {};
  durations["reading"] = getModuleData("reading")?.duration || 0;
  durations["writing"] = getModuleData("writing")?.duration || 0;
  durations["listening"] = getModuleData("listening")?.duration || 0;

  // For timer logic
  const timerRef = useRef();
  const [timeLeft, setTimeLeft] = useState(null);
  const { updateProperty: updateModule } = useStore("modules");
  const { getData, resetData: resetAnswers } = useStore("answers");
  const userAnswers = getData();

  // Next module navigation
  const goToNextModule = () => {
    clearInterval(timerRef.current);

    // Navigate to tutorial
    navigate(`/tutorial/${testId}`);

    // Remove timer from localStorage
    const key = `timer-${testId}-${module}`;
    localStorage.removeItem(key);

    // Save module answers to store
    updateModule(module, { isDone: true, answers: userAnswers });
    resetAnswers();

    // Stop listening audio
    if (module === "listening") onStopAudio?.();
  };

  useEffect(() => {
    if (!module || !durations[module]) return;

    // Get start time from localStorage or set new
    const key = `timer-${testId}-${module}`;
    let startTime = localStorage.getItem(key);

    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem(key, startTime);
    } else {
      startTime = Number(startTime);
    }

    const durationMs = durations[module] * 60 * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const left = Math.max(0, Math.floor((durationMs - elapsed) / 1000));
      setTimeLeft(left);

      // Timer finished, go to next module
      if (left <= 0) goToNextModule();
    };

    timerRef.current = setInterval(updateTimer, 1000);
    updateTimer();
    return () => {
      clearInterval(timerRef.current);
    };
  }, [module, testId]);

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
        timeLeft={timeLeft / 60}
        audioLoading={audioLoading}
        audioPlaying={audioPlaying}
        isListeningPage={pathSegments[2] === "listening"}
        isDeliveringPage={pathSegments[3] === "delivering"}
      />

      <main className="max-h-[calc(100%-112px)] h-full overflow-y-auto ielts-theme-scroll">
        <Outlet />
      </main>

      <Footer parts={parts} />

      <NavigationButtons parts={parts} />
    </div>
  );
};

const Footer = ({ parts = [] }) => {
  const { getData } = useStore("answers");
  const { pathSegments } = usePathSegments();
  const isWritingPage = pathSegments[2] === "writing";
  const { partNumber, questionNumber, testId } = useParams();
  const userAnswers = getData();

  // Pre-calculate offsets for all parts to avoid repeated slicing
  const questionOffsets = parts.reduce((acc, part, idx) => {
    acc[part.number] = parts
      .slice(0, idx)
      .reduce((sum, p) => sum + p.totalQuestions, 0);
    return acc;
  }, {});

  return (
    <footer className="flex h-14">
      {parts.map(({ number, totalQuestions, sections }) => {
        let answeredCount = 0;
        const isActivePart = number === Number(partNumber);
        const Navigation = isActivePart ? "div" : Link;
        const prevPartQuestionsCount = questionOffsets[number];
        const partUrl = `/test/${testId}/${pathSegments[2]}/${number}/${
          prevPartQuestionsCount + 1
        }`;

        const answers = (() => {
          if (isWritingPage) {
            return [!!userAnswers[number]?.text?.trim()?.length];
          }

          return sections.map(
            ({ questionsCount, type, groups = [] }, index) => {
              const qNumbersMap = [];
              const isCheckBoxGroup = type === "checkbox-group";

              const prevSectionQuestionsCount = sections
                .slice(0, index)
                .reduce((sum, sec) => sum + sec.questionsCount, 0);
              const initialQestionNumber =
                prevPartQuestionsCount + prevSectionQuestionsCount + 1;

              if (isCheckBoxGroup) {
                let idx = 0;
                groups.forEach(({ maxSelected }) => {
                  const start = initialQestionNumber + idx;
                  const end = initialQestionNumber + idx - 1 + maxSelected;

                  qNumbersMap.push({
                    count: maxSelected,
                    key: `${start}-${end}`,
                  });
                  idx += maxSelected;
                });
              } else {
                for (let i = 0; i < questionsCount; i++) {
                  qNumbersMap.push({ key: initialQestionNumber + i, count: 1 });
                }
              }

              const arr = qNumbersMap.map(({ key, count }) => {
                const isAnswered = (() => {
                  if (isNaN(Number(key))) {
                    const [start, end] = key?.split("-");
                    const totalAnswers = end - start + 1;
                    return userAnswers[key]?.length === totalAnswers;
                  }

                  return !!userAnswers[key]?.text;
                })();

                if (isAnswered) answeredCount += count;
                return isAnswered;
              });

              return arr.every(Boolean);
            }
          );
        })();

        const isActivePartNumLine = answers.every(Boolean);

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
                {sections.map(
                  ({ questionsCount, type, groups = [] }, index) => {
                    const qNumbersMap = [];
                    const isCheckBoxGroup = type === "checkbox-group";

                    const prevSectionQuestionsCount = sections
                      .slice(0, index)
                      .reduce((sum, sec) => sum + sec.questionsCount, 0);
                    const initialQestionNumber =
                      prevPartQuestionsCount + prevSectionQuestionsCount + 1;

                    if (isCheckBoxGroup) {
                      let idx = 0;
                      groups.forEach(({ maxSelected }) => {
                        const start = initialQestionNumber + idx;
                        const end =
                          initialQestionNumber + idx - 1 + maxSelected;

                        qNumbersMap.push(`${start}-${end}`);
                        idx += maxSelected;
                      });
                    } else {
                      for (let i = 0; i < questionsCount; i++) {
                        qNumbersMap.push(initialQestionNumber + i);
                      }
                    }

                    return qNumbersMap.map((qNum) => {
                      const isCurrentQ = questionNumber == qNum;
                      const isAnswered = (() => {
                        if (isNaN(Number(qNum))) {
                          const [start, end] = qNum?.split("-");
                          const totalAnswers = end - start + 1;
                          return userAnswers[qNum]?.length === totalAnswers;
                        }

                        return !!userAnswers[qNum]?.text;
                      })();

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
                    });
                  }
                )}
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

const NavigationButtons = ({ parts }) => {
  const navigate = useNavigate();
  const { pathSegments } = usePathSegments();
  const isWritingPage = pathSegments[2] === "writing";
  const isDeliveringPage = pathSegments[3] === "delivering";
  const { partNumber, questionNumber } = useParams();

  // Pre-calculate offsets for all parts to avoid repeated slicing
  const questionOffsets = parts.reduce((acc, part, idx) => {
    acc[part.number] = parts
      .slice(0, idx)
      .reduce((sum, p) => sum + p.totalQuestions, 0);
    return acc;
  }, {});

  const qKeys = parts.flatMap(({ number, sections }) => {
    const prevPartQuestionsCount = questionOffsets[number];
    return sections.flatMap(({ questionsCount, type, groups = [] }, index) => {
      const qNumbersMap = [];
      const isCheckBoxGroup = type === "checkbox-group";

      const prevSectionQuestionsCount = sections
        .slice(0, index)
        .reduce((sum, sec) => sum + sec.questionsCount, 0);
      const initialQestionNumber =
        prevPartQuestionsCount + prevSectionQuestionsCount + 1;

      if (isCheckBoxGroup) {
        let idx = 0;
        groups.forEach(({ maxSelected }) => {
          const start = initialQestionNumber + idx;
          const end = initialQestionNumber + idx - 1 + maxSelected;

          qNumbersMap.push({ part: number, key: `${start}-${end}` });
          idx += maxSelected;
        });
      } else {
        for (let i = 0; i < questionsCount; i++) {
          qNumbersMap.push({
            part: number,
            key: String(initialQestionNumber + i),
          });
        }
      }

      return qNumbersMap;
    });
  });

  const currentQIndex = qKeys.findIndex(({ key }) => key === questionNumber);

  const lastQ = (() => {
    if (isWritingPage) return partNumber >= parts.length;
    return qKeys[currentQIndex + 1] == undefined;
  })();

  const hasPrev = (() => {
    if (isWritingPage) return partNumber != 1;
    if (isDeliveringPage) return true;

    return qKeys[currentQIndex - 1] !== undefined;
  })();

  const handlePrev = () => {
    if (!hasPrev) return;

    if (isWritingPage && partNumber != 1) {
      if (isDeliveringPage) {
        return navigate(`/test/${pathSegments[1]}/${pathSegments[2]}/2/1`);
      }

      return navigate(
        `/test/${pathSegments[1]}/${pathSegments[2]}/${partNumber - 1}/1`
      );
    }

    if (isDeliveringPage) {
      const prevQ = qKeys[qKeys.length - 1];
      return navigate(
        `/test/${pathSegments[1]}/${pathSegments[2]}/${prevQ?.part}/${prevQ?.key}`
      );
    }

    const prevQ = qKeys[currentQIndex - 1];
    navigate(
      `/test/${pathSegments[1]}/${pathSegments[2]}/${prevQ?.part}/${prevQ?.key}`
    );
  };

  const handleNext = () => {
    if (isDeliveringPage) return;

    if (lastQ) {
      return navigate(`/test/${pathSegments[1]}/${pathSegments[2]}/delivering`);
    }

    if (isWritingPage) {
      return navigate(
        `/test/${pathSegments[1]}/${pathSegments[2]}/${
          Number(partNumber) + 1
        }/1`
      );
    }

    const nextQ = qKeys[currentQIndex + 1];

    navigate(
      `/test/${pathSegments[1]}/${pathSegments[2]}/${nextQ?.part}/${nextQ?.key}`
    );
  };

  return (
    <div className="flex gap-0.5 fixed bottom-24 right-8">
      {/* Prev */}
      <button
        disabled={!hasPrev}
        onClick={handlePrev}
        className="btn size-14 p-0 bg-black rounded-sm text-white disabled:bg-[#4c4c4c]"
      >
        <ArrowLeft strokeWidth={4.5} className="size-8" />
      </button>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={isDeliveringPage}
        className="btn size-14 p-0 bg-black rounded-sm text-white disabled:bg-[#4c4c4c]"
      >
        <ArrowRight strokeWidth={4.5} className="size-8" />
      </button>
    </div>
  );
};

export default TestLayout;
