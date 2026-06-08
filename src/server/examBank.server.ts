export type ExamSource = {
  label: string
  url: string
  note: string
}

export type ChoiceQuestion = {
  id: string
  type: 'choice'
  section: string
  prompt: string
  choices: Array<string>
  answerIndex: number
}

export type WrittenQuestion = {
  id: string
  type: 'written'
  section: string
  prompt: string
  points: number
  modelAnswer: string
}

export type ReadingSection = {
  title: string
  text: string
}

export type ExamQuestion = ChoiceQuestion | WrittenQuestion

export type Exam = {
  id: string
  title: string
  description: string
  duration: string
  sources: Array<ExamSource>
  readings: Array<ReadingSection>
  questions: Array<ExamQuestion>
}

const choiceQuestions: Array<ChoiceQuestion> = [
  {
    id: 'q1',
    type: 'choice',
    section: 'Question One',
    prompt: '.......... means knowing what is happening and following the developments.',
    choices: [
      'Creating a website to give information about what is happening',
      'Contributing to a website to know what is happening',
      'Finding out what is happening',
      'Monitoring what is happening',
    ],
    answerIndex: 3,
  },
  {
    id: 'q2',
    type: 'choice',
    section: 'Question One',
    prompt:
      'Many companies offer .......... which includes serving and maintaining files for one or more websites.',
    choices: ['web hosting', 'sat nav system', 'web-building program', 'World Wide Web'],
    answerIndex: 0,
  },
  {
    id: 'q3',
    type: 'choice',
    section: 'Question One',
    prompt:
      'The effects of .......... produced chemicals that are discharged into the environment are clear, mainly in industrial cities.',
    choices: ['artifice', 'artificially', 'artificialness', 'artificiality'],
    answerIndex: 1,
  },
  {
    id: 'q4',
    type: 'choice',
    section: 'Question One',
    prompt:
      'The captain was not willing to .......... taking his ship through the canals in such bad weather.',
    choices: ['risk', 'post', 'enrol', 'import'],
    answerIndex: 0,
  },
  {
    id: 'q5',
    type: 'choice',
    section: 'Question One',
    prompt:
      'Certain organisations have been set up to guide young people through the process of business ..........',
    choices: ['create', 'creative', 'creation', 'created'],
    answerIndex: 2,
  },
  {
    id: 'q6',
    type: 'choice',
    section: 'Question One',
    prompt: 'Rashed and Amer love to go camping in Wadi Rum and .......... themselves in nature.',
    choices: ['immerse', 'immersive', 'immersion', 'immersed'],
    answerIndex: 0,
  },
  {
    id: 'q7',
    type: 'choice',
    section: 'Question One',
    prompt: "The committee's .......... to hire a new director has been well-received.",
    choices: ['composition', 'recommendation', 'calculation', 'circulation'],
    answerIndex: 1,
  },
  {
    id: 'q8',
    type: 'choice',
    section: 'Question One',
    prompt:
      'The customers usually listen carefully to the .......... and try to assess the value of what is offered.',
    choices: ['work experience', 'medical trial', 'sales pitch', 'identity fraud'],
    answerIndex: 2,
  },
  {
    id: 'q9',
    type: 'choice',
    section: 'Question One',
    prompt:
      'Textbook writing can be a mentally and financially .......... activity for many people all over the world.',
    choices: ['reward', 'rewarded', 'rewardingly', 'rewarding'],
    answerIndex: 3,
  },
  {
    id: 'q10',
    type: 'choice',
    section: 'Question One',
    prompt:
      'Omar is fluent in several languages. He is able to .......... for us during conversations with foreigners.',
    choices: ['inherit', 'interpret', 'inoculate', 'intern'],
    answerIndex: 1,
  },
  {
    id: 'q11',
    type: 'choice',
    section: 'Question One',
    prompt:
      'The sun smiled down on us, making the day feel warm and inviting. The rhetorical device in the sentence above is ..........',
    choices: ['personification', 'simile', 'onomatopoeia', 'metaphor'],
    answerIndex: 0,
  },
  {
    id: 'q12',
    type: 'choice',
    section: 'Question One',
    prompt:
      'Scholars, engineers and traders in the Islamic world made ground-breaking advancements in many different areas. The underlined words mean ..........',
    choices: ['conventional', 'innovative', 'conscientious', 'sceptical'],
    answerIndex: 1,
  },
  {
    id: 'q13',
    type: 'choice',
    section: 'Question One',
    prompt:
      'The new entertainment center in my area became the first of its kind, and it is .......... my friends always practice their favourite sport.',
    choices: ['when', 'which', 'where', 'who'],
    answerIndex: 2,
  },
  {
    id: 'q14',
    type: 'choice',
    section: 'Question One',
    prompt:
      "Do you mind .......... learning a foreign language improves one's problem-solving skills?",
    choices: ['explain / where', 'explaining / who', 'explain / why', 'explaining / how'],
    answerIndex: 3,
  },
  {
    id: 'q15',
    type: 'choice',
    section: 'Question One',
    prompt:
      "It .......... that our bodies will be in danger of .......... if we don't have the right daily amount of water in hot weather.",
    choices: [
      'had proved / dehidration',
      'had been proved / dahydration',
      'has been proved / dehydration',
      'has proved / dihydration',
    ],
    answerIndex: 2,
  },
  {
    id: 'q16',
    type: 'choice',
    section: 'Question One',
    prompt: "Dr. Kareem isn't old enough to retire. If only he .......... older.",
    choices: ['would', 'were', 'had', 'is'],
    answerIndex: 1,
  },
  {
    id: 'q17',
    type: 'choice',
    section: 'Question One',
    prompt: 'I wish I .......... the swimming classes in the gym as I gained some weight.',
    choices: ["hadn't given up", 'gave up', "didn't give up", 'had given up'],
    answerIndex: 0,
  },
  {
    id: 'q18',
    type: 'choice',
    section: 'Question One',
    prompt:
      'Teachers get a huge feeling of annoyance .......... they know that their students .......... everything they explain.',
    choices: ['when / understood', 'unless / understand', 'if / understand', 'even if / would understand'],
    answerIndex: 1,
  },
  {
    id: 'q19',
    type: 'choice',
    section: 'Question One',
    prompt: 'I cannot decide between hiring an accountant who is keen or one who is ..........',
    choices: ['anthusiastic', 'enthosiastic', 'inthusiastic', 'enthusiastic'],
    answerIndex: 3,
  },
  {
    id: 'q20',
    type: 'choice',
    section: 'Question One',
    prompt:
      '"We are having a traditional dinner with our parents this evening." The correct reported sentence is ..........',
    choices: [
      'Muna said that they are having a traditional dinner with our parents that evening.',
      'Muna said that we were having a traditional dinner with their parents this evening.',
      'Muna said that they were having a traditional dinner with their parents that evening.',
      'Muna said that we are having a traditional dinner with their parents that evening.',
    ],
    answerIndex: 2,
  },
  {
    id: 'q21',
    type: 'choice',
    section: 'Question One',
    prompt: 'The sentence that indicates consequence is ..........',
    choices: [
      'The cause of the fire will be unknown due to the severe damage to the structure.',
      'Lights will go off automatically in my new house. In this way, we will save energy.',
      'He is amazed by how trees can live so long whereas people come and go.',
      "Although we were caught in a traffic jam, we didn't miss the start of the play.",
    ],
    answerIndex: 1,
  },
  {
    id: 'q22',
    type: 'choice',
    section: 'Question One',
    prompt:
      'The mathematics teacher has corrected our assignments carefully. The correct passive form is ..........',
    choices: [
      'Our assignments had been corrected carefully by the mathematics teacher.',
      'Our assignments have corrected carefully by the mathematics teacher.',
      'Our assignments had corrected carefully by the mathematics teacher.',
      'Our assignments have been corrected carefully by the mathematics teacher.',
    ],
    answerIndex: 3,
  },
  {
    id: 'q23',
    type: 'choice',
    section: 'Question One',
    prompt:
      'It is not necessary to press the button of the elevator more than once. The similar meaning is ..........',
    choices: [
      "You mustn't press the button of the elevator more than once.",
      "You shouldn't press the button of the elevator more than once.",
      "You don't have to press the button of the elevator more than once.",
      "You wouldn't press the button of the elevator more than once.",
    ],
    answerIndex: 2,
  },
  {
    id: 'q24',
    type: 'choice',
    section: 'Question One',
    prompt:
      'My children bought the needed equipment, and then they went on a picnic. The similar meaning is ..........',
    choices: [
      'Before my children bought the needed equipment, they went on a picnic.',
      'Before my children had gone on a picnic, they bought the needed equipment.',
      'Before my children bought the needed equipment, they had gone on a picnic.',
      'Before my children went on a picnic, they had bought the needed equipment.',
    ],
    answerIndex: 3,
  },
  {
    id: 'q25',
    type: 'choice',
    section: 'Question One',
    prompt:
      'The sentence which talks about an action that will be completed by a particular time in the future is ..........',
    choices: [
      'This time next month, Fatima will be preparing for her final exams at college.',
      'I have been typing my science project all night. That is why I feel exhausted this morning.',
      "We're too late! By the time we get to the city park, the festival events will have finished.",
      'By the time the bus arrived to the city park, we had been waiting for three hours with Dad.',
    ],
    answerIndex: 2,
  },
  {
    id: 'q26',
    type: 'choice',
    section: 'Question One',
    prompt:
      'The International Tourism Conference was held in Madrid in 2019 CE. The sentence which emphasises the event is ..........',
    choices: [
      'The place where the International Tourism Conference was held in 2019 was Madrid.',
      'The event that took place in Madrid in 2019 CE was the International Tourism Conference.',
      'The year when the International Tourism Conference was held in Madrid is 2019 CE.',
      'It was in 2019 CE that the International Tourism Conference was held in Madrid.',
    ],
    answerIndex: 1,
  },
  {
    id: 'q27',
    type: 'choice',
    section: 'Question One',
    prompt:
      "How will the 'Internet of Things' help you keep fit? The correct indirect question is ..........",
    choices: [
      "Could you explain how will the 'Internet of Things' help you keep fit?",
      "Could you explain how the 'Internet of Things' would help you keep fit?",
      "Could you explain how would the 'Internet of Things' help you keep fit?",
      "Could you explain how the 'Internet of Things' will help you keep fit?",
    ],
    answerIndex: 3,
  },
  {
    id: 'q28',
    type: 'choice',
    section: 'Question One',
    prompt:
      'Science fiction stories about talking animals are believed to be true. The correct active form is ..........',
    choices: [
      'People believe that science fiction stories about talking animals are true.',
      'People believed that science fiction stories about talking animals are true.',
      'People believe that science fiction stories about talking animals were true.',
      'People believed that science fiction stories about talking animals had been true.',
    ],
    answerIndex: 0,
  },
  {
    id: 'q29',
    type: 'choice',
    section: 'Question One',
    prompt:
      "Sawsan: I didn't know about the previous meeting with the staff. The correct regret sentence is ..........",
    choices: [
      'Sawsan wishes she had known about the previous meeting with the staff.',
      'Sawsan wishes she knows about the previous meeting with the staff.',
      'Sawsan wishes she knew about the previous meeting with the staff.',
      'Sawsan wishes she has known about the previous meeting with the staff.',
    ],
    answerIndex: 0,
  },
  {
    id: 'q30',
    type: 'choice',
    section: 'Question One',
    prompt:
      "Aya lost her sunglasses in the forest, so she wasn't able to enjoy the natural views there. The similar meaning is ..........",
    choices: [
      "If Aya hadn't lost her sunglasses in the forest, she couldn't have enjoyed the views there.",
      "If Aya had lost her sunglasses in the forest, she couldn't enjoy the views there.",
      'If Aya has lost her sunglasses in the forest, she could have enjoyed the views there.',
      "If Aya hadn't lost her sunglasses in the forest, she could have enjoyed the views there.",
    ],
    answerIndex: 3,
  },
]

