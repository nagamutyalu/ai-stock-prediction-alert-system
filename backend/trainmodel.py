import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LassoCV

# Load data
df = pd.read_csv("aapl.csv")
df = df.iloc[2:].reset_index(drop=True)

cols = ['Open','High','Low','Close','Volume']
for c in cols:
    df[c] = pd.to_numeric(df[c], errors='coerce')

df.dropna(inplace=True)

# Feature engineering
df['Return'] = df['Close'].pct_change()
df['MA_5'] = df['Close'].rolling(5).mean()
df['MA_10'] = df['Close'].rolling(10).mean()
df['Volatility'] = df['High'] - df['Low']
df['Target'] = df['Close'].shift(-1)
df.dropna(inplace=True)

X = df[['Return','MA_5','MA_10','Volatility','Volume']]
y = df['Target']

# Train-test split
split = int(len(df)*0.8)
X_train, y_train = X.iloc[:split], y.iloc[:split]

# Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Train model
model = LassoCV(cv=5, max_iter=10000)
model.fit(X_train_scaled, y_train)

# Save model & scaler
joblib.dump(model, "model.pkl", compress=3)
joblib.dump(scaler, "scaler.pkl", compress=3)

print("✅ Model and scaler saved successfully")
