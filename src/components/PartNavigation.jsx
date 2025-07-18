import { Link, useLocation, useParams } from "react-router-dom";

const PartNavigation = ({ parts = 1 }) => {
  const location = useLocation();
  const { partNumber, questionNumber } = useParams();
  const paths = location.pathname.split("/")?.filter((p) => p !== "");

  return (
    <footer className="flex h-14 border-t">
      {parts.map((part, index) => {
        const totalPrevPartsLength = parts
          .slice(0, index)
          .reduce((acc, curr) => acc + curr, 0);
        const isActive = partNumber && Number(partNumber) === index + 1;
        const Tag = isActive ? "div" : Link;

        return (
          <Tag
            to={
              isActive
                ? undefined
                : `/${paths[0]}/${paths[1]}/${index + 1}/${
                    totalPrevPartsLength + 1
                  }`
            }
            key={index}
            className={`${
              isActive ? "min-w-max px-5" : "grow hover:bg-gray-100"
            } flex items-center justify-center gap-4 border-r transition-colors duration-300 last:border-r-0`}
          >
            {/* Part number */}
            <span className={`${isActive ? "font-bold" : ""} text-dark`}>
              Part {index + 1}
            </span>

            {/* Attempted count */}
            {!isActive ? (
              <span className="text-gray-500">0 of {part}</span>
            ) : null}

            {/* Questions nav */}
            {isActive ? (
              <div className="flex">
                {Array.from({ length: part }, (_, i) => {
                  const number = totalPrevPartsLength + i + 1;
                  const isCurrent = Number(questionNumber) === number;
                  return (
                    <Link
                      key={i}
                      to={`/${paths[0]}/${paths[1]}/${partNumber}/${number}`}
                      className={`${
                        isCurrent
                          ? "font-bold border-blue-500"
                          : "border-transparent"
                      } inline-block px-1 border-2 rounded transition-colors duration-300 hover:border-blue-500 hover:font-bold`}
                    >
                      {number}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </Tag>
        );
      })}
    </footer>
  );
};

export default PartNavigation;
