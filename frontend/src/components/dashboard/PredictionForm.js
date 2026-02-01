


import { useState } from "react";
import { TrendingUp } from "lucide-react";

const PredictionForm = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState({
    open: "",
    high: "",
    low: "",
    close: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onPredict({
      open: Number(formData.open),
      high: Number(formData.high),
      low: Number(formData.low),
      close: Number(formData.close),
    });
  };

  return (
    <div className="bg-slate-800/70 backdrop-blur rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        Stock Data Input
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "open", label: "Open Price" },
          { name: "high", label: "High Price" },
          { name: "low", label: "Low Price" },
          { name: "close", label: "Close Price" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm text-slate-300 mb-1">
              {field.label}
            </label>
            <input
              type="number"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-2 disabled:opacity-50"
        >
          <TrendingUp className="w-4 h-4" />
          {isLoading ? "Predicting..." : "Predict Price"}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;
