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

const Listening = () => {
  return (
    <div className="w-full h-screen">
      <PartHeader />
      <PartBody
        parts={[
          {
            number: 1,
            questions: 10,
            description: "Listen and answer questions 1-10.",
            sections: [
              {
                type: "text",
                data: { text },
                title: "Questions 1-10",
                description: `Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.`,
              },
            ],
          },
          {
            number: 2,
            questions: 10,
            description: "Listen and answer questions 10-20.",
            sections: [
              {
                type: "text",
                data: { text },
                title: "Questions 10-20",
                description: `Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.`,
              },
            ],
          },
          {
            number: 3,
            questions: 10,
            description: "Listen and answer questions 20-25.",
            sections: [
              {
                type: "text-draggable",
                title: "Questions 20-30",
                data: {
                  text: textDraggable,
                  answers: {
                    title: "Staff Responsibilities",
                    data: [
                      { answer: "Finance" },
                      { answer: "Food" },
                      { answer: "Health" },
                      { answer: "Kids' counceling" },
                      { answer: "Organisation" },
                      { answer: "Rooms" },
                      { answer: "Sport" },
                      { answer: "Trips" },
                    ],
                  },
                },
                description: `Who is responsible for each area? Choose the correct answer for each person and move it into the gap.`,
              },
              {
                type: "flowchart",
                title: "Questions 20-30",
                data: {
                  texts: {
                    title: "Flowchart",
                    data: [
                      { text: flowchartText },
                      { text: flowchartText },
                      { text: flowchartText },
                      { text: flowchartText },
                    ],
                  },
                  answers: {
                    title: "Staff Responsibilities",
                    data: [
                      { answer: "Finance" },
                      { answer: "Food" },
                      { answer: "Health" },
                      { answer: "Kids' counceling" },
                      { answer: "Organisation" },
                      { answer: "Rooms" },
                      { answer: "Sport" },
                      { answer: "Trips" },
                    ],
                  },
                },
                description: `Complete the flow-chart. Choose the correct answer and move it into the gap.`,
              },
            ],
          },
          {
            number: 4,
            questions: 10,
            description: "Listen and answer questions 30-40.",
            sections: [
              {
                type: "radio-group",
                title: "Questions 20-30",
                data: {
                  groups: [
                    {
                      question: "What is the main topic of the conversation?",
                      options: [
                        { text: "Furniture sale" },
                        { text: "Second-hand shop" },
                        { text: "Online marketplace" },
                        { text: "Charity event" },
                      ],
                    },
                    {
                      question: "What is the price of the dining table?",
                      options: [
                        { text: "£15.00" },
                        { text: "£20.00" },
                        { text: "£25.00" },
                        { text: "£30.00" },
                      ],
                    },
                  ],
                },
                description: `Complete the radio group. Choose the correct answer and move it into the gap.`,
              },
            ],
          },
        ]}
      />

      <PartNavigation parts={[10, 10, 10, 10]} />
    </div>
  );
};

export default Listening;
