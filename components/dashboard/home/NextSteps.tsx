type Props = {
  suggestion?: string;
  score?: number;
};

export const NextStepCard = ({ suggestion, score }: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 space-y-4">

      <h2 className="text-base font-medium">Suggested Next Step</h2>

      <p className="text-sm text-gray-600">
        Based on your performance, focus on this next.
      </p>

      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border">

        <div>
          <p className="font-medium text-sm">
            {suggestion || "Practice Fundamentals"}
          </p>

          <p className="text-xs text-gray-500">
            Score: {score ?? 0}%
          </p>
        </div>

        <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg">
          Start
        </button>
      </div>
    </div>
  );
};