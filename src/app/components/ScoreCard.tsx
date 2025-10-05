import { Progress } from "../models/progress"

interface ScoreCardProps {
  progress: Progress
}

export default function ScoreCard({ progress }: ScoreCardProps) {
  const difficulties: { text: "easy" | "medium" | "hard"; bgColor: string }[] =
    [
      { text: "easy", bgColor: "green" },
      { text: "medium", bgColor: "yellow" },
      { text: "hard", bgColor: "red" },
    ]

  const setColor = (bgColor: string) => {
    switch (bgColor) {
      case "blue":
        return "bg-blue-600"

      case "yellow":
        return "bg-yellow-600"

      case "red":
        return "bg-red-600"

      case "green":
        return "bg-green-600"

      default:
        return "bg-blue-600"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Your Score: {progress.score}
      </h2>
      <div className="text-sm text-gray-700 space-y-3">
        <div className="flex flex-col items-start sm:flex-row sm:items-center">
          <strong className="mr-2 mb-2 sm:mb-0">No. of Problems:</strong>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <div
                key={difficulty.text}
                className={`${setColor(
                  difficulty.bgColor
                )} text-white px-3 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap`}
              >
                {difficulty.text}: {progress.no_of_problem[difficulty.text]}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>
            <strong>Total Attempts:</strong> {progress.attempt}
          </p>
          <p>
            <strong>Correct Answers:</strong> {progress.correct_attempt}
          </p>
          <p>
            <strong>Accuracy:</strong>{" "}
            {progress.attempt > 0
              ? ((progress.correct_attempt / progress.attempt) * 100).toFixed(2)
              : 0}
            %
          </p>
        </div>
      </div>
    </div>
  )
}
