export type ExamSource = {
  label: string
  url: string
  status: 'checked' | 'blocked' | 'missing'
  note: string
}

export type ExamQuestion = {
  id: string
  prompt: string
  choices: Array<string>
  answerIndex: number | null
  explanation?: string
}

export type Exam = {
  id: string
  title: string
  description: string
  status: 'ready' | 'source-needed'
  sources: Array<ExamSource>
  questions: Array<ExamQuestion>
}

export const exams: Array<Exam> = [
  {
    id: 'english-2007-regular',
    title: 'English Regular Ministerial Exam - Generation 2007',
    description:
      'Interactive exam mode for the regular English ministerial exam. The interface is ready, but the question and answer PDFs still need a reliable accessible source.',
    status: 'source-needed',
    sources: [
      {
        label: 'Awa2el 2024 supplementary English listing',
        url: 'https://www.awa2el.net/ar/file/%D8%A7%D9%84%D8%B5%D9%81-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A-%D8%AB%D8%A7%D9%86%D9%88%D9%8A/%D9%85%D9%88%D8%A7%D8%AF-%D9%85%D8%B4%D8%AA%D8%B1%D9%83%D8%A9-%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A/%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D8%A5%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A%D8%A9-%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A/%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA-%D9%88%D8%B2%D8%A7%D8%B1%D9%8A%D8%A9-%D8%B3%D8%A7%D8%A8%D9%82%D8%A9/%D8%AF%D9%88%D8%B1%D8%A9-13',
        status: 'blocked',
        note: 'Listing exists, but direct PDF download returned HTML outside the site session.',
      },
      {
        label: 'Awa2el English 2025 regular route',
        url: 'https://www.awa2el.net/ar/file/%D8%A7%D9%84%D8%B5%D9%81-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A-%D8%AB%D8%A7%D9%86%D9%88%D9%8A/%D9%85%D9%88%D8%A7%D8%AF-%D9%85%D8%B4%D8%AA%D8%B1%D9%83%D8%A9-%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A/%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D8%A5%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A%D8%A9-%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A/%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA-%D9%88%D8%B2%D8%A7%D8%B1%D9%8A%D8%A9-%D8%B3%D8%A7%D8%A8%D9%82%D8%A9/%D8%AF%D9%88%D8%B1%D8%A9-2025',
        status: 'missing',
        note: 'The searched English 2025 page currently returns a 404.',
      },
    ],
    questions: [],
  },
]

export function getExam(id?: string) {
  return exams.find((exam) => exam.id === id) ?? exams[0]
}
