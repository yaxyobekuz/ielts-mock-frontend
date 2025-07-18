// Components
import Icon from "./Icon";

// Icons
import logoIcon from "../assets/icons/logo.svg";
import speakerIcon from "../assets/icons/speaker.svg";
import barsIcon from "../assets/icons/bars.svg";

const PartHeader = () => {
  return (
    <header className="flex items-center justify-between h-14 px-5 border-b">
      {/* Logo wrapper */}
      <div className="flex items-center gap-7">
        <img
          height={28}
          width={95.26}
          src={logoIcon}
          alt="IELTS logo icon svg"
          className="w-[95.26px] h-7"
        />

        <div className="space-y-0.5">
          <b>Test taker ID</b>
          <div className="flex items-center gap-1.5">
            <img
              height={14}
              width={14}
              src={speakerIcon}
              alt="Speaker wave"
              className="size-3.5"
            />
            <span className="text-[13px] leading-none">Audio is playing</span>
          </div>
        </div>
      </div>

      {/* Actions wrapper */}
      <div className="flex h-full">
        {/* Menu button */}
        <button className="flex items-center justify-center w-14 h-full transition-colors duration-300 hover:bg-gray-100">
          <Icon src={barsIcon}/>
        </button>
      </div>
    </header>
  );
};

export default PartHeader;
