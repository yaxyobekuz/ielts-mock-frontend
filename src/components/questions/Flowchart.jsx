import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";

// Components
import Icon from "../Icon";

// UUID
import { v4 as uuidv4 } from "uuid";

// Helpers
import { convertToHtml } from "../../lib/helpers";

// Hooks
import useLocalStorage from "../../hooks/useLocalStorage";

// Icons
import arrowDownIcon from "../../assets/icons/arrow-down.svg";

const Flowchart = ({ flowchartItems, initialNumber, answerChoices }) => {
  const { partNumber } = useParams();
  const dropzonesWrapperRef = useRef();
  const [uniqueId] = useState(uuidv4());
  const [usedAnswers, setUsedAnswers] = useState({});
  const { getData, updateProperty } = useLocalStorage("answers");

  const handleDrop = useCallback(
    (e, zone) => {
      e.preventDefault();
      const jsonData = e.dataTransfer.getData("application/json");
      const { id, content, sourceZone } = JSON.parse(jsonData) || {};
      const targetKey = zone.getAttribute("data-number");

      if (uniqueId !== id) return;

      // Check if target zone already has content
      const existingContent = zone.textContent.trim();
      const targetHasContent =
        existingContent && zone.classList.contains("filled");

      // If moving from another dropzone, clear the source
      if (sourceZone) {
        const sourceZoneElement = dropzonesWrapperRef.current.querySelector(
          `[data-number="${sourceZone}"]`
        );

        if (sourceZoneElement) {
          updateProperty(sourceZone, "");
          sourceZoneElement.draggable = false;
          sourceZoneElement.textContent = sourceZone;
          sourceZoneElement.classList.remove("filled");
        }
      }

      // If target zone has content and we're moving from another zone, swap them
      if (targetHasContent && sourceZone) {
        const sourceZoneElement = dropzonesWrapperRef.current.querySelector(
          `[data-number="${sourceZone}"]`
        );
        if (sourceZoneElement) {
          sourceZoneElement.textContent = existingContent;
          sourceZoneElement.classList.add("filled");
          sourceZoneElement.draggable = true;
          updateProperty(sourceZone, existingContent);
        }
      }

      // Place the dragged content in target zone
      zone.draggable = true;
      zone.textContent = content;
      zone.classList.add("filled");
      updateProperty(targetKey, content);

      // Update usedAnswers state
      setUsedAnswers((prev) => {
        const newUsedAnswers = { ...prev };

        // Remove from source if moving between zones
        if (sourceZone) {
          if (targetHasContent) {
            // Swap case
            newUsedAnswers[sourceZone] = existingContent;
          } else {
            // Simple move case
            delete newUsedAnswers[sourceZone];
          }
        }

        // Add to target
        newUsedAnswers[targetKey] = content;

        return newUsedAnswers;
      });
    },
    [uniqueId, updateProperty]
  );

  const handleDragStart = (e, content, sourceZone = null) => {
    const data = { id: uniqueId, content, sourceZone };
    e.dataTransfer.setData("application/json", JSON.stringify(data));
  };

  const handleZoneDragStart = (e) => {
    const zone = e.currentTarget;
    const content = zone.textContent;
    const sourceZone = zone.getAttribute("data-number");
    handleDragStart(e, content, sourceZone);
  };

  useEffect(() => {
    const dropzones =
      dropzonesWrapperRef.current.querySelectorAll(".answer-dropzone");

    const onDrop = (e) => {
      const zone = e.currentTarget;
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
      zone.addEventListener("dragstart", handleZoneDragStart);
    });

    return () => {
      dropzones.forEach((zone) => {
        zone.removeEventListener("drop", onDrop);
        zone.removeEventListener("dragover", onDragOver);
        zone.removeEventListener("dragleave", onDragLeave);
        zone.removeEventListener("dragstart", handleZoneDragStart);
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

  // Handle dropping back to answer zone
  const handleAnswerZoneDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove("drag-over-answer-zone");
      const jsonData = e.dataTransfer.getData("application/json");
      const { id, content, sourceZone } = JSON.parse(jsonData) || {};

      if (uniqueId !== id || !sourceZone) return;

      // Clear the source dropzone
      const sourceZoneElement = dropzonesWrapperRef.current.querySelector(
        `[data-number="${sourceZone}"]`
      );

      if (sourceZoneElement) {
        sourceZoneElement.textContent = sourceZone;
        sourceZoneElement.classList.remove("filled");
        sourceZoneElement.draggable = false;
        updateProperty(sourceZone, "");
      }

      // Update usedAnswers state
      setUsedAnswers((prev) => {
        const newUsedAnswers = { ...prev };
        delete newUsedAnswers[sourceZone];
        return newUsedAnswers;
      });
    },
    [uniqueId, updateProperty]
  );

  const handleAnswerZoneDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over-answer-zone");
  };

  const handleAnswerZoneDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over-answer-zone");
  };

  return (
    <div className="flex gap-5 w-full">
      <div className="space-y-2">
        {/* Title */}
        <b className="block text-center">{flowchartItems.title}</b>

        {/* Blocks */}
        <div ref={dropzonesWrapperRef} className="space-y-2">
          {flowchartItems.items.map(({ flowchartText }, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 relative"
              >
                <div
                  className="max-w-md w-full px-2 py-1 border-2 border-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: convertToHtml(flowchartText, initialNumber + index),
                  }}
                />

                {/* Arrow icon */}
                {flowchartItems.items.length !== index + 1 ? (
                  <Icon src={arrowDownIcon} alt="Arrow down" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Answer choices wrapper */}
      <div>
        <b>{answerChoices.title}</b>

        {/* Answer options */}
        <ul
          onDrop={handleAnswerZoneDrop}
          onDragOver={handleAnswerZoneDragOver}
          onDragLeave={handleAnswerZoneDragLeave}
          className="max-w-max rounded-md space-y-2 p-2 transition-colors"
        >
          {answerChoices.options.map((item, index) => {
            const isUsed = Object.keys(usedAnswers).find((key) => {
              return usedAnswers[key] === item.option;
            });

            return (
              <li
                key={index}
                draggable={!isUsed}
                onDragStart={(e) => handleDragStart(e, item.option)}
                className={`max-w-max bg-white cursor-move px-2 rounded border border-gray-400 ${
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

export default Flowchart;
