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
        ]}
      />

      <PartNavigation parts={[10, 10, 10, 10]} />
    </div>
  );
};

export default Listening;
