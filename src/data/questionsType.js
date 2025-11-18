// Components
import Text from "@/components/questions/Text";
import Flowchart from "@/components/questions/Flowchart";
import RadioGroup from "@/components/questions/RadioGroup";
import GridMatching from "@/components/questions/GridMatching";
import CheckboxGroup from "@/components/questions/CheckboxGroup";
import TextDraggable from "@/components/questions/TextDraggable";
import InputFlowchart from "@/components/questions/InputFlowchart";

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
    label: "Input Flowchart",
    value: "input-flowchart",
    component: InputFlowchart,
  },
  {
    label: "Radio group",
    value: "radio-group",
    component: RadioGroup,
  },
  {
    label: "Checkbox group",
    value: "checkbox-group",
    component: CheckboxGroup,
  },
  {
    label: "Grid matching",
    value: "grid-matching",
    component: GridMatching,
  },
];

export default questionsType;
