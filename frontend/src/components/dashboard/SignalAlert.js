


import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const signalStyles = {
  BUY: {
    bg: "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500",
    text: "text-emerald-400",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.35)]",
    icon: TrendingUp,
    message: "Model predicts upward price movement",
  },
  SELL: {
    bg: "bg-gradient-to-r from-red-500/20 to-red-500/5",
    border: "border-red-500",
    text: "text-red-400",
    glow: "shadow-[0_0_25px_rgba(239,68,68,0.35)]",
    icon: TrendingDown,
    message: "Model predicts downward price movement",
  },
  HOLD: {
    bg: "bg-gradient-to-r from-yellow-400/20 to-yellow-400/5",
    border: "border-yellow-400",
    text: "text-yellow-300",
    glow: "shadow-[0_0_25px_rgba(250,204,21,0.35)]",
    icon: Minus,
    message: "Model predicts sideways movement",
  },
};

const SignalAlert = ({ signal }) => {
  if (!signal) return null;

  const style = signalStyles[signal];
  const Icon = style.icon;

  return (
    <div
      className={`
        ${style.bg}
        ${style.border}
        ${style.glow}
        border rounded-xl p-4
        flex items-center gap-4
        transition-all duration-300
      `}
    >
      <div
        className={`
          w-12 h-12 flex items-center justify-center
          rounded-lg bg-black/40 ${style.text}
        `}
      >
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <h3 className={`text-lg font-semibold ${style.text}`}>
          {signal} Signal
        </h3>
        <p className="text-sm text-slate-300">{style.message}</p>
      </div>
    </div>
  );
};

export default SignalAlert;
