// Components
import PartBody from "../components/PartBody";
import PartHeader from "../components/PartHeader";
import PartNavigation from "../components/PartNavigation";

const Listening = () => {
  return (
    <div className="w-full h-screen">
      <PartHeader />
      <PartBody />
      <PartNavigation parts={[10, 10, 10, 10]} />
    </div>
  );
};

export default Listening;
