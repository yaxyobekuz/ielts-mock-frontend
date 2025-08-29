import { createSlice } from "@reduxjs/toolkit";

const text = `<p><strong>Text Editor</strong></p><p>Welcome to text editor! Here are some features: <input type=\"text\" data-name=\"answer-input\"></p><ul><li><p><strong>Bold text</strong></p></li><li><p><em>Italic text</em></p></li><li><p><u>Underlined text</u></p></li><li><p>Lists and more!</p></li><li><p><input type=\"text\" data-name=\"answer-input\"></p></li></ul><p> Lorem ipsum dolor sit amet!</p><p><p><span data-name=\"dropzone\"></span><span data-name=\"dropzone\"></span><span data-name=\"dropzone\"></span></p></p>`;

const listeningParts = [
  // Text
  {
    number: 1,
    totalQuestions: 10,
    description: "Listen and answer questions.",
    sections: [
      {
        text,
        answers: [],
        type: "text",
        questionsCount: 10,
        title: "Questions",
        description: `Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.`,
      },
    ],
  },
  // Text draggable
  {
    number: 2,
    totalQuestions: 10,
    description: "Listen and answer questions.",
    sections: [
      {
        text,
        questionsCount: 3,
        type: "text-draggable",
        title: "Questions",
        options: {
          title: "Staff Responsibilities",
          data: [
            { option: "Finance" },
            { option: "Food" },
            { option: "Health" },
          ],
        },
        description: `Who is responsible for each area? Choose the correct answer for each person and move it into the gap.`,
      },
      {
        text,
        questionsCount: 3,
        type: "text-draggable",
        title: "Questions",
        options: {
          title: "Staff Responsibilities",
          data: [
            { option: "Finance" },
            { option: "Food" },
            { option: "Health" },
          ],
        },
        description: `Who is responsible for each area? Choose the correct answer for each person and move it into the gap.`,
      },
    ],
  },
  // Flowchart
  {
    number: 3,
    totalQuestions: 10,
    description: "Listen and answer questions.",
    sections: [
      {
        type: "flowchart",
        questionsCount: 10,
        title: "Questions",
        items: {
          title: "Flowchart",
          data: [{ text }, { text }, { text }],
        },
        options: {
          title: "Staff Responsibilities",
          data: [
            { option: "Finance" },
            { option: "Food" },
            { option: "Health" },
          ],
        },
        description: `Complete the flow-chart. Choose the correct answer and move it into the gap.`,
      },
    ],
  },
  // Radiogroup
  {
    number: 4,
    totalQuestions: 2,
    description: "Listen and answer questions.",
    sections: [
      {
        questionsCount: 2,
        title: "Questions",
        type: "radio-group",
        groups: [
          {
            correctAnswerIndex: 0,
            question: "What is the main topic of the conversation?",
            answers: [
              { text: "Furniture sale" },
              { text: "Second-hand shop" },
              { text: "Online marketplace" },
              { text: "Charity event" },
            ],
          },
          {
            correctAnswerIndex: 0,
            question: "What is the price of the dining table?",
            answers: [
              { text: "£15.00" },
              { text: "£20.00" },
              { text: "£25.00" },
              { text: "£30.00" },
            ],
          },
        ],
        description: "Choose the correct letter, A, B, C or D.",
      },
    ],
  },
];

const readingParts = [
  // Text
  {
    number: 1,
    totalQuestions: 10,
    text: "Just wedding it! 1",
    description: "Listen and answer questions.",
    sections: [
      {
        answers: [],
        type: "text",
        questionsCount: 10,
        title: "Questions",
        text: text + text + text + text,
        description: `Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.`,
      },
    ],
  },
  // Radiogroup
  {
    number: 2,
    totalQuestions: 2,
    text: "Just wedding it! 2",
    description: "Listen and answer questions.",
    sections: [
      {
        questionsCount: 2,
        title: "Questions",
        type: "radio-group",
        groups: [
          {
            correctAnswerIndex: 0,
            question: "What is the main topic of the conversation?",
            answers: [
              { text: "Furniture sale" },
              { text: "Second-hand shop" },
              { text: "Online marketplace" },
              { text: "Charity event" },
            ],
          },
          {
            correctAnswerIndex: 0,
            question: "What is the price of the dining table?",
            answers: [
              { text: "£15.00" },
              { text: "£20.00" },
              { text: "£25.00" },
              { text: "£30.00" },
            ],
          },
        ],
        description: "Choose the correct letter, A, B, C or D.",
      },
    ],
  },
  // Text
  {
    number: 3,
    totalQuestions: 10,
    text: "Just wedding it!",
    description: "Listen and answer questions.",
    sections: [
      {
        text,
        answers: [],
        type: "text",
        questionsCount: 10,
        title: "Questions",
        description: `Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.`,
      },
    ],
  },
  // Radiogroup
  {
    number: 4,
    totalQuestions: 2,
    text: "Just wedding it!",
    description: "Listen and answer questions.",
    sections: [
      {
        questionsCount: 2,
        title: "Questions",
        type: "radio-group",
        groups: [
          {
            correctAnswerIndex: 0,
            question: "What is the main topic of the conversation?",
            answers: [
              { text: "Furniture sale" },
              { text: "Second-hand shop" },
              { text: "Online marketplace" },
              { text: "Charity event" },
            ],
          },
          {
            correctAnswerIndex: 0,
            question: "What is the price of the dining table?",
            answers: [
              { text: "£15.00" },
              { text: "£20.00" },
              { text: "£25.00" },
              { text: "£30.00" },
            ],
          },
        ],
        description: "Choose the correct letter, A, B, C or D.",
      },
    ],
  },
];

