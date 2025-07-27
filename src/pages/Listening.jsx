// Components
import PartBody from "../components/PartBody";
import PartHeader from "../components/PartHeader";
import PartNavigation from "../components/PartNavigation";

const text = `*Phone call about second-hand furniture*

*Items:*
Dining table:          - ^ shape

                             - medium size

                             - ^ old

                             - price: £25.00

Dining chairs:       - set of ^ chairs

                             - seats covered in ^ material

                             - in ^ condition

                             - price: £20.00


Desk:                    - length: 1 metre 20

                             - 3 drawers. Top drawer has a ^.
                              
                             - price: £ ^
                             
^

^

^
`;

const flowchartText = `The rover is directed to a ~ which has organic material.`;

const textDraggable = `*People*
Mary Brown ~

John Stevens ~

Alison Jones ~

Tim Smith ~

Jenny James ~`;

const listeningTestParts = [
  {
    number: 1,
    totalQuestions: 10,
    description: "Listen and answer questions 1-10.",
    sections: [
      {
        content: { text },
        questionsCount: 10,
        questionType: "text",
        title: "Questions 1-10",
        description:
          "Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.",
      },
    ],
  },
  {
    number: 2,
    totalQuestions: 10,
    description: "Listen and answer questions 11-20.",
    sections: [
      {
        content: { text },
        questionsCount: 10,
        questionType: "text",
        title: "Questions 11-20",
        description:
          "Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.",
      },
    ],
  },
  {
    number: 3,
    totalQuestions: 10,
    description: "Listen and answer questions 21-30.",
    sections: [
      {
        questionsCount: 5,
        questionType: "text-draggable",
        title: "Questions 21-30",
        content: {
          text: textDraggable,
          answerChoices: {
            title: "Staff Responsibilities",
            options: [
              { option: "Finance" },
              { option: "Food" },
              { option: "Health" },
              { option: "Kids' counseling" },
              { option: "Organisation" },
              { option: "Rooms" },
              { option: "Sport" },
              { option: "Trips" },
            ],
          },
        },
        description:
          "Who is responsible for each area? Choose the correct answer for each person and move it into the gap.",
      },
      {
        questionType: "flowchart",
        title: "Questions 21-30",
        questionsCount: 5,
        content: {
          flowchartItems: {
            title: "Flowchart",
            items: [
              { flowchartText },
              { flowchartText },
              { flowchartText },
              { flowchartText },
              { flowchartText },
            ],
          },
          answerChoices: {
            title: "Staff Responsibilities",
            options: [
              { option: "Finance" },
              { option: "Food" },
              { option: "Health" },
              { option: "Kids' counseling" },
              { option: "Organisation" },
              { option: "Rooms" },
              { option: "Sport" },
              { option: "Trips" },
            ],
          },
        },
        description:
          "Complete the flow-chart. Choose the correct answer and move it into the gap.",
      },
    ],
  },
  {
    number: 4,
    totalQuestions: 10,
    description: "Listen and answer questions 31-40.",
    sections: [
      {
        questionType: "radio-group",
        title: "Questions 31-40",
        questionsCount: 2,
        content: {
          questionGroups: [
            {
              questionText: "What is the main topic of the conversation?",
              choiceOptions: [
                { text: "Furniture sale" },
                { text: "Second-hand shop" },
                { text: "Online marketplace" },
                { text: "Charity event" },
              ],
            },
            {
              questionText: "What is the price of the dining table?",
              choiceOptions: [
                { text: "£15.00" },
                { text: "£20.00" },
                { text: "£25.00" },
                { text: "£30.00" },
              ],
            },
          ],
        },
        description: "Choose the correct letter, A, B, C or D.",
      },
    ],
  },
];

const Listening = () => {
  const partQuestionCounts = listeningTestParts.map(
    (part) => part.totalQuestions
  );

  return (
    <div className="w-full h-screen flex flex-col">
      <PartHeader />
      <PartBody parts={listeningTestParts} />
      <PartNavigation questionCounts={partQuestionCounts} />
    </div>
  );
};

export default Listening;
