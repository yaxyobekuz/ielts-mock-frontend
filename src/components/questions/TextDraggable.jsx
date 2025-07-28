import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";

// Helpers
import { convertToHtml } from "../../lib/helpers";

// Hooks
import useLocalStorage from "../../hooks/useLocalStorage";

const TextDraggable = ({ text, initialNumber, answerChoices }) => {
  const { partNumber } = useParams();
  const dropzonesWrapperRef = useRef();
  const [uniqueId] = useState(String(new Date()));
  const [usedAnswers, setUsedAnswers] = useState({});
  const { getData, updateProperty } = useLocalStorage("answers");

  const handleDrop = useCallback(
    (e, zone) => {
      e.preventDefault();
      const jsonData = e.dataTransfer.getData("application/json");
      const { id, content } = JSON.parse(jsonData) || {};
      const key = zone.getAttribute("data-number");

      const isUsed = Object.keys(usedAnswers).find((key) => {
        return usedAnswers[key] === content;
      });

      if (uniqueId !== id || isUsed) return;

      zone.textContent = content;
      updateProperty(key, content);
      setUsedAnswers((prev) => ({ ...prev, [key]: content }));
    },
    [uniqueId, usedAnswers, updateProperty]
  );

  const handleDragStart = (e, content) => {
    const data = { id: uniqueId, content };
    e.dataTransfer.setData("application/json", JSON.stringify(data));
  };

  useEffect(() => {
    const dropzones =
      dropzonesWrapperRef.current.querySelectorAll(".answer-dropzone");

    const onDrop = (e) => {
      const zone = e.currentTarget;
      zone.draggable = true;
      zone.classList.add("filled");
      zone.classList.remove("drag-over");

      handleDrop(e, zone);
    };

    const onDragOver = (e) => {
      e.preventDefault();
      e.target.classList.add("drag-over");
    };

    const onDragLeave = (e) => {
      e.preventDefault();
      e.target.classList.remove("drag-over");
    };

    dropzones.forEach((zone) => {
      zone.addEventListener("drop", onDrop);
      zone.addEventListener("dragover", onDragOver);
      zone.addEventListener("dragleave", onDragLeave);
    });

    return () => {
      dropzones.forEach((zone) => {
        zone.removeEventListener("drop", onDrop);
        zone.removeEventListener("dragover", onDragOver);
        zone.removeEventListener("dragleave", onDragLeave);
      });
    };
  }, [handleDrop]);

  useEffect(() => {
    const data = getData();
    let usedAnswersFromLocal = {};
    const dropzones =
      dropzonesWrapperRef.current.querySelectorAll(".answer-dropzone");

    dropzones.forEach((zone) => {
      const key = zone.getAttribute("data-number");
      const content = data[key];

      if (!content) return;

      zone.draggable = true;
      zone.textContent = content;
      zone.classList.add("filled");
      usedAnswersFromLocal[key] = content;
    });

    setUsedAnswers(usedAnswersFromLocal);
  }, [partNumber]);

  return (
    <div className="flex gap-5 w-full">
      {/* Savol matni (html ga aylantirilgan) */}
      <pre
        ref={dropzonesWrapperRef}
        className="flex-1 overflow-auto max-w-max"
        dangerouslySetInnerHTML={{ __html: convertToHtml(text, initialNumber) }}
      />

      {/* Javoblar ro‘yxati */}
      <div>
        <b>{answerChoices.title}</b>

        {/* Answer options */}
        <ul className="max-w-max rounded-md space-y-2 p-2 bg-gray-50">
          {answerChoices.options.map((item, index) => {
            const isUsed = Object.keys(usedAnswers).find((key) => {
              return usedAnswers[key] === item.option;
            });

            return (
              <li
                key={index}
                draggable={!isUsed}
                onDragStart={(e) => handleDragStart(e, item.option)}
                className={`bg-white cursor-move px-2 rounded border border-gray-400 ${
                  isUsed ? "not-visible" : "visible"
                }`}
              >
                {item.option}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TextDraggable;