const writtenQuestions: Array<WrittenQuestion> = [
  {
    id: 'q31',
    type: 'written',
    section: 'Question Two',
    prompt:
      'In addition to advances in education, write down three factors that contributed to the improvement of healthcare in Jordan.',
    points: 9,
    modelAnswer: 'Economic conditions, sanitation, clean water, diet and housing are accepted. Any three are enough.',
  },
  {
    id: 'q32',
    type: 'written',
    section: 'Question Two',
    prompt:
      'Write down two examples illustrating the effect of cautious planning of healthcare services in Jordan.',
    points: 6,
    modelAnswer:
      'More than 800 different kinds of healthcare centres have been built; 188 dental clinics have been built; in 2014 CE, 98% of Jordanian children were fully immunised.',
  },
  {
    id: 'q33',
    type: 'written',
    section: 'Question Two',
    prompt: 'Find a word in the text which means "death especially on a large scale".',
    points: 4,
    modelAnswer: 'mortality',
  },
  {
    id: 'q34',
    type: 'written',
    section: 'Question Two',
    prompt:
      "Write down the sentence that indicates Jordan's concern with developing both its healthcare and main medical facilities.",
    points: 5,
    modelAnswer:
      'Although the country has been focusing mainly on improving its primary healthcare facilities, it has not neglected its advanced medical facilities.',
  },
  {
    id: 'q35',
    type: 'written',
    section: 'Question Two',
    prompt: 'Suggest three possible positive economic effects of a successful healthcare system.',
    points: 6,
    modelAnswer:
      'Possible answers include attracting medical tourism, increasing productivity, reducing treatment costs, creating jobs in hospitals and clinics, and improving investment confidence.',
  },
  {
    id: 'q36',
    type: 'written',
    section: 'Question Three A',
    prompt: 'The text states two huge changes concerning school leavers in England. Write them down.',
    points: 6,
    modelAnswer:
      'The number of school leavers going on to higher education has increased, and higher education is no longer completely free because tuition fees have been introduced.',
  },
  {
    id: 'q37',
    type: 'written',
    section: 'Question Three A',
    prompt:
      'Mention two skills most students need to learn when living away from home for university.',
    points: 6,
    modelAnswer: 'They need to learn to cook, do their own washing, and manage their time and money. Any two are enough.',
  },
  {
    id: 'q38',
    type: 'written',
    section: 'Question Three A',
    prompt:
      'Write down the two main reasons that make most students choose to study away from home.',
    points: 4,
    modelAnswer:
      'They want to move to the university of their choice rather than the nearest one, and they want to live in a new culture.',
  },
  {
    id: 'q39',
    type: 'written',
    section: 'Question Three A',
    prompt: 'What do the words "Since then" in the first paragraph refer to?',
    points: 4,
    modelAnswer: 'They refer to 1998 CE.',
  },
  {
    id: 'q40',
    type: 'written',
    section: 'Question Three A',
    prompt:
      "Choosing the right country to study abroad isn't an easy decision for both students and their parents. Write your point of view in two meaningful sentences.",
    points: 4,
    modelAnswer:
      'A suitable answer should explain a clear opinion in two meaningful sentences. It may mention cost, safety, university quality, language, culture, or distance from family.',
  },
  {
    id: 'q41',
    type: 'written',
    section: 'Question Three B',
    prompt: 'How do we know that the elephant is not aggressive?',
    points: 2,
    modelAnswer: "The elephant still preserved its natural gentleness.",
  },
  {
    id: 'q42',
    type: 'written',
    section: 'Question Three B',
    prompt: 'The elephant was used for transport. Give two pieces of evidence from the text.',
    points: 4,
    modelAnswer:
      'The text says the elephant could travel rapidly for a long time, and Mr Fogg resolved to hire him in default of any other means of conveyance.',
  },
  {
    id: 'q43',
    type: 'written',
    section: 'Question Four',
    prompt:
      'Write a composition of about 120 words on one topic: fast food addiction among adults, or your future technology-connected house.',
    points: 20,
    modelAnswer:
      'This is a free-writing task. Check that the response is around 120 words, stays on one chosen topic, uses clear paragraphs, and answers all parts of the selected prompt.',
  },
]

