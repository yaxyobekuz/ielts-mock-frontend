// Icons
import { MoveHorizontal } from "lucide-react";

// Data
import questionsType from "../data/questionsType";

// Hooks
import useStore from "@/hooks/useStore";
import useModule from "../hooks/useModule";
import usePathSegments from "../hooks/usePathSegments";

// Router
import { useNavigate, useParams } from "react-router-dom";

// React
import { useMemo, useState, useRef, useEffect } from "react";

const TextComponent = questionsType.find(
  ({ value }) => value === "text"
).component;

const Reading = () => {
  const navigate = useNavigate();
  const { partNumber, testId } = useParams();
  const { pathSegments } = usePathSegments();
  const { getProperty } = useStore("modules");
  const readingAnwers = getProperty("reading");
  const writingAnwers = getProperty("writing");
  const { updateProperty: updateWords, getProperty: getWords } =
    useStore("answers");

  const module = pathSegments[4];
  const { getModuleData } = useModule(module, testId);
  const parts = getModuleData();

  // Calculate current part and cumulative question count
  const { currentPart } = useMemo(() => {
    const partNum = parseInt(partNumber);
    const part = parts?.find((p) => p.number === partNum);

    return { currentPart: part };
  }, [parts, partNumber, module]);

  const { text } = currentPart || {};

  // Left panel width state
  const isDragging = useRef(false);
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const wordsFromStore = getWords(partNumber)?.text || "";
  const [words, setWords] = useState(wordsFromStore);
  const wordsCount = words?.split(" ")?.filter(Boolean)?.length || 0;

  useEffect(() => {
    if (writingAnwers?.isDone) navigate("/submission");

    if (!readingAnwers?.isDone) {
      navigate(`/tests/test/${testId}/module/reading/1/1`);
    }

    const updateSelectStyle = (select = "auto") => {
      document.body.style.userSelect = select;
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      updateSelectStyle("none");

      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      updateSelectStyle("auto");
      isDragging.current = false;
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setWords(wordsFromStore);
  }, [partNumber]);

  if (!currentPart) {
    return (
      <div className="container">
        <div className="py-8">
          <div className="w-full bg-red-50 py-3 px-4 mb-5 rounded-xl border border-red-300">
            <p className="text-red-700">Part not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container h-full pt-4">
      {/* Part header */}
      <div className="w-full bg-[#f1f2ec] py-2.5 px-4 mb-4 rounded-md border border-gray-300">
        <h1 className="mb-1 font-bold">Part {partNumber}</h1>
        <p>
          You should spend about 40 minutes on this task. Write at least 250
          words.
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex w-full h-[calc(100%-108px)] relative"
      >
        {/* Left side */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="h-full overflow-y-auto ielts-theme-scroll"
        >
          <TextComponent
            text={text}
            initialNumber={0}
            className="size-full max-h-full"
          />
        </div>

        {/* Divider */}
        <div
          onMouseDown={() => (isDragging.current = true)}
          className="flex items-center justify-center shrink-0 w-[3px] cursor-e-resize bg-gray-400 relative"
        >
          <div className="flex items-center justify-center absolute z-10 size-8 bg-gray-50 border-[3px] border-gray-400 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-gray-200">
            <MoveHorizontal size={18} strokeWidth={2} />
          </div>
        </div>

        {/* Right side */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col gap-1.5 h-full overflow-y-auto pl-5"
        >
          <textarea
            value={words}
            id="writing-response"
            name="writing-response"
            className="grow resize-none rounded border border-gray-400 outline-0 focus:border-blue-500"
            onChange={(e) => {
              setWords(e.target.value);
              updateWords(partNumber, { text: e.target.value });
            }}
          />

          {/* Words count */}
          <p className="text-right">Words: {wordsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Reading;
