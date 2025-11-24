// Icons
import {
  Pen,
  Mic,
  Book,
  Clock,
  Headphones,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

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
import bandFeedback from "@/data/bandFeedback";
import criteriaFeedback from "@/data/criteriaFeedback";
import assessmentCriteria from "@/data/assessmentCriteria";

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
  return <MainContent {...result} />;
};

const MainContent = ({
  test,
  overall,
  reading,
  writing,
  speaking,
  feedback,
  createdAt,
  listening,
  writingCriteria,
  speakingCriteria,
}) => {
  return (
    <div className="mt-5 pb-12 space-y-5">
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

      <FeedbackSection
        reading={reading}
        writing={writing}
        speaking={speaking}
        listening={listening}
        teacherFeedback={feedback}
      />

      <CriteriaFeedbackSection
        writingCriteria={writingCriteria}
        speakingCriteria={speakingCriteria}
      />
    </div>
  );
};

const FeedbackSection = ({
  reading,
  writing,
  speaking,
  listening,
  teacherFeedback = {},
}) => {
  // Get the band score (round to nearest 0.5)
  const getBandScore = (score) => {
    if (!score) return 0;
    return Math.round(score * 2) / 2;
  };

  const getFeedback = (skill, score) => {
    const bandScore = getBandScore(score);
    const feedback = bandFeedback[skill]?.[bandScore];
    return feedback || null;
  };

  const skills = [
    {
      name: "listening",
      score: listening,
      icon: Headphones,
      title: "Listening",
    },
    { name: "reading", score: reading, icon: Book, title: "Reading" },
    { name: "writing", score: writing, icon: Pen, title: "Writing" },
    { name: "speaking", score: speaking, icon: Mic, title: "Speaking" },
  ];

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-medium">Your Scores Explained</h2>

      <div className="space-y-6">
        {skills.map(({ name, score, icon: Icon, title }) => {
          const feedback = getFeedback(name, score);
          if (!feedback) return null;

          return (
            <div key={name} className="bg-gray-50 rounded-4xl p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon strokeWidth={1.5} size={22} />
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <span className="text-xl font-semibold text-gray-700">
                  {appendDotZero(score)}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  {feedback.description}
                </p>

                {/* How to improve */}
                <div className="bg-white rounded-2xl p-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">
                    How to improve:
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {feedback.howToImprove}
                  </p>
                </div>

                {/* Teacher feedback */}
                {teacherFeedback[name] && (
                  <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
                    <h4 className="font-semibold text-blue-900">Teacher:</h4>
                    <p className="text-blue-700 leading-relaxed text-[15px]">
                      {teacherFeedback[name]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const CriteriaFeedbackSection = ({ writingCriteria, speakingCriteria }) => {
  const getBandScore = (score) => {
    if (!score) return 0;
    return Math.round(score * 2) / 2;
  };

  const getCriteriaFeedback = (category, criteriaKey, score) => {
    const bandScore = getBandScore(score);
    const feedback = criteriaFeedback[category]?.[criteriaKey]?.[bandScore];
    return feedback || null;
  };

  // Mapping of criteria keys to user-friendly names and feedback keys
  const criteriaMapping = {
    speaking: {
      pronunciation: { title: "Pronunciation", key: "pronunciation" },
      lexicalResource: { title: "Lexical Resource", key: "lexicalResource" },
      fluencyAndCoherence: {
        title: "Fluency and Coherence",
        key: "fluencyAndCoherence",
      },
      grammaticalRangeAndAccuracy: {
        title: "Grammatical Range and Accuracy",
        key: "grammaticalRangeAndAccuracy",
      },
    },
    writing: {
      taskAchievement: { title: "Task Achievement", key: "taskAchievement" },
      taskResponse: { title: "Task Response", key: "taskResponse" },
      coherenceAndCohesion: {
        title: "Coherence and Cohesion",
        key: "coherenceAndCohesion",
      },
      lexicalResource: { title: "Lexical Resource", key: "lexicalResource" },
      grammaticalRangeAndAccuracy: {
        title: "Grammatical Range and Accuracy",
        key: "grammaticalRangeAndAccuracy",
      },
    },
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-medium">Detailed Feedback</h2>

      {/* Speaking Criteria */}
      {speakingCriteria && Object.keys(speakingCriteria).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mic strokeWidth={1.5} size={22} />
            <h3 className="text-lg font-semibold">Speaking</h3>
          </div>

          <div className="grid gap-4">
            {Object.entries(speakingCriteria).map(([key, score]) => {
              const mapping = criteriaMapping.speaking[key];
              if (!mapping) return null;

              const feedback = getCriteriaFeedback(
                "speaking",
                mapping.key,
                score
              );
              if (!feedback) return null;

              return (
                <div key={key} className="bg-gray-50 rounded-4xl p-5 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">
                      {mapping.title}
                    </h4>
                    <span className="text-lg font-semibold text-gray-700">
                      {appendDotZero(score)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {feedback.description}
                  </p>

                  {/* Strengths */}
                  {feedback.strengths && feedback.strengths.length > 0 && (
                    <div className="bg-green-50 rounded-2xl p-3 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2
                          size={16}
                          className="text-green-600"
                          strokeWidth={2}
                        />
                        <span className="text-sm font-semibold text-green-900">
                          Strengths:
                        </span>
                      </div>
                      <ul className="space-y-1 ml-5">
                        {feedback.strengths.map((strength, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-green-800 list-disc"
                          >
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Areas for Improvement */}
                  {feedback.improvements &&
                    feedback.improvements.length > 0 && (
                      <div className="bg-blue-50 rounded-2xl p-3 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle
                            size={16}
                            className="text-blue-600"
                            strokeWidth={2}
                          />
                          <span className="text-sm font-semibold text-blue-900">
                            How to improve:
                          </span>
                        </div>
                        <ul className="space-y-1 ml-5">
                          {feedback.improvements.map((improvement, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-blue-800 list-disc"
                            >
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Writing Criteria */}
      {writingCriteria && Object.keys(writingCriteria).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pen strokeWidth={1.5} size={22} />
            <h3 className="text-lg font-semibold">Writing</h3>
          </div>

          <div className="space-y-5">
            {Object.entries(writingCriteria).map(([task, taskCriteria]) => {
              const taskNumber = extractNumbers(task);

              return (
                <div key={task} className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    Task {taskNumber}
                  </h4>

                  <div className="grid gap-4">
                    {Object.entries(taskCriteria).map(([key, score]) => {
                      const mapping = criteriaMapping.writing[key];
                      if (!mapping) return null;

                      const feedback = getCriteriaFeedback(
                        "writing",
                        mapping.key,
                        score
                      );
                      if (!feedback) return null;

                      return (
                        <div
                          key={key}
                          className="bg-gray-50 rounded-4xl p-5 space-y-3"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-gray-900">
                              {mapping.title}
                            </h5>
                            <span className="text-lg font-semibold text-gray-700">
                              {appendDotZero(score)}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {feedback.description}
                          </p>

                          {/* Strengths */}
                          {feedback.strengths &&
                            feedback.strengths.length > 0 && (
                              <div className="bg-green-50 rounded-2xl p-3 space-y-2">
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2
                                    size={16}
                                    className="text-green-600"
                                    strokeWidth={2}
                                  />
                                  <span className="text-sm font-semibold text-green-900">
                                    Strengths:
                                  </span>
                                </div>
                                <ul className="space-y-1 ml-5">
                                  {feedback.strengths.map((strength, idx) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-green-800 list-disc"
                                    >
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {/* Areas for Improvement */}
                          {feedback.improvements &&
                            feedback.improvements.length > 0 && (
                              <div className="bg-blue-50 rounded-2xl p-3 space-y-2">
                                <div className="flex items-center gap-1.5">
                                  <AlertCircle
                                    size={16}
                                    className="text-blue-600"
                                    strokeWidth={2}
                                  />
                                  <span className="text-sm font-semibold text-blue-900">
                                    How to improve:
                                  </span>
                                </div>
                                <ul className="space-y-1 ml-5">
                                  {feedback.improvements.map(
                                    (improvement, idx) => (
                                      <li
                                        key={idx}
                                        className="text-sm text-blue-800 list-disc"
                                      >
                                        {improvement}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
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
