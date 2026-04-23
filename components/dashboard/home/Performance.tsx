type Props = {
  score: number;
  weakArea?: string;
};

export const PerformanceCard = ({ score = 0, weakArea = "N/A" }: Props) => {
  const safeScore = Math.min(100, Math.max(0, Number(score) || 0));

  const getColor = () => {
    if (safeScore < 40) return "text-red-500";
    if (safeScore < 70) return "text-yellow-500";
    return "text-green-600";
  };

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">

      <div className="flex justify-between">
        <h2 className="text-sm font-medium">Performance</h2>
        <span className={`font-semibold ${getColor()}`}>
          {safeScore}%
        </span>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500"
          style={{ width: `${safeScore}%` }}
        />
      </div>

      <div className="text-xs text-gray-500 flex justify-between border-t pt-3">
        <span>Weak area</span>
        <span className="text-red-500 font-medium">
          {weakArea}
        </span>
      </div>
    </div>
  );
}