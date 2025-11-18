// React
import { useState } from "react";

// Lottie
import Lottie from "lottie-react";

// Toast
import { toast } from "@/notification/toast";

// Api
import { submissionApi } from "@/api/submission";

// Router
import { Link, useNavigate } from "react-router-dom";

// Componetns
import ErrorContent from "@/components/ErrorContent";

// Hooks
import useStore from "@/hooks/useStore";
import useModule from "@/hooks/useModule";
import useObjectState from "@/hooks/useObjectState";
import usePreventUnload from "@/hooks/usePreventUnload";

// Animated stickers
import likeOutSticker from "@/assets/animated/like-out.json";
import channelsOutSticker from "@/assets/animated/channels-out.json";

const Submission = () => {
  const { getData, resetData } = useStore("modules");
  const answers = getData();
  const [allDone] = useState(
    answers.listening && answers.reading && answers.writing
  );

  if (!allDone) {
    return (
      <ErrorContent
        link={{ url: "/", name: "Bosh sahifa" }}
        error={{ code: true, message: "Siz hali test yechmadingiz" }}
      />
    );
  }

  return <Main answers={answers} resetAnswers={resetData} />;
};

const transformAnswers = (data) => {
  const result = {};

  Object.keys(data).forEach((section) => {
    result[section] = {};
    const answers = data[section].answers;

    Object.keys(answers).forEach((key) => {
      const text = answers[key].text;
      result[section][key] = typeof text === "string" ? text : answers[key];
    });
  });

  return result;
};

const Main = ({ answers, resetAnswers }) => {
  usePreventUnload();
  const navigate = useNavigate();
  const { resetAllModule } = useModule();
  const { getProperty, updateProperty } = useStore("start");
  const linkId = getProperty("linkId");
  const startDate = getProperty("date");

  const { setField, isSent, isLoading } = useObjectState({
    isSent: false,
    isLoading: false,
  });

  const hanldeSubmit = () => {
    if (isLoading) return;
    setField("isLoading", true);

    submissionApi
      .create({
        linkId,
        startedAt: startDate,
        answers: transformAnswers(answers),
      })
      .then(({ code }) => {
        if (code !== "submissionCreated") throw new Error();

        resetAnswers();
        setField("isSent", true);
        updateProperty("isStarted", false);
      })
      .catch(({ message }) => toast.error(message || "Nimadir xato ketdi"))
      .finally(() => setField("isLoading"));
  };

  const hanldeCancel = () => {
    const isConfirm = confirm(
      "Ishonchingiz komilmi? Testni bekor qilmoqchimisiz?"
    );

    if (isConfirm) {
      navigate("/"); // Navigate to home
      resetAnswers(); // Clear test answers
      resetAllModule(); // Clear test modules data
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full h-screen">
      <Lottie
        width="160"
        height="160"
        className="size-40"
        animationData={isSent ? likeOutSticker : channelsOutSticker}
      />

      <div className="max-w-sm space-y-3 text-center">
        <h1 className="text-2xl font-semibold">
          {isSent ? "Test yuborildi" : "Test yuborish uchun tayyor"}
        </h1>

        <p className="text-gray-500">
          {isSent
            ? "Testingiz yuborildi va siz keyingi bosqichga muvaffaqiyatli o'tdingiz, Tabriklation!"
            : "Quyidagi tugmani ezish orqali test javoblaringiz ustozga yuboriladi va siz keyingi bosqichga o'tasiz."}
        </p>
      </div>

      {isSent && (
        <div className="flex gap-5">
          <Link
            to="/"
            className="w-36 bg-blue-500 px-5 py-2 rounded-xl text-center text-white transition-colors duration-200 hover:bg-blue-400"
          >
            Bosh sahifa
          </Link>

          <a className="w-36 bg-violet-500 px-5 py-2 rounded-xl text-center text-white transition-colors duration-200 hover:bg-blue-400">
            Yangiliklar
          </a>
        </div>
      )}

      {!isSent && (
        <div className="flex gap-5">
          <button
            disabled={isLoading}
            onClick={hanldeSubmit}
            className="w-36 bg-blue-500 px-5 py-2 rounded-xl text-center text-white transition-colors duration-200 hover:bg-blue-400 disabled:hover:bg-blue-500 disabled:opacity-50"
          >
            Yuborish{isLoading && "..."}
          </button>

          <button
            disabled={isLoading}
            onClick={hanldeCancel}
            className="w-36 bg-gray-100 px-5 py-2 rounded-xl text-center transition-colors duration-200 hover:bg-gray-200 disabled:hover:bg-gray-100 disabled:opacity-50"
          >
            Bekor qilish
          </button>
        </div>
      )}
    </div>
  );
};

export default Submission;
