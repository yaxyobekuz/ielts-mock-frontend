// React
import { useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Hooks
import useStore from "@/hooks/useStore";

// Results api
import { resultsApi } from "@/api/results.api";

// Icons
import { Mic, Pen, Book, Clock, Headphones } from "lucide-react";

// Helpers
import { appendDotZero, formatDate, formatTime } from "@/lib/helpers";

const Results = () => {
  const { getData, updateProperty } = useStore("results");
  const { isLoading, hasError, data: results } = getData();

  const loadResults = () => {
    updateProperty("isLoading", true);
    updateProperty("hasError", false);

    resultsApi
      .get()
      .then(({ results, code }) => {
        if (code !== "resultsFetched") throw new Error();
        updateProperty("data", results);
      })
      .catch(() => updateProperty("hasError", true))
      .finally(() => updateProperty("isLoading", false));
  };

  // Load results
  useEffect(() => {
    isLoading && loadResults();
  }, []);

  return (
    <div className="mt-5 space-y-5">
      {/* Title */}
      <h1 className="font-medium text-[23px] leading-7">Natijalar</h1>

      {/* Main */}
      <main className="grid grid-cols-2 gap-5">
        <Content hasError={hasError} isLoading={isLoading} results={results} />
      </main>
    </div>
  );
};

const Content = ({ isLoading, hasError, results = [] }) => {
  if (isLoading) {
    return Array.from({ length: 4 }, (_, index) => (
      <div
        key={index}
        className="w-full min-h-40 bg-gray-100 rounded-4xl p-5 space-y-5 animate-pulse"
      />
    ));
  }

  if (hasError) {
    return <div className="">Error</div>;
  }

  return results.map((result) => <ResultItem key={result?._id} {...result} />);
};

const ResultItem = ({
  test,
  overall,
  _id: id,
  reading,
  writing,
  speaking,
  createdAt,
  listening,
}) => {
  return (
    <div className="flex flex-col gap-3.5 justify-between relative overflow-hidden w-full min-h-40 bg-gray-50 rounded-4xl p-5 transition-all duration-200 hover:bg-gray-100">
      {/* Title */}
      <h3 className="text-xl font-medium truncate">
        {test?.title || "Test nomi"}
      </h3>

      {/* Bottom */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-3.5">
          {/* Listening */}
          <div className="flex items-center gap-1.5">
            <Headphones strokeWidth={1.5} size={18} />
            <p className="text-gray-500">{appendDotZero(listening)}</p>
          </div>

          {/* Reading */}
          <div className="flex items-center gap-1.5">
            <Book strokeWidth={1.5} size={18} />
            <p className="text-gray-500">{appendDotZero(reading)}</p>
          </div>

          {/* Writing */}
          <div className="flex items-center gap-1.5">
            <Pen strokeWidth={1.5} size={18} />
            <p className="text-gray-500">{appendDotZero(writing)}</p>
          </div>

          {/* Speaking */}
          <div className="flex items-center gap-1.5">
            <Mic strokeWidth={1.5} size={18} />
            <p className="text-gray-500">{appendDotZero(speaking)}</p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-1.5">
          <Clock strokeWidth={1.5} size={18} />
          <p className="text-[15px]">
            <span>{formatDate(createdAt)} </span>
            <span className="text-gray-500">{formatTime(createdAt)} </span>
          </p>
        </div>
      </div>

      {/* Overall */}
      <div className="flex items-center justify-center absolute top-5 -right-9 w-36 h-9 bg-red-500 rotate-45 font-semibold text-white shadow-md">
        {appendDotZero(overall)}
      </div>

      {/* Link */}
      <Link
        to={`/profile/results/${id}`}
        className="block absolute z-0 inset-0 size-full rounded-4xl"
      />
    </div>
  );
};

export default Results;
