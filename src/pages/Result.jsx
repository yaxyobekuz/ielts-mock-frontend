// Helpers
import {
  formatDate,
  formatTime,
  appendDotZero,
  extractNumbers,
} from "@/lib/helpers";

// React
import { useEffect } from "react";

// Router
import { useParams } from "react-router-dom";

// Toast
import { toast } from "@/notification/toast";

// Api
import { resultsApi } from "@/api/results.api";

// Hooks
import useStore from "@/hooks/useStore";
import useObjectState from "@/hooks/useObjectState";

// Data
import assessmentCriteria from "@/data/assessmentCriteria";

// Icons
import { Pen, Mic, Book, Clock, Headphones } from "lucide-react";

let uniquecriteriaNames = {};
assessmentCriteria.forEach(({ criteria }) => {
  criteria.forEach((arr) => {
    arr.forEach(({ name, key }) => {
      uniquecriteriaNames[key] = name;
    });
  });
});

const Result = () => {
  const { resultId } = useParams();
  const { getProperty, updateProperty } = useStore("result");
  const result = getProperty(resultId);

  const { setField, isLoading, hasError } = useObjectState({
    hasError: false,
    isLoading: !result,
  });

  const loadResult = () => {
    setField("hasError");
    setField("isLoading", true);

    resultsApi
      .getById(resultId)
      .then(({ code, result }) => {
        if (code !== "resultFetched") throw new Error();
        updateProperty(resultId, result);
      })
      .catch(({ message }) => {
        setField("hasError", true);
        toast.error(message || "Nimadir xato ketdi");
      })
      .finally(() => setField("isLoading"));
  };

  useEffect(() => {
    isLoading && loadResult();
  }, []);

  // Content
  if (isLoading) return <LoadingContent />;
  if (hasError) return <ErrorContent />;
  return <Main {...result} />;
};

const Main = ({
  test,
  overall,
  reading,
  writing,
  speaking,
  createdAt,
  listening,
  writingCriteria,
  speakingCriteria,
}) => {
  return (
    <div className="mt-5 space-y-5">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="font-medium text-[23px] leading-7">
          {test?.title || "Test nomi"}
          <span className="text-gray-500">ning natijasi</span>
        </h1>

        {/* Date & time */}
        <div title="Vaqt" className="flex items-center gap-1.5">
          <Clock strokeWidth={1.5} size={22} />
          <span>{formatDate(createdAt)} </span>
          <span className="text-gray-500">{formatTime(createdAt)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Overall */}
        <section className="flex items-center justify-center relative overflow-hidden w-full h-56 bg-red-500 bg-cover bg-no-repeat rounded-4xl p-5 text-3xl font-medium text-white">
          <h2>Umumiy {appendDotZero(overall)}</h2>
        </section>

        {/* Score */}
        <section className="relative overflow-hidden w-full h-56 bg-gray-50 bg-cover bg-no-repeat rounded-4xl p-5">
          {/* Title */}
          <h2 className="mb-5 text-xl font-medium">Ballar</h2>

          <div className="space-y-3.5">
            {/* Listening */}
            <div className="flex items-center gap-1.5">
              <Headphones strokeWidth={1.5} className="shrink-0" size={20} />
              <div className="flex items-center justify-between w-full">
                <span>Listening </span>
                <span className="text-gray-600">
                  {appendDotZero(listening)}
                </span>
              </div>
            </div>

            {/* Reading */}
            <div className="flex items-center gap-1.5">
              <Book strokeWidth={1.5} className="shrink-0" size={20} />
              <div className="flex items-center justify-between w-full">
                <span>Reading </span>
                <span className="text-gray-600">{appendDotZero(reading)}</span>
              </div>
            </div>

            {/* Writing */}
            <div className="flex items-center gap-1.5">
              <Pen strokeWidth={1.5} className="shrink-0" size={20} />
              <div className="flex items-center justify-between w-full">
                <span>Writing </span>
                <span className="text-gray-600">{appendDotZero(writing)}</span>
              </div>
            </div>

            {/* Speaking */}
            <div className="flex items-center gap-1.5">
              <Mic strokeWidth={1.5} className="shrink-0" size={20} />
              <div className="flex items-center justify-between w-full">
                <span>Speaking </span>
                <span className="text-gray-600">{appendDotZero(speaking)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Speaking criteria */}
        <section className="relative overflow-hidden w-full h-56 bg-gray-50 bg-cover bg-no-repeat rounded-4xl p-5">
          {/* Title */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-medium">Speaking</h2>
            <p className="text-lg">{appendDotZero(speaking)}</p>
          </div>

          <div className="space-y-1.5">
            {Object.keys(speakingCriteria || {}).map((key) => {
              return (
                <div
                  key={key}
                  className="flex items-center justify-between w-full"
                >
                  <span>{uniquecriteriaNames[key]}</span>
                  <span className="text-gray-600">
                    {appendDotZero(speakingCriteria[key])}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Writing criteria */}
        <section className="relative overflow-hidden w-full h-56 bg-gray-50 bg-cover bg-no-repeat rounded-4xl p-5">
          {/* Title */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-medium">Writing</h2>
            <p className="text-lg">{appendDotZero(writing)}</p>
          </div>

          <div className="space-y-5 max-h-[calc(100%-48px)] pr-1.5 overflow-y-auto scroll-y-primary">
            {Object.keys(writingCriteria || {}).map((task) => {
              const taskCriteria = writingCriteria[task];
              return (
                <div key={task} className="space-y-1.5">
                  <h3 className="font-semibold">Task {extractNumbers(task)}</h3>

                  {Object.keys(taskCriteria || {}).map((key) => {
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between w-full"
                      >
                        <span>{uniquecriteriaNames[key]}</span>
                        <span className="text-gray-600">
                          {appendDotZero(taskCriteria[key])}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

const LoadingContent = () => {
  return (
    <div className="mt-5 space-y-5">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-[23px] leading-7">
          Natija yuklanmoqda...
        </h1>

        <div className="btn w-52 h-6 bg-gray-100 py-0 rounded-full animate-pulse" />
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-2 gap-5 animate-pulse">
        {Array.from({ length: 4 }, (_, index) => (
          <li key={index} className="h-56 bg-gray-100 rounded-4xl" />
        ))}
      </ul>
    </div>
  );
};

const ErrorContent = () => {
  return (
    <div className="container py-8 space-y-6">
      <div>Error</div>
    </div>
  );
};

export default Result;
