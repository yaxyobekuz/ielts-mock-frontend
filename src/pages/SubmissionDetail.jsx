// React
import { useEffect } from "react";

// Components
import Nav from "@/components/Nav";

// Toast
import { toast } from "@/notification/toast";

// Router
import { useParams } from "react-router-dom";

// Hooks
import useStore from "@/hooks/useStore";
import useObjectState from "@/hooks/useObjectState";

// Api
import { submissionsApi } from "@/api/submissions.api";

// Icons
import { X, Dot, Check, Clock, Trophy, Activity } from "lucide-react";

// Helpers
import { formatDate, formatTime, getIeltsScore } from "@/lib/helpers";

const SubmissionDetail = () => {
  const { submissionId } = useParams();
  const { getProperty, updateProperty } = useStore("submission");
  const submission = getProperty(submissionId);

  const { setField, isLoading, hasError } = useObjectState({
    hasError: false,
    isLoading: !submission,
  });

  const loadSubmission = () => {
    setField("hasError");
    setField("isLoading", true);

    submissionsApi
      .getById(submissionId)
      .then(({ code, submission }) => {
        if (code !== "submissionFetched") throw new Error();
        updateProperty(submissionId, submission);
      })
      .catch(({ message }) => {
        setField("hasError", true);
        toast.error(message || "Nimadir xato ketdi");
      })
      .finally(() => setField("isLoading"));
  };

  useEffect(() => {
    isLoading && loadSubmission();
  }, []);

  // Content
  if (isLoading) return <LoadingContent />;
  if (hasError) return <ErrorContent />;
  return <Main {...submission} />;
};

