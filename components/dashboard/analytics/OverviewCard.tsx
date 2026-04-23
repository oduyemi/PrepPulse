type Props = {
    latest: any;
    attempts: number;
  };
  
  export const OverviewCard = ({ latest, attempts }: Props) => {
    const rawScore = latest?.fields?.score;
    const safeScore = Math.min(100, Math.max(0, Number(rawScore) || 0));
  
    const readiness = latest?.fields?.readiness_level || "--";
  
    const getColor = (score: number) => {
      if (score < 40) return "text-red-500";
      if (score < 70) return "text-yellow-500";
      return "text-green-600";
    };
  
    const getBg = (score: number) => {
      if (score < 40) return "bg-red-50";
      if (score < 70) return "bg-yellow-50";
      return "bg-green-50";
    };
  
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-4">
  
          <div className={`rounded-xl p-4 ${getBg(safeScore)}`}>
            <p className="text-xs text-gray-500">Latest Score</p>
            <h2 className={`mt-1 text-2xl font-bold ${getColor(safeScore)}`}>
              {rawScore != null ? `${safeScore}%` : "--"}
            </h2>
          </div>
  
          <div className="rounded-xl p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Attempts</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {attempts}
            </h2>
          </div>
  
          <div className="rounded-xl p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Readiness</p>
            <h2 className="mt-1 text-sm font-semibold text-gray-900">
              {readiness}
            </h2>
          </div>
  
        </div>
      </div>
    );
  };