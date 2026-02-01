
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({ title, value, change, signal, icon, className = "" }) => {
  const getSignalStyles = () => {
    if (!signal) return "";
    if (signal === "BUY") return "border-l-4 border-green-500";
    if (signal === "SELL") return "border-l-4 border-red-500";
    if (signal === "HOLD") return "border-l-4 border-yellow-500";
    return "";
  };

  const getSignalIcon = () => {
    if (!signal) return null;
    if (signal === "BUY") return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (signal === "SELL") return <TrendingDown className="w-5 h-5 text-red-400" />;
    if (signal === "HOLD") return <Minus className="w-5 h-5 text-yellow-400" />;
    return null;
  };

  const getChangeColor = () => {
    if (typeof change !== "number") return "text-slate-400";
    if (change > 0) return "text-green-400";
    if (change < 0) return "text-red-400";
    return "text-slate-400";
  };

  return (
    <div
      className={`bg-slate-800/70 backdrop-blur rounded-xl p-6 shadow-lg
        transition-all duration-300 hover:scale-[1.02]
        ${getSignalStyles()} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-400 font-medium">{title}</span>
        {icon || getSignalIcon()}
      </div>

      {/* Value */}
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold font-mono text-white">
          {typeof value === "number" && !isNaN(value)
            ? `$${value.toFixed(2)}`
            : value ?? "--"}
        </span>

        {typeof change === "number" && !isNaN(change) && (
          <span className={`text-sm font-mono flex items-center gap-1 ${getChangeColor()}`}>
            {change > 0 ? "+" : ""}
            {change.toFixed(2)}%
            {change > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : change < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : null}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;


 