const Main = ({
  test,
  answers,
  _id: id,
  startedAt,
  isScored,
  finishedAt,
  correctAnswers,
}) => {
  const { module = "listening" } = useParams();
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-5">
        {/* Title */}
        <h1 className="font-medium text-[23px] leading-7">
          {test.title}
          <span className="text-gray-500"> {module} javoblari</span>
        </h1>

        <div className="flex items-center gap-5">
          {/* Total parts */}
          <div
            className="flex items-center gap-1.5"
            title={`Test holati baholan${isScored ? "" : "ma"}gan`}
          >
            <Activity strokeWidth={1.5} size={20} />
            <span className={isScored ? "text-green-600" : "text-red-500"}>
              Baholan{isScored ? "" : "ma"}gan
            </span>
          </div>

          {/* Parts count */}
          <div title="Vaqt" className="flex items-center gap-1.5">
            <Clock strokeWidth={1.5} size={20} />
            <span>{formatDate(startedAt)} </span>
            <span className="text-gray-500">
              {formatTime(startedAt)} - {formatTime(finishedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <Nav
        pagePathIndex={3}
        className="max-w-max"
        links={[
          {
            label: "Listening",
            link: `profile/submissions/${id}/listening`,
          },
          {
            label: "Reading",
            link: `profile/submissions/${id}/reading`,
          },
          {
            label: "Writing",
            link: `profile/submissions/${id}/writing`,
          },
        ]}
      />

      {/* Answers */}
      {module === "writing" ? (
        <WritingContent answers={answers} />
      ) : (
        <TableContent
          module={module}
          answers={answers}
          correctAnswers={correctAnswers}
        />
      )}
    </div>
  );
};

const TableContent = ({ module, answers = {}, correctAnswers }) => {
  const correctAnswersMap = Object.keys(correctAnswers[module] || {});

  // Count correct and wrong answers
  let trueAnswers = 0;
  let wrongAnswers = 0;

  const rows = correctAnswersMap.map((key) => {
    const correctAnswer = (() => {
      if (!correctAnswers[module]) return "-";

      if (typeof correctAnswers[module][key] === "object") {
        return correctAnswers[module][key].join(" | ").trim().toLowerCase();
      }

      return (correctAnswers[module][key] || "").trim().toLowerCase();
    })();

    const userAnswer = (() => {
      if (!answers[module]) return "-";

      if (typeof answers[module][key] === "object") {
        return answers[module][key].join(" | ").trim().toLowerCase();
      }

      return (answers[module]?.[key] || "-").trim().toLowerCase();
    })();

    const isCorrect = (() => {
      if (userAnswer === "-" && correctAnswer === "-") return false;
      return userAnswer === correctAnswer;
    })();

    isCorrect ? trueAnswers++ : wrongAnswers++;

    return {
      key,
      isCorrect,
      userAnswer,
      correctAnswer,
    };
  });

  return (
    <>
      {/* Info */}
      <div className="flex items-center justify-end gap-5 -mt-8 mb-7">
        {/* Score */}
        <div className="flex items-center gap-1.5">
          <Trophy size={20} strokeWidth={1.5} />
          <span>{getIeltsScore(trueAnswers, module)} ball</span>
        </div>

        {/* True */}
        <div className="flex items-center gap-1.5">
          <Dot strokeWidth={8} className="text-green-600" />
          <span>{trueAnswers} ta</span>
        </div>

        {/* False */}
        <div className="flex items-center gap-1.5">
          <Dot strokeWidth={8} className="text-red-500" />
          <span>{wrongAnswers} ta</span>
        </div>
      </div>

      {/* Table */}
      <table className="bg-gray-50 rounded-4xl relative">
        <thead>
          <tr>
            <th className="min-w-20 py-2.5">T/R</th>
            <th className="w-full py-2.5">Javob</th>
            <th className="w-full py-2.5">To'g'ri javob</th>
            <th className="min-w-20 py-2.5">Natija</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(({ key, userAnswer, correctAnswer, isCorrect }) => (
            <tr key={key + module}>
              <td className="min-w-20 py-1.5">{key}</td>
              <td className="w-full py-1.5">{userAnswer}</td>
              <td className="w-full py-1.5">{correctAnswer}</td>
              <td className="flex items-center justify-center min-w-20">
                {isCorrect ? (
                  <Check className="text-green-600" />
                ) : (
                  <X className="text-red-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const WritingContent = ({ answers }) => {
  const answersMap = Object.keys(answers?.writing || {});

  return (
    <ul className="space-y-5 mt-5">
      {answersMap.map((_, index) => {
        const words = answers.writing[index + 1]?.trim() || "";
        const wordsCount = words.split(" ").length;

        return (
          <li className="bg-gray-50 rounded-4xl p-2.5">
            {/* Top */}
            <div className="flex items-center justify-between py-1.5 px-2">
              <h3 className="font-semibold">Part {index + 1}</h3>
              <p>{wordsCount} ta so'z</p>
            </div>

            {/* Body */}
            <div className="bg-gray-100 px-2.5 py-3.5 rounded-4xl">
              <p className="whitespace-break-spaces">{words}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const LoadingContent = () => {
  const { module = "listening" } = useParams();

  return (
    <div className="mt-5 pb-8">
      {/* Top */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-medium text-[23px] leading-7">
          Javoblar yuklanmoqda...
        </h1>

        <div className="flex items-center gap-5 animate-pulse">
          <div className="btn w-36 h-6 bg-gray-100 py-0 rounded-full" />
          <div className="btn w-72 h-6 bg-gray-100 py-0 rounded-full" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between gap-5 animate-pulse">
        <div className="btn w-72 h-11 bg-gray-100 py-0 rounded-full" />
      </div>

      {/* Answers */}
      {module === "writing" ? (
        <div className="space-y-6 animate-pulse mt-5">
          {/* Parts */}
          <div className="btn w-full h-96 bg-gray-100 py-0 rounded-4xl" />
          <div className="btn w-full h-96 bg-gray-100 py-0 rounded-4xl" />
        </div>
      ) : (
        <div className="space-y-7 animate-pulse -mt-8">
          {/* Info */}
          <div className="flex items-center justify-end gap-5">
            <div className="btn w-20 h-6 bg-gray-100 py-0 rounded-4xl" />
            <div className="btn w-20 h-6 bg-gray-100 py-0 rounded-4xl" />
            <div className="btn w-20 h-6 bg-gray-100 py-0 rounded-4xl" />
          </div>

          {/* Table */}
          <div className="btn w-full h-96 bg-gray-100 py-0 rounded-4xl" />
        </div>
      )}
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

export default SubmissionDetail;
