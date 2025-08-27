// Components
import Text from "../components/questions/Text";
import Flowchart from "../components/questions/Flowchart";
import RadioGroup from "../components/questions/RadioGroup";
import TextDraggable from "../components/questions/TextDraggable";

const questionsType = [
  {
    label: "Text",
    value: "text",
    component: Text,
  },
  {
    label: "Text draggable",
    value: "text-draggable",
    component: TextDraggable,
  },
  {
    label: "Flowchart",
    value: "flowchart",
    component: Flowchart,
  },
  {
    label: "Radio group",
    value: "radio-group",
    component: RadioGroup,
  },
];

export default questionsType;
