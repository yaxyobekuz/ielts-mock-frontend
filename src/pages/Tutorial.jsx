import useStore from "@/hooks/useStore";
import TestHeader from "@/components/TestHeader";
import { Link, useParams } from "react-router-dom";
import usePreventUnload from "@/hooks/usePreventUnload";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

const moduleNames = [
  {
    name: "Listening",
    tutorial: "https://www.youtube.com/embed/ByW0KdKH5oE?si=C3baIUBjtUhQTkE5",
  },
  {
    name: "Reading",
    tutorial: "https://www.youtube.com/embed/ByW0KdKH5oE?si=C3baIUBjtUhQTkE5",
  },
  {
    name: "Writing",
    tutorial: "https://www.youtube.com/embed/ByW0KdKH5oE?si=C3baIUBjtUhQTkE5",
  },
];

const Tutorial = () => {
  usePreventUnload();
  const { testId } = useParams();
  const { getData } = useStore("modules");
  const modules = getData();
  const allDone =
    modules.listening?.isDone &&
    modules.reading?.isDone &&
    modules.writing?.isDone;

  const getCurrent = (m) => {
    let isCurrent = false;
    const module = m.toLowerCase();
    const isDone = modules[module]?.isDone;
    const readingCompleted = modules.reading?.isDone;
    const listeningCompleted = modules.listening?.isDone;

    if (module === "listening" && !isDone) {
      isCurrent = true;
    } else if (module === "reading" && !isDone && listeningCompleted) {
      isCurrent = true;
    } else if (module === "writing" && !isDone && readingCompleted) {
      isCurrent = true;
    }

    return { isDone, isCurrent };
  };

  return (
    <>
      <TestHeader />

      <div className="container !max-w-4xl pt-8 pb-24 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#e31837]">
          IELTS on Computer Test Tutorial
        </h1>

        {/* Subtitle */}
        <div className="flex items-center gap-3.5">
          <b className="text-2xl font-bold">Today</b>
          <div className="w-full h-0.5 bg-gray-300 rounded-full" />
        </div>

        {/* Modules */}
        <ul className="space-y-6">
          {moduleNames.map(({ name, tutorial }) => {
            const { isDone, isCurrent, nextModule } = getCurrent(name);

            return (
              <li
                key={name}
                className="space-y-3.5 p-8 border border-gray-300 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-3.5">
                    {/* Title */}
                    <h2 className="text-2xl font-bold">
                      IELTS on Computer {name}
                    </h2>

                    {/* Status */}
                    <strong
                      className={`inline-block ${
                        isDone ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isDone ? "Completed" : "Not completed"}
                    </strong>

                    {/* Timing */}
                    <p>Timing: 1 hour</p>
                  </div>

                  {/* Done button */}
                  {isDone && (
                    <Check
                      size={40}
                      color="green"
                      strokeWidth={6}
                      strokeLinecap="square"
                      className="size-10 mr-5"
                    />
                  )}
                </div>

                {isCurrent && (
                  <>
                    {/* Tutorial video */}
                    <details className="rounded-md border border-gray-300">
                      <summary className="flex items-center gap-3.5 p-5 cursor-pointer">
                        <ChevronDown size={28} strokeWidth={3} />
                        Test information
                      </summary>

                      {/* Content */}
                      <div className="p-5 pt-0">
                        <iframe
                          height="396"
                          width="748.8"
                          src={tutorial}
                          allowFullScreen
                          className="w-full bg-gray-100 rounded-sm"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </div>
                    </details>

                    {/* Link */}
                    <Link
                      to={`/test/${testId}/${name.toLowerCase()}/1/1`}
                      className="flex items-center justify-center gap-3.5 w-max bg-black py-2 pl-4 pr-6 text-white rounded-md transition-opacity duration-200 hover:opacity-70"
                    >
                      <ArrowRight strokeWidth={3} size={20} />
                      <span>Start IELTS on Computer {name}</span>
                    </Link>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        {allDone && (
          <Link
            to="/submission"
            className="flex items-center justify-center gap-3.5 w-max bg-black py-2 px-6 text-white rounded-md mx-auto transition-opacity duration-200 hover:opacity-70"
          >
            <span>Go to Submission</span>
            <ArrowRight strokeWidth={3} size={20} />
          </Link>
        )}
      </div>
    </>
  );
};

export default Tutorial;
