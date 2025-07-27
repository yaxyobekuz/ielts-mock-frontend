import { convertToHtml } from "../../lib/helpers";

const TextDraggable = ({ text, initialNumber, answerChoices }) => {
  return (
    <div className="flex gap-5 w-full">
      {/* Questions */}
      <pre
        dangerouslySetInnerHTML={{ __html: convertToHtml(text, initialNumber) }}
        className="flex-1 font-[inherit] overflow-auto prose prose-sm max-w-max"
      />

      {/* Answer choices wrapper */}
      <div>
        {/* Title */}
        <b>{answerChoices.title}</b>

        {/* Answer options */}
        <ul className="max-w-max rounded-md space-y-2 p-2 bg-gray-50">
          {answerChoices.options.map((item, index) => (
            <li
              draggable
              key={index}
              className="max-w-max bg-white px-2 rounded border border-gray-400 cursor-move"
            >
              {item.option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextDraggable;
