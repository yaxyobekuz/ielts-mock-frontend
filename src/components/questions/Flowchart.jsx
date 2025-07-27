// Components
import Icon from "../Icon";

// Helpers
import { convertToHtml } from "../../lib/helpers";

// Icons
import arrowDownIcon from "../../assets/icons/arrow-down.svg";

const Flowchart = ({ texts, initialNumber, answers }) => {
  return (
    <div className="flex gap-5 w-full">
      <div className="space-y-2">
        {/* Title */}
        <b className="block text-center">{texts.title}</b>

        {/* Blocks */}
        {texts.data.map(({ text }, index) => {
          return (
            <div className="flex flex-col items-center gap-2 relative">
              <div
                className="max-w-md w-full px-2 py-1 border-2 border-gray-500"
                dangerouslySetInnerHTML={{
                  __html: convertToHtml(text, initialNumber),
                }}
              />

              {/* Arrow icon */}
              {texts.data.length !== index + 1 ? (
                <Icon src={arrowDownIcon} alt="Arrow down" />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Answers wrapper */}
      <div>
        {/* Title */}
        <b>{answers.title}</b>

        {/* Answers */}
        <ul className="max-w-max rounded-md space-y-2 p-2 bg-gray-50">
          {answers.data.map((item, index) => (
            <li
              draggable
              key={index}
              className="max-w-max bg-white px-2 rounded border border-gray-400 cursor-move"
            >
              {item.answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Flowchart;
