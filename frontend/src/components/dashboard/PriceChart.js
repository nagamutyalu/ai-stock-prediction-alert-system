

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PriceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800/70 backdrop-blur rounded-xl p-6 h-[420px] flex items-center justify-center text-slate-400">
        No data yet. Enter values to see prediction.
      </div>
    );
  }

  return (
    <div className="bg-slate-800/70 backdrop-blur rounded-xl p-6 h-[420px]">
      <h3 className="text-lg font-semibold mb-4">
        Actual vs Predicted Price
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#60a5fa"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="Actual Price"
          />

          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#34d399"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="Predicted Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
