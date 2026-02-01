
const Header = ({ modelActive }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-emerald-400">
          StockPredict AI
        </h1>
        <p className="text-slate-400">
          ML-Powered Price Forecasting
        </p>
      </div>

      {/* Model Active Badge */}
      {modelActive && (
        <div className="
          flex items-center gap-2
          px-4 py-1 rounded-full
          bg-emerald-500/10
          border border-emerald-500
          text-emerald-400 text-sm
          animate-pulse
        ">
          ⚡ Model Active
        </div>
      )}
    </div>
  );
};

export default Header;

