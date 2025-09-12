// Hooks
import useStore from "@/hooks/useStore";

const RadioGroup = ({ initialNumber, groups }) => {
  const { updateProperty, getData } = useStore("answers");
  const initialValues = getData();

  return (
    <ul className="space-y-6">
      {groups.map(({ question, answers }, index) => {
        const groupNumber = initialNumber + index;
        const initialValue = initialValues[groupNumber];

        return (
          <li key={index}>
            <p className="mb-1">
              <b className="inline-block py-0.5 px-1.5 rounded mr-2 border-2 transition-colors duration-300">
                {groupNumber}
              </b>
              <span>{question}</span>
            </p>

            {/* Answers */}
            <Answers
              answers={answers}
              groupNumber={groupNumber}
              initialValue={initialValue?.text}
              onSelect={(value) => updateProperty(groupNumber, { text: value })}
            />
          </li>
        );
      })}
    </ul>
  );
};

const Answers = ({ answers, groupNumber, onSelect, initialValue }) => {
  return (
    <ul>
      {answers.map(({ text }, index) => (
        <li key={index}>
          <label className="flex items-center gap-3.5 h-11 px-3.5 rounded-md cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              value={text}
              className="size-3.5"
              name={`answer-${groupNumber}`}
              defaultChecked={initialValue === text}
              onChange={(e) => onSelect(e.target.value)}
            />
            <span>{text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioGroup;
