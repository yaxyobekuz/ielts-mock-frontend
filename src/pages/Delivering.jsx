// Icons
import { Send } from "lucide-react";

// Hooks
import useStore from "@/hooks/useStore";

// Router
import { useNavigate, useParams } from "react-router-dom";

const Delivering = () => {
  const navigate = useNavigate();
  const { module, testId } = useParams();
  const { updateProperty: updateModule } = useStore("modules");
  const { getData, resetData: resetAnswers } = useStore("answers");
  const answersData = getData();

  const nextModule = (() => {
    if (module === "listening") return "reading";
    else if (module === "reading") return "writing";
    else return "writing";
  })();

  const hanldeNext = () => {
    // Save module anwers to store
    updateModule(module, { isDone: true, answers: answersData });
    resetAnswers();

    // Navigate user
    if (module === "writing") return navigate(`/submittion`);
    navigate(`/tests/test/${testId}/module/${nextModule}/1/1`);
  };

  return (
    <div className="border-b border-gray-300">
      <div className="container !max-w-4xl pt-4 pb-20">
        <div className="flex items-center justify-between">
          <p>Click next to continue</p>
          <button
            onClick={hanldeNext}
            className="flex items-center justify-center gap-3.5 bg-black px-6 py-2 rounded-sm text-white transition-opacity duration-200 hover:opacity-70"
          >
            <Send size={20} />
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delivering;
