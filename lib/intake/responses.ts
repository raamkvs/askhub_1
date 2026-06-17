export interface IntakeResponse {
  questionId: string
  question: string
  answer: string
  answerText: string
}

type RawResponse = {
  questionId?: string
  question_id?: string
  question?: string
  answer?: string
  answerText?: string
  answer_text?: string
}

export function normalizeResponses(raw: unknown): IntakeResponse[] {
  if (!raw) return []

  let parsed: unknown = raw
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw)
    } catch {
      return []
    }
  }

  if (!Array.isArray(parsed)) {
    if (typeof parsed === "object" && parsed !== null) {
      parsed = Object.values(parsed)
    } else {
      return []
    }
  }

  return (parsed as RawResponse[])
    .map((item) => ({
      questionId: item.questionId ?? item.question_id ?? "",
      question: item.question ?? "",
      answer: item.answer ?? item.answerText ?? item.answer_text ?? "",
      answerText: item.answerText ?? item.answer_text ?? item.answer ?? "",
    }))
    .filter((item) => item.questionId.length > 0)
}

export function getResponseValue(
  responses: IntakeResponse[],
  questionId: string,
): string | undefined {
  const match = responses.find((r) => r.questionId === questionId)
  if (!match) return undefined
  const value = match.answer?.trim() || match.answerText?.trim()
  return value || undefined
}
