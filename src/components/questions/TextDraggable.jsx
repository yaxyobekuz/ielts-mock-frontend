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
      <pre
        ref={dropzonesWrapperRef}
        className="flex-1 overflow-auto max-w-max"
        dangerouslySetInnerHTML={{ __html: convertToHtml(text, initialNumber) }}
      />

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

export default TextDraggable;
