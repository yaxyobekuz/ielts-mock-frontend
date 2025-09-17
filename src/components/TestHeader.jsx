// React
import { useEffect, useState } from "react";

// Data
import ieltsLogo from "@/assets/icons/ielts-logo.svg";

// Icons
import { Bell, Menu, Volume2, Wifi, WifiOff } from "lucide-react";

const TestHeader = ({ isDeliveringPage, isListeningPage, testId }) => {
  return (
    <header
      className={`${
        isDeliveringPage ? "" : "border-b border-gray-300"
      } flex items-center h-14`}
    >
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
              <b className="font-semibold">Test taker ID:</b>{" "}
              <span className="text-sm text-gray-500">{testId}</span>
            </p>

            {/* Audio status */}
            {isListeningPage && (
              <div className="flex items-center gap-1">
                <Volume2 size={14} />
                <span className="text-[13px] leading-normal">
                  Audio is playing
                </span>
              </div>
            )}
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

export default TestHeader;
