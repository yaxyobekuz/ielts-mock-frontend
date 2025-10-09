// Icons
import { Send } from "lucide-react";

// Hooks
import useStore from "@/hooks/useStore";

// Router
import { useNavigate, useParams } from "react-router-dom";

const Delivering = ({ onStopAudio }) => {
  const navigate = useNavigate();
  const { module, testId } = useParams();
  const { updateProperty: updateModule } = useStore("modules");
  const { getData, resetData: resetAnswers } = useStore("answers");
  const answersData = getData();

  const handleNext = () => {
    // Navigate user
    navigate(`/tutorial/${testId}`);

    // Stop listening audio
    if (module === "listening") onStopAudio();

    // Remove module timer
    localStorage.removeItem(`timer-${testId}-${module}`);

    // Save module answers to store
    updateModule(module, { isDone: true, answers: answersData });
    resetAnswers();
  };

  return (
    <div className="border-b border-gray-300">
      <div className="container !max-w-4xl pt-4 pb-20">
        <div className="flex items-center justify-between">
          <p>Click next to continue</p>
          <button
            onClick={handleNext}
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
