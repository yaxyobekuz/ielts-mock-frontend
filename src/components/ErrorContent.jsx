// Lottie
import Lottie from "lottie-react";

// Router
import { Link } from "react-router-dom";

// Animated stickers
import duckSadOutSticker from "@/assets/animated/duck-sad-out.json";

const ErrorContent = ({ error = {}, link }) => (
  <div className="flex flex-col items-center justify-center gap-8 w-full h-screen">
    <Lottie
      width="160"
      height="160"
      className="size-40"
      animationData={duckSadOutSticker}
    />

    <div className="max-w-sm space-y-3 text-center">
      <h1 className="max-w-sm text-center text-2xl font-semibold">
        {error.code && error.message ? error.message : "Nimadir xato ketdi"}
      </h1>

      {error.details && <p className="text-gray-500">{error.details}</p>}
    </div>

    {link && (
      <Link
        to={link.url}
        className="px-5 py-2 rounded-xl bg-blue-500 text-white transition-colors duration-200 hover:bg-blue-400"
      >
        {link.name}
      </Link>
    )}
  </div>
);

export default ErrorContent;
