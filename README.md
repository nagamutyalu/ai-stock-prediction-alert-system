**📈AI Stock Prediction & Alert System:**

An end-to-end AI-powered web application that predicts stock prices using machine learning and shows buy/sell/hold signals with visualizations on a React dashboard. The backend is built with FastAPI, the ML model is trained in Python (scikit-learn), and the frontend is built using React + Tailwind CSS.

**Project Overview:**

This project aims to:

->Forecast short-term stock prices using historical market data.

->Compare classical, ML, and deep-learning models.

->Detect volatility, anomalies, and risky trade conditions.

->Notify users about significant price movements through alerts.

->Provide an easy-to-use web dashboard for visualization and interaction.

**Features:**

📊 Stock price prediction using trained ML model

🤖 ML model training with historical stock data (CSV)

🚦 Trading signal generation: Buy / Sell / Hold

🌐 REST API using FastAPI

📈 Interactive frontend dashboard (charts + stats)

🔔 Signal alerts UI component

📦 Pre-trained model loading (model.pkl)

**Tech Stack:**


Backend (AI + API):

Python

FastAPI

Pandas, NumPy

Scikit-learn

Joblib

Frontend:


React

Tailwind CSS

Charting (PriceChart component)

**Project Structure:**

```text
ai-stock-prediction-alert-system/
├── backend/
│   ├── api.py              # FastAPI server (prediction API)
│   ├── model.py            # ML model definition
│   ├── trainmodel.py       # Training script (saves model.pkl)
│   ├── aapl.csv            # Sample stock dataset
│   ├── model.pkl           # Trained ML model
│   └── model/              # Model directory
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── dashboard/
│   │   │       ├── Dashboard.js
│   │   │       ├── Header.js
│   │   │       ├── PredictionForm.js
│   │   │       ├── PriceChart.js
│   │   │       ├── SignalAlert.js
│   │   │       └── StatCard.js
│   │   └── index.js
│   └── package.json
│
├── requirements.txt
├── LICENSE
└── .gitignore
```

**How It Works (Architecture):**

CSV Data → trainmodel.py → model.pkl  
model.pkl → api.py (FastAPI) → JSON Prediction  
Frontend (React) → calls API → Displays price & signal

**ML Model Details:**

Algorithm: Regression model (scikit-learn)

Input: Historical stock prices (CSV)

Output:Predicted next price

Trading signal:
  
  BUY → if price is expected to rise

  
  SELL → if price is expected to fall
  
  HOLD → if movement is small

**Contributing:**


Pull requests are welcome!

Feel free to open issues for:

  Bugs

 UI improvements
 
 New ML models
 
 API enhancements

**Conclusion:**

This project demonstrates an end-to-end AI stock prediction and alert system by integrating a machine learning model with a FastAPI backend and a React frontend dashboard. It provides predicted prices and simple Buy/Sell/Hold signals, helping users understand how ML models can be deployed in real-world web applications. The system serves as a solid foundation that can be extended with real-time data and more advanced models in the future.

**⚠️ Disclaimer:**

This project is for learning and demo purposes only. It is not financial advice.
