// Hooks
import useStore from "@/hooks/useStore";

// Helpers
import { getLetterByIndex } from "@/lib/helpers";

const GridMatching = ({ initialNumber, grid, _id: sectionId }) => {
  const { updateProperty, getData } = useStore("answers");
  const answers = getData();

  const handleInputSelect = (questionNumber, index) => {
    updateProperty(questionNumber, { text: getLetterByIndex(index) });
  };

  return (
    <div className="py-5">
      {/* Head */}
      <div className="flex min-w-max h-12">
        <div className="btn w-full min-w-48 max-w-md h-12 p-0 rounded-none border-r border-black font-bold" />
        {Array.from({ length: grid.answerColumns }, (_, i) => (
          <div
            key={i}
            className="shrink-0 btn size-12 p-0 rounded-none border-r border-black font-bold last:border-r-0"
          >
            {getLetterByIndex(i)}
          </div>
        ))}
      </div>

      {/* Body */}
      {grid.questions.map((question, qIndex) => {
        const qNumber = qIndex + initialNumber;
        return (
          <div key={qIndex} className="flex min-h-12">
            {/* Question */}
            <div className="flex items-start gap-3 min-w-48 max-w-md w-full h-auto p-1.5 rounded-none border-t border-r border-black">
              <b>{qNumber}</b>
              <p>{question.text}</p>
            </div>

            {/* Answers */}
            {Array.from({ length: grid.answerColumns }, (_, aIndex) => {
              const defaultChecked =
                answers[qNumber]?.text === getLetterByIndex(aIndex);

              return (
                <label
                  key={aIndex}
                  className="shrink-0 btn w-12 h-auto p-0 rounded-none border-t border-r border-black last:border-r-0"
                >
                  <input
                    type="radio"
                    defaultChecked={defaultChecked}
                    name={`section-${sectionId}-question-${qIndex}`}
                    onChange={() => {
                      handleInputSelect(qNumber, aIndex);
                    }}
                  />
                </label>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridMatching;
