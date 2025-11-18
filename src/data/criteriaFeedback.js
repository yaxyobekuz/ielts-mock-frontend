// Detailed feedback for Writing and Speaking criteria based on band scores
// Official IELTS criteria descriptors

const criteriaFeedback = {
  speaking: {
    pronunciation: {
      9: {
        description:
          "Uses a full range of pronunciation features with precision and subtlety. Sustains flexible use of features throughout. Is effortless to understand.",
        strengths: [
          "Perfect control of individual sounds, word stress, and sentence stress",
          "Natural, native-like intonation patterns that enhance meaning",
          "Skillful use of features to convey subtle shades of meaning",
        ],
        improvements: [],
      },
      8: {
        description:
          "Uses a wide range of pronunciation features. Sustains flexible use of features with only occasional lapses. Is easy to understand; L1 accent has minimal effect on intelligibility.",
        strengths: [
          "Excellent control of pronunciation features",
          "Natural use of intonation and stress patterns",
          "Highly intelligible with minimal accent interference",
        ],
        improvements: [
          "Work on eliminating occasional minor pronunciation slips",
          "Fine-tune intonation for maximum naturalness",
        ],
      },
      7: {
        description:
          "Shows all the positive features of Band 6 and some, but not all, of the positive features of Band 8.",
        strengths: [
          "Good control of pronunciation features",
          "Generally clear and intelligible speech",
          "Appropriate use of stress and intonation most of the time",
        ],
        improvements: [
          "Work on consistency in pronunciation across all contexts",
          "Develop more flexible use of intonation patterns",
          "Reduce influence of L1 accent on difficult sounds",
        ],
      },
      6: {
        description:
          "Uses a range of pronunciation features with mixed control. Shows some effective use of features but this is not sustained. Can generally be understood throughout, though mispronunciation of individual words or sounds reduces clarity at times.",
        strengths: [
          "Generally intelligible pronunciation",
          "Can use some pronunciation features effectively",
          "Understandable despite some errors",
        ],
        improvements: [
          "Work on individual sounds that cause problems",
          "Practice word stress patterns consistently",
          "Develop awareness of sentence stress and rhythm",
          "Improve intonation to make speech more natural",
        ],
      },
      5: {
        description:
          "Shows all the positive features of Band 4 and some, but not all, of the positive features of Band 6.",
        strengths: [
          "Basic pronunciation is understandable",
          "Can produce clear speech in familiar contexts",
        ],
        improvements: [
          "Focus on problematic individual sounds",
          "Practice word stress with common vocabulary",
          "Work on maintaining clarity in longer utterances",
          "Develop basic intonation patterns",
        ],
      },
      4: {
        description:
          "Uses a limited range of pronunciation features. Attempts to control features but lapses are frequent. Mispronunciations are frequent and cause some difficulty for the listener.",
        strengths: [
          "Basic sounds can be produced",
          "Some words are clearly pronounced",
        ],
        improvements: [
          "Focus on clear pronunciation of basic everyday words",
          "Learn correct stress patterns for common words",
          "Practice individual problem sounds systematically",
          "Work with a teacher to identify and correct frequent errors",
        ],
      },
      3: {
        description:
          "Shows some of the features of Band 2 and some, but not all, of the positive features of Band 4.",
        strengths: [
          "Can produce some basic English sounds",
        ],
        improvements: [
          "Work intensively on basic English sounds",
          "Practice with very simple words first",
          "Use audio materials to hear and imitate correct pronunciation",
          "Consider one-on-one instruction for intensive practice",
        ],
      },
      2: {
        description:
          "Speech is often unintelligible.",
        strengths: [],
        improvements: [
          "Begin with fundamental pronunciation instruction",
          "Focus on learning to produce basic English sounds",
          "Work with a teacher for intensive pronunciation training",
          "Use visual and audio aids to learn mouth positions for sounds",
        ],
      },
    },
    lexicalResource: {
      9: {
        description:
          "Uses vocabulary with full flexibility and precision in all topics. Uses idiomatic language naturally and accurately.",
        strengths: [
          "Sophisticated and precise vocabulary use",
          "Natural use of idiomatic expressions",
          "Excellent paraphrasing ability",
          "Wide range of vocabulary on all topics",
        ],
        improvements: [],
      },
      8: {
        description:
          "Uses a wide vocabulary resource readily and flexibly to convey precise meaning. Uses less common and idiomatic items with generally good awareness of style and collocation. Uses paraphrase effectively as required.",
        strengths: [
          "Wide vocabulary range used flexibly",
          "Good use of less common vocabulary and idioms",
          "Effective paraphrasing skills",
          "Good awareness of collocation",
        ],
        improvements: [
          "Continue expanding vocabulary for very specialized topics",
          "Fine-tune use of idiomatic expressions in all contexts",
        ],
      },
      7: {
        description:
          "Uses vocabulary resource flexibly to discuss a variety of topics. Uses some less common and idiomatic items and shows some awareness of style and collocation, with some inappropriate choices. Uses paraphrase effectively.",
        strengths: [
          "Good vocabulary range on various topics",
          "Can use less common vocabulary appropriately",
          "Effective paraphrasing ability",
          "Shows awareness of style and collocation",
        ],
        improvements: [
          "Expand vocabulary range, especially for academic and formal topics",
          "Work on collocation accuracy",
          "Practice using idiomatic language more naturally",
          "Reduce inappropriate word choices",
        ],
      },
      6: {
        description:
          "Has a wide enough vocabulary to discuss topics at length and make meaning clear in spite of inappropriacies. Generally paraphrases successfully.",
        strengths: [
          "Adequate vocabulary for extended discussion",
          "Can make meaning clear despite some errors",
          "Basic paraphrasing ability",
        ],
        improvements: [
          "Expand vocabulary range beyond familiar topics",
          "Learn more topic-specific vocabulary",
          "Practice collocations to reduce inappropriate word combinations",
          "Develop paraphrasing strategies for when specific words are unknown",
        ],
      },
      5: {
        description:
          "Manages to talk about familiar and unfamiliar topics but uses vocabulary with limited flexibility. Attempts to use paraphrase but with mixed success.",
        strengths: [
          "Can discuss familiar topics with adequate vocabulary",
          "Attempts to paraphrase when needed",
        ],
        improvements: [
          "Build vocabulary for common IELTS topics systematically",
          "Learn words in context, not in isolation",
          "Practice expressing the same idea in different ways",
          "Focus on learning useful collocations",
        ],
      },
      4: {
        description:
          "Is able to talk about familiar topics but can only convey basic meaning on unfamiliar topics and makes frequent errors in word choice. Rarely attempts paraphrase.",
        strengths: [
          "Has basic vocabulary for familiar topics",
          "Can convey simple meanings",
        ],
        improvements: [
          "Build fundamental vocabulary for everyday topics",
          "Learn to express basic ideas in simple ways",
          "Practice using new words in context",
          "Start developing basic paraphrasing skills",
        ],
      },
      3: {
        description:
          "Uses simple vocabulary to convey personal information. Has insufficient vocabulary for less familiar topics.",
        strengths: [
          "Knows some basic everyday words",
        ],
        improvements: [
          "Focus on learning essential everyday vocabulary",
          "Learn words with pictures and examples",
          "Practice using new words in simple sentences",
          "Build vocabulary gradually through regular practice",
        ],
      },
      2: {
        description:
          "Only produces isolated words or memorised utterances.",
        strengths: [],
        improvements: [
          "Start learning basic English vocabulary systematically",
          "Use picture dictionaries and flashcards",
          "Learn common phrases for basic situations",
          "Practice with a teacher to build foundational vocabulary",
        ],
      },
    },
    fluencyAndCoherence: {
      9: {
        description:
          "Speaks fluently with only rare repetition or self-correction. Any hesitation is content-related rather than to find words or grammar. Speaks coherently with fully appropriate cohesive features. Develops topics fully and appropriately.",
        strengths: [
          "Completely fluent with natural pauses only",
          "Seamless coherence and topic development",
          "Natural use of cohesive devices",
          "No hesitation related to language difficulty",
        ],
        improvements: [],
      },
      8: {
        description:
          "Speaks fluently with only occasional repetition or self-correction. Hesitation is usually content-related and only rarely to search for language. Develops topics coherently and appropriately.",
        strengths: [
          "Very fluent speech with minimal hesitation",
          "Coherent and well-developed ideas",
          "Natural topic development",
          "Appropriate use of cohesive devices",
        ],
        improvements: [
          "Reduce any remaining hesitation",
          "Ensure all pauses are natural and content-related",
        ],
      },
      7: {
        description:
          "Speaks at length without noticeable effort or loss of coherence. May demonstrate language-related hesitation at times, or some repetition and/or self-correction. Uses a range of connectives and discourse markers with some flexibility.",
        strengths: [
          "Can speak at length on topics",
          "Generally coherent ideas",
          "Good use of linking words",
          "Maintains flow most of the time",
        ],
        improvements: [
          "Reduce language-related hesitation",
          "Improve consistency in coherence",
          "Develop more flexible use of discourse markers",
          "Practice maintaining flow on unfamiliar topics",
        ],
      },
      6: {
        description:
          "Is willing to speak at length, though may lose coherence at times due to occasional repetition, self-correction or hesitation. Uses a range of connectives and discourse markers but not always appropriately.",
        strengths: [
          "Willing to speak at length",
          "Uses some cohesive devices",
          "Can develop ideas to some extent",
        ],
        improvements: [
          "Work on maintaining coherence throughout responses",
          "Reduce unnecessary repetition and self-correction",
          "Practice using linking words more appropriately",
          "Organize ideas before speaking to improve coherence",
        ],
      },
      5: {
        description:
          "Usually maintains flow of speech but uses repetition, self-correction and/or slow speech to keep going. May over-use certain connectives and discourse markers. Produces simple speech fluently, but more complex communication causes fluency problems.",
        strengths: [
          "Can maintain basic flow of speech",
          "Fluent with simple language",
          "Uses some connectives",
        ],
        improvements: [
          "Practice speaking on less familiar topics to build fluency",
          "Reduce overuse of certain linking words (e.g., 'and', 'but', 'so')",
          "Work on maintaining fluency with more complex language",
          "Try to reduce self-correction by planning before speaking",
        ],
      },
      4: {
        description:
          "Cannot respond without noticeable pauses and may speak slowly, with frequent repetition and self-correction. Links basic sentences but with repetitious use of simple connectives and some breakdowns in coherence.",
        strengths: [
          "Can produce basic connected sentences",
          "Uses simple linking words",
        ],
        improvements: [
          "Practice speaking regularly to build confidence and fluency",
          "Work on reducing pauses and hesitation",
          "Learn to link ideas more smoothly",
          "Focus on speaking in complete thoughts rather than isolated sentences",
        ],
      },
      3: {
        description:
          "Speaks with long pauses. Has limited ability to link simple sentences. Gives only simple responses and is frequently unable to convey basic message.",
        strengths: [
          "Can produce some simple sentences",
        ],
        improvements: [
          "Practice speaking simple sentences about familiar topics",
          "Learn basic linking words (and, but, because)",
          "Work on reducing pauses through regular practice",
          "Build confidence by practicing responses to common questions",
        ],
      },
      2: {
        description:
          "Pauses lengthily before most words. Little communication possible.",
        strengths: [],
        improvements: [
          "Focus on building basic speaking confidence",
          "Practice producing simple sentences regularly",
          "Work with a teacher for structured speaking practice",
          "Start with very basic conversational exchanges",
        ],
      },
    },
    grammaticalRangeAndAccuracy: {
      9: {
        description:
          "Uses a full range of structures naturally and appropriately. Produces consistently accurate structures apart from 'slips' characteristic of native speaker speech.",
        strengths: [
          "Complete range of grammatical structures",
          "Natural and appropriate use",
          "Virtually error-free",
          "Only native-speaker-like slips",
        ],
        improvements: [],
      },
      8: {
        description:
          "Uses a wide range of structures flexibly. Produces a majority of error-free sentences with only very occasional inappropriacies or basic/non-systematic errors.",
        strengths: [
          "Wide range of structures used flexibly",
          "Most sentences are error-free",
          "Errors are rare and non-systematic",
          "Complex grammar well controlled",
        ],
        improvements: [
          "Eliminate remaining occasional errors",
          "Ensure all complex structures are used accurately",
        ],
      },
      7: {
        description:
          "Uses a range of complex structures with some flexibility. Frequently produces error-free sentences, though some grammatical mistakes persist.",
        strengths: [
          "Good range of complex structures",
          "Many error-free sentences",
          "Can use grammar flexibly",
        ],
        improvements: [
          "Increase accuracy with complex structures",
          "Work on eliminating persistent grammatical errors",
          "Practice using a wider variety of structures accurately",
        ],
      },
      6: {
        description:
          "Uses a mix of simple and complex structures, but with limited flexibility. May make frequent mistakes with complex structures though these rarely cause comprehension problems.",
        strengths: [
          "Can use both simple and complex structures",
          "Simple structures generally accurate",
          "Errors don't usually prevent understanding",
        ],
        improvements: [
          "Practice complex structures to improve accuracy",
          "Focus on consistent use of tenses",
          "Work on subject-verb agreement",
          "Improve use of articles and prepositions",
        ],
      },
      5: {
        description:
          "Produces basic sentence forms with reasonable accuracy. Uses a limited range of more complex structures, but these usually contain errors and may cause some comprehension problems.",
        strengths: [
          "Basic sentence forms reasonably accurate",
          "Attempts complex structures",
        ],
        improvements: [
          "Solidify basic grammar before attempting complex structures",
          "Practice common complex patterns (conditionals, relative clauses)",
          "Focus on accuracy with present, past, and future tenses",
          "Work on basic sentence structure rules",
        ],
      },
      4: {
        description:
          "Produces basic sentence forms and some correct simple sentences but subordinate structures are rare. Errors are frequent and may lead to misunderstanding.",
        strengths: [
          "Can produce some simple sentences correctly",
          "Basic sentence structure emerging",
        ],
        improvements: [
          "Focus on mastering basic sentence patterns",
          "Practice present and past simple tenses thoroughly",
          "Work on subject-verb agreement",
          "Learn to form correct questions and negatives",
        ],
      },
      3: {
        description:
          "Attempts basic sentence forms but with limited success, or relies on apparently memorised utterances. Makes numerous errors except in memorised expressions.",
        strengths: [
          "Can use some memorized phrases correctly",
        ],
        improvements: [
          "Focus on basic sentence structure (Subject-Verb-Object)",
          "Learn and practice present simple tense",
          "Work on forming basic sentences independently",
          "Study fundamental grammar rules with a teacher",
        ],
      },
      2: {
        description:
          "Cannot produce basic sentence forms.",
        strengths: [],
        improvements: [
          "Begin with fundamental grammar instruction",
          "Learn basic sentence patterns",
          "Practice forming simple sentences with teacher support",
          "Focus on the most basic structures first",
        ],
      },
    },
  },
  writing: {
    taskAchievement: {
      // Task 1
      9: {
        description:
          "Fully satisfies all the requirements of the task. Clearly presents a fully developed response with precise, appropriate information throughout.",
        strengths: [
          "All task requirements fully addressed",
          "Clear, comprehensive overview",
          "Precise selection and reporting of key features",
          "Well-developed and accurate details",
        ],
        improvements: [],
      },
      8: {
        description:
          "Sufficiently addresses all requirements of the task. Presents, highlights and illustrates key features clearly and appropriately. Presents a clear overview.",
        strengths: [
          "All requirements well addressed",
          "Clear overview provided",
          "Key features well highlighted",
          "Appropriate level of detail",
        ],
        improvements: [
          "Ensure all details are completely precise",
          "Fine-tune selection of most significant features",
        ],
      },
      7: {
        description:
          "Covers the requirements of the task. Presents a clear overview of main trends, differences or stages. Clearly presents and highlights key features but could be more fully extended.",
        strengths: [
          "Task requirements covered",
          "Clear overview present",
          "Key features identified",
        ],
        improvements: [
          "Extend key features more fully with supporting detail",
          "Ensure all aspects of task are equally developed",
          "Include more specific data and comparisons",
        ],
      },
      6: {
        description:
          "Addresses the requirements of the task. Presents an overview with information appropriately selected. Presents and adequately highlights key features but details may be irrelevant, inappropriate or inaccurate.",
        strengths: [
          "Task requirements addressed",
          "Overview present",
          "Key features identified",
        ],
        improvements: [
          "Ensure all details are accurate and relevant",
          "Provide clearer overview of main trends",
          "Select more significant features to highlight",
          "Check data accuracy carefully",
        ],
      },
      5: {
        description:
          "Generally addresses the task. The format may be inappropriate in places. Recounts detail mechanically with no clear overview. Presents, but inadequately covers, key features.",
        strengths: [
          "Attempts to address the task",
          "Some key features mentioned",
        ],
        improvements: [
          "Always include a clear overview statement",
          "Focus on main trends rather than all details",
          "Organize information more logically",
          "Ensure appropriate format for the task type",
        ],
      },
      4: {
        description:
          "Attempts to address the task but does not cover all key features. The format may be inappropriate. May confuse key features with detail. May be repetitive or unclear.",
        strengths: [
          "Makes an attempt at the task",
        ],
        improvements: [
          "Learn to identify and describe main trends/features",
          "Include an overview in your response",
          "Avoid listing all numbers - select significant ones",
          "Use correct format for the task type",
        ],
      },
      3: {
        description:
          "Does not adequately address any part of the task. Does not provide an overview or is completely repetitive.",
        strengths: [],
        improvements: [
          "Study model answers to understand task requirements",
          "Practice identifying main features in data",
          "Learn to write basic overview statements",
          "Focus on understanding what each task type requires",
        ],
      },
      2: {
        description:
          "Barely responds to the task or misinterprets the task completely.",
        strengths: [],
        improvements: [
          "Learn basic task requirements with teacher support",
          "Practice with very simple charts and graphs",
          "Study how to interpret visual data",
          "Work on basic description skills",
        ],
      },
    },
    taskResponse: {
      // Task 2
      9: {
        description:
          "Fully addresses all parts of the task. Presents a fully developed position in answer to the question with relevant, fully extended and well supported ideas.",
        strengths: [
          "All parts of task thoroughly addressed",
          "Clear, well-developed position throughout",
          "Ideas fully extended with strong support",
          "Excellent use of examples and evidence",
        ],
        improvements: [],
      },
      8: {
        description:
          "Sufficiently addresses all parts of the task. Presents a well-developed response to the question with relevant, extended and supported ideas.",
        strengths: [
          "All parts well addressed",
          "Clear position maintained",
          "Ideas well developed and supported",
          "Good use of examples",
        ],
        improvements: [
          "Ensure all ideas are fully extended",
          "Provide even more specific support for arguments",
        ],
      },
      7: {
        description:
          "Addresses all parts of the task. Presents a clear position throughout the response. Presents, extends and supports main ideas, but there may be a tendency to over-generalise and/or supporting ideas may lack focus.",
        strengths: [
          "All parts addressed",
          "Clear position maintained",
          "Main ideas presented and extended",
        ],
        improvements: [
          "Avoid over-generalizing - be more specific",
          "Ensure supporting ideas directly relate to main point",
          "Develop ideas more fully with concrete examples",
          "Balance attention to all parts of the question",
        ],
      },
      6: {
        description:
          "Addresses all parts of the task although some parts may be more fully covered than others. Presents a relevant position although the conclusions may become unclear or repetitive. Presents relevant main ideas but some may be inadequately developed/unclear.",
        strengths: [
          "All parts addressed",
          "Position stated",
          "Main ideas present",
        ],
        improvements: [
          "Develop all parts of task equally",
          "Ensure conclusion clearly follows from discussion",
          "Develop each main idea more thoroughly",
          "Use specific examples to support ideas",
        ],
      },
      5: {
        description:
          "Addresses the task only partially. Expresses a position but the development is not always clear. Presents some main ideas but these are limited and not sufficiently developed.",
        strengths: [
          "Attempts to address task",
          "Some position expressed",
          "Some main ideas present",
        ],
        improvements: [
          "Address all parts of the question",
          "State your position clearly in introduction",
          "Develop each main idea in a separate paragraph",
          "Add supporting details and examples to ideas",
        ],
      },
      4: {
        description:
          "Responds to the task only minimally or the answer is tangential. The format may be inappropriate. The position is unclear. Presents some main ideas but these are difficult to identify and may be repetitive, irrelevant or not well supported.",
        strengths: [
          "Makes an attempt to respond",
        ],
        improvements: [
          "Make sure you understand the question fully",
          "State a clear position on the topic",
          "Plan 2-3 main ideas before writing",
          "Stay focused on the question throughout",
        ],
      },
      3: {
        description:
          "Does not adequately address the task. Does not express a clear position. Presents few ideas, which are largely undeveloped or irrelevant.",
        strengths: [],
        improvements: [
          "Study model essays to understand requirements",
          "Practice planning responses before writing",
          "Learn to generate relevant ideas for topics",
          "Work on developing one idea per paragraph",
        ],
      },
      2: {
        description:
          "Barely responds to the task. Does not express a position. May attempt to present one or two ideas but there is no development.",
        strengths: [],
        improvements: [
          "Get help understanding essay task requirements",
          "Practice with simple topics first",
          "Learn basic essay structure",
          "Work with a teacher to develop writing skills",
        ],
      },
    },
    coherenceAndCohesion: {
      9: {
        description:
          "Uses cohesion in such a way that it attracts no attention. Skilfully manages paragraphing.",
        strengths: [
          "Seamless, natural cohesion",
          "Perfect paragraphing",
          "Effortless logical flow",
          "Sophisticated use of cohesive devices",
        ],
        improvements: [],
      },
      8: {
        description:
          "Sequences information and ideas logically. Manages all aspects of cohesion well. Uses paragraphing sufficiently and appropriately.",
        strengths: [
          "Logical organization throughout",
          "Effective cohesive devices",
          "Appropriate paragraphing",
          "Clear progression of ideas",
        ],
        improvements: [
          "Ensure cohesive devices are completely natural",
          "Fine-tune transitions between ideas",
        ],
      },
      7: {
        description:
          "Logically organises information and ideas. There is clear progression throughout. Uses a range of cohesive devices appropriately although there may be some under-/over-use. Presents a clear central topic within each paragraph.",
        strengths: [
          "Logical organization",
          "Clear progression",
          "Good use of cohesive devices",
          "Clear topic in each paragraph",
        ],
        improvements: [
          "Avoid overusing certain linking words",
          "Ensure all references are clear",
          "Vary cohesive devices more naturally",
        ],
      },
      6: {
        description:
          "Arranges information and ideas coherently. There is a clear overall progression. Uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical. May not always use referencing clearly or appropriately. Uses paragraphing, but not always logically.",
        strengths: [
          "Overall coherent organization",
          "Uses cohesive devices",
          "Paragraphing present",
        ],
        improvements: [
          "Improve cohesion within and between sentences",
          "Use pronouns and references more clearly",
          "Ensure paragraphing follows logical divisions",
          "Make linking between ideas smoother",
        ],
      },
      5: {
        description:
          "Presents information with some organisation but there may be a lack of overall progression. Makes inadequate, inaccurate or over-use of cohesive devices. May be repetitive because of lack of referencing and substitution. May not write in paragraphs, or paragraphing may be inadequate.",
        strengths: [
          "Some organization present",
          "Attempts to use cohesive devices",
        ],
        improvements: [
          "Learn to organize ideas logically",
          "Use linking words correctly, not excessively",
          "Practice using pronouns to avoid repetition",
          "Learn proper paragraph structure and when to start new paragraphs",
        ],
      },
      4: {
        description:
          "Presents information and ideas but these are not arranged coherently. There is no clear progression. Uses some basic cohesive devices but these may be inaccurate or repetitive. May not write in paragraphs or use them inadequately.",
        strengths: [
          "Some basic organization attempted",
        ],
        improvements: [
          "Learn basic text organization principles",
          "Practice using simple linking words correctly",
          "Learn when and how to paragraph",
          "Focus on connecting sentences logically",
        ],
      },
      3: {
        description:
          "Does not organise ideas logically. May use a very limited range of cohesive devices, and those used may not indicate a logical relationship between ideas.",
        strengths: [],
        improvements: [
          "Learn basic organization structures",
          "Practice using simple connectors (and, but, because, so)",
          "Study model texts to see how ideas are organized",
          "Work on writing in clear paragraphs",
        ],
      },
      2: {
        description:
          "Has very little control of organisational features.",
        strengths: [],
        improvements: [
          "Learn basic essay/report structure",
          "Practice organizing simple ideas in sequence",
          "Study how sentences connect in simple texts",
          "Work with teacher on fundamental organization skills",
        ],
      },
    },
    lexicalResource: {
      9: {
        description:
          "Uses a wide range of vocabulary with very natural and sophisticated control of lexical features. Rare minor errors occur only as 'slips'.",
        strengths: [
          "Sophisticated vocabulary throughout",
          "Natural and precise word choice",
          "Excellent collocation",
          "Virtually error-free",
        ],
        improvements: [],
      },
      8: {
        description:
          "Uses a wide range of vocabulary fluently and flexibly to convey precise meanings. Skilfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation. Produces rare errors in spelling and/or word formation.",
        strengths: [
          "Wide, flexible vocabulary",
          "Skillful use of uncommon words",
          "Precise meanings conveyed",
          "Very few errors",
        ],
        improvements: [
          "Check collocation accuracy for less common words",
          "Eliminate remaining minor spelling errors",
        ],
      },
      7: {
        description:
          "Uses a sufficient range of vocabulary to allow some flexibility and precision. Uses less common lexical items with some awareness of style and collocation. May produce occasional errors in word choice, spelling and/or word formation.",
        strengths: [
          "Good vocabulary range",
          "Uses less common vocabulary appropriately",
          "Generally precise word choice",
        ],
        improvements: [
          "Expand range of less common vocabulary",
          "Improve collocation accuracy",
          "Check spelling of academic/formal words",
          "Reduce errors in word formation (prefixes, suffixes)",
        ],
      },
      6: {
        description:
          "Uses an adequate range of vocabulary for the task. Attempts to use less common vocabulary but with some inaccuracy. Makes some errors in spelling and/or word formation, but they do not impede communication.",
        strengths: [
          "Adequate vocabulary for task",
          "Attempts less common words",
          "Errors don't prevent understanding",
        ],
        improvements: [
          "Learn topic-specific vocabulary",
          "Study common collocations",
          "Improve spelling accuracy",
          "Practice word formation (nouns, adjectives, adverbs from root words)",
        ],
      },
      5: {
        description:
          "Uses a limited range of vocabulary, but this is minimally adequate for the task. May make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader.",
        strengths: [
          "Basic vocabulary adequate for simple ideas",
          "Can express basic meanings",
        ],
        improvements: [
          "Build vocabulary systematically for common topics",
          "Learn words in context, not isolation",
          "Practice spelling of commonly used words",
          "Work on using words accurately in sentences",
        ],
      },
      4: {
        description:
          "Uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task. Has limited control of word formation and/or spelling. Errors may cause strain for the reader.",
        strengths: [
          "Can use some basic words",
        ],
        improvements: [
          "Learn essential vocabulary for common topics",
          "Avoid repeating the same words - learn synonyms",
          "Practice spelling basic words correctly",
          "Focus on appropriate word choice for academic writing",
        ],
      },
      3: {
        description:
          "Uses only a very limited range of words and expressions with very limited control of word formation and/or spelling. Errors may severely distort the message.",
        strengths: [],
        improvements: [
          "Build fundamental vocabulary",
          "Learn to spell common everyday words",
          "Practice using new words in simple sentences",
          "Work with a teacher to expand vocabulary systematically",
        ],
      },
      2: {
        description:
          "Uses an extremely limited range of vocabulary. Essentially no control of word formation and/or spelling.",
        strengths: [],
        improvements: [
          "Start with the most basic English vocabulary",
          "Use picture dictionaries to learn words",
          "Practice writing simple words correctly",
          "Get intensive instruction in vocabulary building",
        ],
      },
    },
    grammaticalRangeAndAccuracy: {
      9: {
        description:
          "Uses a wide range of structures with full flexibility and accuracy. Rare minor errors occur only as 'slips'.",
        strengths: [
          "Complete range of structures",
          "Perfect control and flexibility",
          "Virtually error-free",
          "Natural, sophisticated grammar",
        ],
        improvements: [],
      },
      8: {
        description:
          "Uses a wide range of structures. The majority of sentences are error-free. Makes only very occasional errors or inappropriacies.",
        strengths: [
          "Wide range of structures",
          "Most sentences error-free",
          "Errors very rare",
          "Good control of complex grammar",
        ],
        improvements: [
          "Eliminate remaining occasional errors",
          "Ensure perfect accuracy with articles and prepositions",
        ],
      },
      7: {
        description:
          "Uses a variety of complex structures. Produces frequent error-free sentences. Has good control of grammar and punctuation but may make a few errors.",
        strengths: [
          "Variety of complex structures",
          "Many error-free sentences",
          "Good grammar control",
        ],
        improvements: [
          "Increase accuracy with complex sentences",
          "Work on consistent article usage",
          "Check punctuation in complex sentences",
          "Reduce frequency of errors",
        ],
      },
      6: {
        description:
          "Uses a mix of simple and complex sentence forms. Makes some errors in grammar and punctuation but they rarely reduce communication.",
        strengths: [
          "Mix of sentence types",
          "Simple sentences mostly correct",
          "Errors don't usually impede meaning",
        ],
        improvements: [
          "Increase use of complex sentences accurately",
          "Work on subject-verb agreement",
          "Improve article usage (a, an, the)",
          "Practice correct punctuation in compound/complex sentences",
        ],
      },
      5: {
        description:
          "Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate than simple sentences. May make frequent grammatical errors and punctuation may be faulty. Errors can cause some difficulty for the reader.",
        strengths: [
          "Can write simple sentences",
          "Attempts complex structures",
        ],
        improvements: [
          "Master simple sentence structures first",
          "Practice common complex patterns (if-clauses, relative clauses)",
          "Focus on verb tenses accuracy",
          "Learn basic punctuation rules (commas, full stops)",
        ],
      },
      4: {
        description:
          "Uses only a very limited range of structures with only rare use of subordinate clauses. Some structures are accurate but errors predominate, and punctuation is often faulty.",
        strengths: [
          "Some simple structures correct",
        ],
        improvements: [
          "Focus on basic sentence patterns",
          "Practice present and past simple tenses",
          "Learn when to use capital letters and full stops",
          "Work on subject-verb-object word order",
        ],
      },
      3: {
        description:
          "Attempts sentence forms but errors in grammar and punctuation predominate and distort the meaning.",
        strengths: [],
        improvements: [
          "Learn basic English sentence structure",
          "Practice writing simple correct sentences",
          "Study fundamental grammar rules",
          "Work with a teacher on grammar basics",
        ],
      },
      2: {
        description:
          "Cannot use sentence forms except in memorised phrases.",
        strengths: [],
        improvements: [
          "Begin with fundamental grammar instruction",
          "Learn to form basic simple sentences",
          "Practice basic sentence patterns with teacher support",
          "Focus on subject-verb structure first",
        ],
      },
    },
  },
};

export default criteriaFeedback;