const writingParts = [
  // Text
  {
    number: 1,
    totalQuestions: 10,
    text: "Just wedding it! 1",
    description: "Listen and answer questions.",
  },
  // Text
  {
    number: 2,
    totalQuestions: 10,
    text: "Just wedding it! 1",
    description: "Listen and answer questions.",
  },
];

const initialState = {
  writing: {
    testId: writingParts,
  },
  reading: {
    testId: readingParts,
  },
  listening: {
    testId: listeningParts,
  },
};

const initialSections = {
  text: {
    type: "text",
    questionsCount: 0,
    title: "Section title",
    text: "<p>Section text</p>\n...",
    description: "Section description",
  },
  "text-draggable": {
    questionsCount: 0,
    type: "text-draggable",
    title: "Section title",
    text: "<p>Section text</p>\n...",
    description: "Section description",
    options: { title: "Options title", data: [] },
  },
  flowchart: {
    type: "flowchart",
    questionsCount: 0,
    title: "Section title",
    description: "Section description",
    items: { title: "Chart title", data: [] },
    options: { title: "Options title", data: [] },
  },
  "radio-group": {
    groups: [],
    questionsCount: 0,
    type: "radio-group",
    title: "Section title",
    description: "Section description",
  },
};

export const moduleSlice = createSlice({
  initialState,
  name: "module",
  reducers: {
    // Set complete module data
    setModuleData: (state, action) => {
      const { type, data, id } = action.payload;

      if (state[type] && state[type][id]) {
        state[type][id] = data;
      } else {
        console.error(`Test ${id}: ${type} module is not defined`);
      }
    },

    // Add new part
    addModulePart: (state, action) => {
      const { type, id } = action.payload;

      if (state[type] && state[type][id]) {
        const parts = state[type][id];

        const partData = {
          sections: [],
          totalQuestions: 10,
          number: parts.length + 1,
          description: "Part description",
        };

        parts.push(partData);
      } else {
        console.error(`Test ${id}: ${type} module is not defined`);
      }
    },

    // Add new section
    addModuleSection: (state, action) => {
      const { type, id, partNumber, sectionType } = action.payload;

      if (state[type] && state[type][id]) {
        const parts = state[type][id];
        const part = parts.find((p) => p.number === partNumber);

        if (!part) return console.error(`Part ${partNumber} is not defined`);

        if (!part.sections) part.sections = [];

        part.sections.push(initialSections[sectionType]);
      } else {
        console.error(`Test ${id}: ${type} module is not defined`);
      }
    },

    // Update section
    updateModuleSection: (state, action) => {
      const { type, id, partNumber, sectionIndex, data } = action.payload;

      if (state[type] && state[type][id]) {
        const parts = state[type][id];
        const part = parts.find((p) => p.number === partNumber);

        if (!part) return console.error(`Part ${partNumber} is not defined`);

        const section = part?.sections[sectionIndex];

        if (!section) {
          return console.error(`Section ${sectionIndex} is not defined`);
        }

        Object.assign(section, { ...section, ...data });

        part.totalQuestions = part.sections.reduce(
          (total, section) => total + (section.questionsCount || 0),
          0
        );
      } else {
        console.error(`Test ${id}: ${type} module is not defined`);
      }
    },

    // Update section
    updateModulePart: (state, action) => {
      const { type, id, partNumber, data } = action.payload;

      if (state[type] && state[type][id]) {
        const parts = state[type][id];
        const part = parts.find((p) => p.number === partNumber);

        if (!part) return console.error(`Part ${partNumber} is not defined`);

        Object.assign(part, { ...part, ...data });
      } else {
        console.error(`Test ${id}: ${type} module is not defined`);
      }
    },

    // Remove item from module array by index
    removeModulePart: (state, action) => {
      const { type, id, number } = action.payload;

      if (state[type] && state[type][id]) {
        const parts = state[type][id];
        const filteredParts = parts.filter((p) => p.number !== number);
        const newParts = filteredParts.map((p, i) => ({ ...p, number: i + 1 }));
        state[type][id] = newParts;
      } else {
        console.error(`Test ${id}: ${type} module is not defined`);
      }
    },
  },
});

// Export action creators
export const {
  addModulePart,
  setModuleData,
  addModuleSection,
  updateModulePart,
  removeModulePart,
  updateModuleSection,
} = moduleSlice.actions;

// Export reducer as default
export default moduleSlice.reducer;
