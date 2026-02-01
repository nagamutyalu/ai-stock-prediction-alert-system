

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/model.pkl")
scaler = joblib.load("model/scaler.pkl")

df = pd.read_csv("aapl.csv")
df = df.iloc[2:]
df["Close"] = pd.to_numeric(df["Close"])
df.dropna(inplace=True)

# 👇 NO volume from frontend
class StockInput(BaseModel):
    open: float
    high: float
    low: float
    close: float

@app.post("/predict")
def predict(data: StockInput):

    # ✅ FIX: provide default volume
    DEFAULT_VOLUME = df["Volume"].tail(10).mean()

    features = pd.DataFrame([{
        "Return": (data.close - data.open) / data.open,
        "MA_5": df["Close"].tail(5).mean(),
        "MA_10": df["Close"].tail(10).mean(),
        "Volatility": data.high - data.low,
        "Volume": DEFAULT_VOLUME   # 🔥 REQUIRED
    }])

    features_scaled = scaler.transform(features)
    predicted_price = model.predict(features_scaled)[0]

    if predicted_price > data.close * 1.01:
        signal = "BUY"
    elif predicted_price < data.close * 0.99:
        signal = "SELL"
    else:
        signal = "HOLD"

    return {
        "predicted_price": round(float(predicted_price), 2),
        "signal": signal
    }
