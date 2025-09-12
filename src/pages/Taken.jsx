// Lottie
import Lottie from "lottie-react";

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

const Taken = () => {
  const { getData, resetData } = useStore("modules");
  const answers = getData();
  const allDone = answers.listening && answers.reading && answers.writing;

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

const Main = ({ answers, resetAnswers }) => {
  usePreventUnload();
  const navigate = useNavigate();
  const { resetAllModule } = useModule();
  const { getData } = useStore("userInfo");
  const userInfo = getData();

  const { setField, isSent, isLoading } = useObjectState({
    isSent: false,
    isLoading: false,
  });

  const hanldeSubmit = () => {
    if (isLoading) return;
    setField("isLoading", true);
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

export default Taken;
