import { useEffect, useState } from "react";

// Random id generator
import { v4 as uuidv4 } from "uuid";

// Hooks
import useStore from "@/hooks/useStore";

// Helpers
import { countExactMatches } from "@/lib/helpers";

// Components
import Icon from "../Icon";
import RichTextPreviewer from "../RichTextPreviewer";

// Icons
import arrowDownIcon from "@/assets/icons/arrow-down.svg";

const target = '<input type="text" data-name="answer-input">';

const InputFlowchart = ({ items, rawKey, initialNumber }) => {
  const [id] = useState(uuidv4());

  return (
    <div className="max-w-max space-y-2">
      {/* Title */}
      <b className="block text-center">{items.title}</b>

      {/* Blocks */}
      <div className="space-y-2">
        {items.data.map(({ text }, index) => {
          const prevContents = items.data
            .slice(0, index)
            .map((item) => item.text)
            .join("");

          const itemInitialNumber =
            countExactMatches(prevContents, target) + initialNumber;

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <RichTextPreviewer
                id={id}
                text={text}
                allowInput
                rawKey={rawKey + index}
                initialNumber={itemInitialNumber}
                className="w-full p-2 text-editor border-2 border-[#333]"
              />

              {/* Arrow icon */}
              {items.data.length !== index + 1 ? (
                <Icon src={arrowDownIcon} alt="Arrow down" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputFlowchart;
