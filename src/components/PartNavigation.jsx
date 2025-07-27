import { Link, useLocation, useParams } from "react-router-dom";

const PartNavigation = ({ questionCounts = [] }) => {
  const location = useLocation();
  const { partNumber, questionNumber } = useParams();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Calculate cumulative question counts for URL generation
  const calculateQuestionOffset = (partIndex) => {
    return questionCounts
      .slice(0, partIndex)
      .reduce((total, count) => total + count, 0);
  };

  return (
    <footer className="flex h-14 border-t">
      {questionCounts.map((questionCount, partIndex) => {
        const questionOffset = calculateQuestionOffset(partIndex);
        const currentPartNumber = partIndex + 1;
        const isActivePart =
          partNumber && Number(partNumber) === currentPartNumber;
        const NavigationTag = isActivePart ? "div" : Link;

        const partUrl = `/${pathSegments[0]}/${
          pathSegments[1]
        }/${currentPartNumber}/${questionOffset + 1}`;

        return (
          <NavigationTag
            to={isActivePart ? undefined : partUrl}
            key={partIndex}
            className={`
              ${isActivePart ? "min-w-max px-5" : "grow hover:bg-gray-100"}
              flex items-center justify-center gap-4 border-r 
              transition-colors duration-300 last:border-r-0
            `}
          >
            {/* Part number display */}
            <span className={`${isActivePart ? "font-bold" : ""} text-dark`}>
              Part {currentPartNumber}
            </span>

            {/* Progress indicator for inactive parts */}
            {!isActivePart && (
              <span className="text-gray-500">0 of {questionCount}</span>
            )}

            {/* Question navigation for active part */}
            {isActivePart && (
              <div className="flex">
                {Array.from({ length: questionCount }, (_, questionIndex) => {
                  const questionNum = questionOffset + questionIndex + 1;
                  const isCurrentQuestion =
                    Number(questionNumber) === questionNum;

                  return (
                    <Link
                      key={questionIndex}
                      to={`/${pathSegments[0]}/${pathSegments[1]}/${partNumber}/${questionNum}`}
                      className={`
                        inline-block px-1 border-2 rounded 
                        transition-colors duration-300 hover:border-blue-500 hover:font-bold
                        ${
                          isCurrentQuestion
                            ? "font-bold border-blue-500"
                            : "border-transparent"
                        }
                      `}
                    >
                      {questionNum}
                    </Link>
                  );
                })}
              </div>
            )}
          </NavigationTag>
        );
      })}
    </footer>
  );
};

export default PartNavigation;
