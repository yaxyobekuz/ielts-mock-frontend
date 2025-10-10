// React
import { useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Hooks
import useStore from "@/hooks/useStore";

// Icons
import { Activity, Clock } from "lucide-react";

// Submissions api
import { submissionsApi } from "@/api/submissions.api";

// Helpers
import { formatDate, formatTime } from "@/lib/helpers";

const Submissions = () => {
  const { getData, updateProperty } = useStore("submissions");
  const { isLoading, hasError, data: submissions } = getData();

  const loadSubmissions = () => {
    updateProperty("isLoading", true);
    updateProperty("hasError", false);

    submissionsApi
      .get()
      .then(({ submissions, code }) => {
        if (code !== "submissionsFetched") throw new Error();
        updateProperty("data", submissions);
      })
      .catch(() => updateProperty("hasError", true))
      .finally(() => updateProperty("isLoading", false));
  };

  // Load submission
  useEffect(() => {
    isLoading && loadSubmissions();
  }, []);

  return (
    <div className="mt-5 space-y-5">
      {/* Title */}
      <h1 className="font-medium text-[23px] leading-7">Javoblar</h1>

      {/* Main */}
      <main className="grid grid-cols-2 gap-5">
        <Content
          hasError={hasError}
          isLoading={isLoading}
          submissions={submissions}
        />
      </main>
    </div>
  );
};

const Content = ({ isLoading, hasError, submissions = [] }) => {
  if (isLoading) {
    return Array.from({ length: 8 }, (_, index) => (
      <div
        key={index}
        className="w-full min-h-40 bg-gray-100 rounded-4xl p-5 space-y-5 animate-pulse"
      />
    ));
  }

  if (hasError) {
    return <div className="">Error</div>;
  }

  return submissions.map((submission) => (
    <SubmissionItem key={submission?._id} {...submission} />
  ));
};

const SubmissionItem = ({ test, _id: id, isScored, startedAt, finishedAt }) => {
  return (
    <div className="flex flex-col gap-3.5 justify-between relative w-full min-h-40 bg-gray-50 rounded-4xl p-5 transition-all duration-200 hover:bg-gray-100">
      {/* Title */}
      <h3 className="text-xl font-medium line-clamp-1">
        {test?.title || "Test nomi"}
      </h3>

      {/* Bottom */}
      <div className="space-y-1.5">
        {/* Status */}
        <div className="flex items-center gap-1.5">
          <Activity strokeWidth={1.5} size={18} />
          <p className="text-[15px]">
            <span>Holat: </span>
            <span className={isScored ? "text-green-600" : "text-red-500"}>
              Baholan{isScored ? "" : "ma"}gan
            </span>
          </p>
        </div>

        {/* Time */}
        <div className="flex items-center gap-1.5">
          <Clock strokeWidth={1.5} size={18} />
          <p className="text-[15px]">
            <span>{formatDate(startedAt)} </span>
            <span className="text-gray-500">
              {formatTime(startedAt)} - {formatTime(finishedAt)}
            </span>
          </p>
        </div>
      </div>

      {/* Link */}
      <Link
        to={`/profile/submissions/${id}`}
        className="block absolute z-0 inset-0 size-full rounded-3xl"
      />
    </div>
  );
};

export default Submissions;
