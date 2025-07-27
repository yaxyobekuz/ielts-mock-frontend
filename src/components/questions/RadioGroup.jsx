import { useParams } from "react-router-dom";

const RadioGroup = ({ initialNumber, groups }) => {
  const { questionNumber } = useParams();
  return (
    <ul className="space-y-6">
      {groups.map(({ question, options }, index) => {
        let groupNumber = initialNumber + index;
        const isCurrentQuestion = groupNumber === parseInt(questionNumber);

        return (
          <li key={index}>
            <p className="mb-1">
              <b
                className={`${
                  isCurrentQuestion ? "border-blue-500" : "border-transparent"
                } inline-block py-0.5 px-1.5 rounded mr-2 border-2 transition-colors duration-300`}
              >
                {groupNumber}
              </b>
              <span>{question}</span>
            </p>

            {/* Options */}
            <Options groupNumber={groupNumber} options={options} />
          </li>
        );
      })}
    </ul>
  );
};

const Options = ({ options, groupNumber }) => {
  return (
    <ul>
      {options.map(({ text }, index) => {
        return (
          <li>
            <label
              key={index}
              className="flex items-center gap-3.5 h-11 px-3.5 rounded-md cursor-pointer hover:bg-gray-100"
            >
              <input type="radio" value={text} name={`option-${groupNumber}`} />
              <span>{text}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default RadioGroup;
