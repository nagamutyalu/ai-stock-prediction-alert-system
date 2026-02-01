



import { useState } from "react";
import Header from "./Header";
import StatCard from "./StatCard";
import PriceChart from "./PriceChart";
import PredictionForm from "./PredictionForm";
import SignalAlert from "./SignalAlert";
import { toast } from "sonner";
import { DollarSign, Target, BarChart3 } from "lucide-react";

// API URL
const API_URL = "http://127.0.0.1:8000";

const Dashboard = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [modelActive, setModelActive] = useState(false); // 👈 NEW

  const handlePredict = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const prediction = await response.json();

      const finalResult = {
        current: Number(data.close),
        predicted: Number(prediction.predicted_price),
        signal: prediction.signal,
      };

      setResult(finalResult);
      setModelActive(true)
      setHistory((prev) => [
        ...prev,
        {
          index: prev.length + 1,
          actual: finalResult.current,
          predicted: finalResult.predicted,
        },
      ]);

      toast.success(`Signal: ${prediction.signal}`, {
        description: `Predicted price: $${finalResult.predicted.toFixed(2)}`,
      });
    } catch (error) {
      toast.error("Backend not reachable");
    } finally {
      setIsLoading(false);
    }
  };

  const priceChange =
    result && result.current
      ? ((result.predicted - result.current) / result.current) * 100
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header modelActive={modelActive} />


        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Latest Close"
            value={result ? result.current : "--"}
            icon={<DollarSign className="w-5 h-5 text-slate-300" />}
          />

          <StatCard
            title="Predicted Price"
            value={result ? result.predicted : "--"}
            change={priceChange}
            icon={<Target className="w-5 h-5 text-slate-300" />}
          />

          <StatCard
            title="Trading Signal"
            value={result ? result.signal : "--"}
            signal={result?.signal}
            icon={<BarChart3 className="w-5 h-5 text-slate-300" />}
          />
        </div>

        {/* Signal Alert */}
        {result && <SignalAlert signal={result.signal} />}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-2">
            <PriceChart data={history} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-400">
          <p>Powered by ML Model (FastAPI)</p>
          <p>Educational purpose only</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