export const exams: Array<Exam> = [
  {
    id: 'english-2007-regular',
    title: 'English Regular Ministerial Exam - Generation 2007',
    description:
      'The exam is built from the Watad PDFs supplied by the user. Multiple-choice items are scored automatically; written questions show a model answer for self-checking.',
    duration: '2 hours',
    sources: [
      {
        label: 'Question PDF',
        url: 'https://assets-watad-me.fra1.digitaloceanspaces.com/wp-content/uploads/2025/06/%D8%A7%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A-1.pdf',
        note: 'Scanned PDF rendered and extracted locally.',
      },
      {
        label: 'Answer PDF',
        url: 'https://assets-watad-me.fra1.digitaloceanspaces.com/wp-content/uploads/2025/06/%D8%A7%D8%AC%D8%A7%D8%A8%D8%A7%D8%AA-%D8%A7%D9%84%D8%A7%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A.pdf',
        note: 'Companion Watad answer scan used for checking.',
      },
    ],
    readings: [
      {
        title: 'Question Two Reading',
        text: `Health conditions in Jordan are among the best in the Middle East. This is largely due to the country's commitment to making healthcare for all a top priority. Advances in education, economic conditions, sanitation, clean water, diet and housing have made our community healthier.

As a result of careful planning, the number of healthcare services has been increasing rapidly over the past years. More than 800 different kinds of healthcare centres have been built, as well as 188 dental clinics. In 2014 CE, 98 per cent of Jordanian children were fully immunised, thanks to immunisation teams that had been working towards this goal for several years.

Although the country has been focusing mainly on improving its primary healthcare facilities, it has not neglected its advanced medical facilities. The reputation of Jordanian doctors has spread in the region, and now many more patients come to Jordan for open heart surgery. In Jordan, the open heart surgery programme started in 1970 CE in Amman.

According to UNICEF statistics, between 1981 CE and 1991 CE, Jordan's infant mortality rates declined more rapidly than anywhere else in the world - from 70 deaths per 1,000 births in 1981 CE to only 15 deaths per 1,000 births in 2017 CE.`,
      },
      {
        title: 'Question Three Reading',
        text: `In England, almost 50% of school leavers go on to higher education. The figure has not always been as high as this. Twenty years ago, it was closer to 30%, and thirty years before that, it was only about 5%. Another huge change has been financial. Before 1998 CE, higher education in the UK was completely free for UK citizens. Since then, tuition fees have been introduced. Most students borrow this money from the government. They don't have to repay it immediately. Instead, they pay it back slowly out of future earnings.

Despite the high cost, most students choose to study away from home. A recent survey of 17,000 students revealed that only 7% wanted to stay at home while they studied for their degree. Of course for most young people, living away from home means borrowing even more money from the government. So why don't students choose to avoid debt by staying at home, where they don't have to pay rent? Most of them say that they want to move to the university of their choice, rather than the nearest one. Another strong motive is the desire to live in a new culture. Where do these students live? Many have rooms in halls of residence, especially in their first year; others rent flats or houses. A lucky minority live in property that their parents have bought for them. Most of them need to learn to cook, do their own washing and manage their time and money.`,
      },
      {
        title: 'Literature Spot',
        text: `The elephant, which was reared, not to be an animal that merely carried things around, but for war like purposes, was half-domesticated. Happily, however, for Mr Fogg, the animal's instruction in this direction had not gone far, and the elephant still preserved its natural gentleness. Kiouni - this was the name of the elephant - could doubtless travel rapidly for a long time, and, in default of any other means of conveyance, Mr Fogg resolved to hire him.`,
      },
    ],
    questions: [...choiceQuestions, ...writtenQuestions],
  },
]

export function getExam(id?: string) {
  return exams.find((exam) => exam.id === id) ?? exams[0]
}
