"use client"

import { useState } from "react"
import Button from "./components/Button"
import Difficulty from "./components/Difficulty"
import ScoreCard from "./components/ScoreCard"
import Snackbar from "./components/Snackbar"
import { useSnackbar } from "./hooks/useSnackbar"
import { MathProblem } from "./models/mathProblem"
import { Progress } from "./models/progress"
import { Response } from "./models/response"
import { SubmissionResponse } from "./models/submission"

export default function Home() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  )
  const [problem, setProblem] = useState<MathProblem | null>(null)
  const [submission, setSubmission] = useState<SubmissionResponse | null>(null)
  const [answer, setAnswer] = useState("")
  const [progress, setProgress] = useState<Progress>({
    score: 0,
    attempt: 0,
    correct_attempt: 0,
    no_of_problem: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
  })
  const [isGenerateLoading, setIsGenerateLoading] = useState(false)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const { message, type, visible, showSnackbar, hide } = useSnackbar()

  const clearForm = () => {
    setProblem(null)
    setSubmission(null)
    setAnswer("")
  }

  const generateProblem = async () => {
    clearForm()
    setIsGenerateLoading(true)

    await fetch("/api/math-problem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty }),
    })
      .then(async (res) => {
        const response: Response<MathProblem> = await res.json()

        if (!response.isSuccess) {
          showSnackbar(response.message, "error")
          return
        }

        setProblem(response.data)

        setProgress((prog) => ({
          ...prog,
          no_of_problem: {
            ...prog.no_of_problem,
            [difficulty]: prog.no_of_problem[difficulty] + 1,
          },
        }))

        showSnackbar("Problem generated successfully!", "success")
      })
      .catch((e) => {
        console.error(e)
        showSnackbar(e.message ?? e, "error")
      })
      .finally(() => setIsGenerateLoading(false))
  }

  const submitAnswer = async () => {
    if (!problem) return

    setIsSubmitLoading(true)

    const body = {
      session_id: problem.session_id,
      user_answer: Number(answer),
    }

    await fetch("/api/math-problem/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const response: Response<SubmissionResponse> = await res.json()

        if (!response.isSuccess) {
          showSnackbar(response.message, "error")
          return
        }

        setSubmission(response.data)

        const progressData: Progress = {
          ...progress,
          score: progress.score + response.data.score,
          attempt: progress.attempt + 1,
          correct_attempt: response.data.is_correct
            ? progress.correct_attempt + 1
            : progress.correct_attempt,
        }

        setProgress(progressData)
        showSnackbar("Answer submitted succesfully!", "success")
      })
      .catch((e) => {
        console.error(e)
        showSnackbar(e.message ?? e, "error")
      })
      .finally(() => setIsSubmitLoading(false))
  }

  return (
    <div className="min-h-screen bg-[url('/images/background.jpg')] bg-cover">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Math Problem Generator
        </h1>

        <ScoreCard progress={progress} />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Difficulty
            disabled={isGenerateLoading || isSubmitLoading}
            onClick={(difficulty) => setDifficulty(difficulty)}
          />
          <hr className="my-4" />
          <Button
            text={isGenerateLoading ? "Generating..." : "Generate New Problem"}
            bgColor="blue"
            disabled={isGenerateLoading || isSubmitLoading}
            onClick={generateProblem}
          />
        </div>

        {problem && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Problem:
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              {problem.problem_text}
            </p>

            <form onSubmit={submitAnswer} className="space-y-4">
              <div>
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Answer:
                </label>
                <input
                  type="number"
                  id="answer"
                  step="0.01"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Enter your answer"
                  required
                />
              </div>

              <Button
                text={isSubmitLoading ? "Submitting..." : "Submit Answer"}
                bgColor="green"
                disabled={!answer || isGenerateLoading || isSubmitLoading}
                onClick={submitAnswer}
              />
            </form>
          </div>
        )}

        {!isSubmitLoading && submission?.feedback_text && (
          <div
            className={`rounded-lg shadow-lg p-6 ${
              submission.is_correct
                ? "bg-green-50 border-2 border-green-200"
                : "bg-yellow-50 border-2 border-yellow-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {submission.is_correct ? "✅ Correct!" : "❌ Not quite right"}
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                +{submission.score} points
              </p>
            </div>
            <p className="text-gray-800 leading-relaxed">
              {submission.feedback_text}
            </p>
          </div>
        )}
      </main>

      <Snackbar message={message} type={type} show={visible} onClose={hide} />
    </div>
  )
}
