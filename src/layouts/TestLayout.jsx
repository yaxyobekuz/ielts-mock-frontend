import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

// Hooks
import useModule from "../hooks/useModule";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePathSegments from "@/hooks/usePathSegments";

// Data
import ieltsLogo from "../assets/icons/ielts-logo.svg";

// Icons
import { Bell, Menu, Volume2, Wifi, WifiOff } from "lucide-react";

const TestLayout = () => {
  const { testId } = useParams();
  const { pathSegments } = usePathSegments();
  const module = pathSegments[4];

  const { getModuleData } = useModule(module, testId);
  const parts = getModuleData();

  return (
    <div className="h-screen">
      <Header testId={testId} module={module} />

      <main className="max-h-[calc(100%-112px)] h-full overflow-y-auto">
        <Outlet />
      </main>

      <Footer parts={parts} testId={testId} module={module} />
    </div>
  );
};

const Header = () => {
  return (
    <header className="flex items-center h-14 border-b border-gray-300">
      <div className="flex items-center justify-between container">
        {/* Left side */}
        <div className="flex items-center gap-8">
          <img
            width={96}
            height={28}
            src={ieltsLogo}
            alt="IELTS logo svg"
            className="w-24 h-7"
          />

          <div>
            {/* ID */}
            <p className="text-base leading-normal">
              <b className="font-semibold">Test taker ID</b>
            </p>

            {/* Audio status */}
            <div className="flex items-center gap-1">
              <Volume2 size={14} />
              <span className="text-[13px] leading-normal">
                Audio is playing
              </span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          <InternetStatus />

          {/* Notifications */}
          <div
            title="Notifications"
            aria-label="Notifications"
            className="flex items-center justify-center size-12"
          >
            <Bell size={28} strokeWidth={1.5} strokeLinecap="square" />
          </div>

          {/* Hamburger menu */}
          <button
            title="Open menu"
            aria-label="Open menu"
            className="flex items-center justify-center size-12"
          >
            <Menu size={28} strokeWidth={3} strokeLinecap="square" />
          </button>
        </div>
      </div>
    </header>
  );
};

const Footer = ({ parts = [] }) => {
  const { pathSegments } = usePathSegments();
  const { getData } = useLocalStorage("answers");
  const [answersData, setAnswersData] = useState(getData());
  const { partNumber, questionNumber, testId } = useParams();

  // Calculate cumulative question counts for URL generation
  const calculateQuestionOffset = (partIndex) => {
    return parts
      .slice(0, partIndex)
      .reduce((sum, part) => sum + part.totalQuestions, 0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnswersData(getData());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="flex h-14 border-t">
      {parts.map(({ number, totalQuestions }) => {
        const isActivePart = number === Number(partNumber);
        const Navigation = isActivePart ? "div" : Link;
        const prevQuestionsCount = calculateQuestionOffset(number - 1);
        const partUrl = `/tests/test/${testId}/module/${
          pathSegments[4]
        }/${number}/${prevQuestionsCount + 1}`;

        return (
          <Navigation
            key={number}
            to={isActivePart ? undefined : partUrl}
            className={`${
              isActivePart ? "min-w-max px-5" : "grow hover:bg-gray-100"
            } flex items-center justify-center gap-4 border-r transition-colors duration-300 last:border-r-0`}
          >
            {/* Part number display */}
            <div className="relative">
              <span className={`${isActivePart ? "font-bold" : ""} text-dark`}>
                Part {number}
              </span>

              {isActivePart && (
                <div
                  className={`absolute -top-4 w-[calc(100%+16px)] h-[3px] bg-gray-300`}
                />
              )}
            </div>

            {/* Progress indicator for inactive parts */}
            {!isActivePart && (
              <span className="text-gray-500">0 of {totalQuestions}</span>
            )}

            {/* Question navigation for active part */}
            {isActivePart && (
              <div className="flex">
                {Array.from({ length: totalQuestions }, (_, questionIndex) => {
                  const questionNum = prevQuestionsCount + questionIndex + 1;
                  const isCurrentQ = Number(questionNumber) === questionNum;

                  return (
                    <Link
                      key={questionIndex}
                      to={`/tests/test/${testId}/module/${pathSegments[4]}/${number}/${questionNum}`}
                      className={`inline-block relative px-1 border-2 rounded 
                        transition-colors duration-300 hover:border-blue-500 hover:font-bold
                        ${
                          isCurrentQ
                            ? "font-bold border-blue-500"
                            : "border-transparent"
                        }
                      `}
                    >
                      {/* Active line */}
                      <div
                        className={`${
                          answersData[questionNum]
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        } absolute w-[calc(100%+2px)] inset-x-0 -top-4 h-[3px]`}
                      />

                      {/* Question */}
                      <span>{questionNum}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </Navigation>
        );
      })}
    </footer>
  );
};

const InternetStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      window.removeEventListener("online", () => setIsOnline(true));
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, []);

  return (
    <div
      title="Internet status"
      className="flex items-center justify-center size-12"
    >
      {isOnline ? (
        <Wifi
          size={28}
          strokeWidth="3"
          className="pb-1"
          strokeLinecap="square"
        />
      ) : (
        <WifiOff
          size={28}
          strokeWidth="3"
          className="pb-1"
          strokeLinecap="square"
        />
      )}
    </div>
  );
};

export default TestLayout;
