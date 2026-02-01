import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LassoCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score



df = pd.read_csv("aapl.csv")
df = df.iloc[2:].reset_index(drop=True)
cols = ['Open','High','Low','Close','Volume']
for c in cols:
    df[c] = pd.to_numeric(df[c], errors='coerce')
df.dropna(inplace=True)


df['Return'] = df['Close'].pct_change()
df['MA_5'] = df['Close'].rolling(5).mean()
df['MA_10'] = df['Close'].rolling(10).mean()
df['Volatility'] = df['High'] - df['Low']
df['Target'] = df['Close'].shift(-1)
df.dropna(inplace=True)


plt.figure(figsize=(8,6))
sns.heatmap(df[['Return','MA_5','MA_10','Volatility','Volume','Target']].corr(), annot=True, cmap='coolwarm')
plt.title("Correlation Heatmap")
plt.show()


sns.pairplot(df[['Return','MA_5','MA_10','Volatility','Volume','Target']], kind='scatter')
plt.suptitle("Pairplot: Features vs Target", y=1.02)
plt.show()

plt.figure(figsize=(12,4))
plt.plot(df['Volatility'], color='red')
plt.title("Volatility Over Time (High-Low)")
plt.xlabel("Time")
plt.ylabel("Volatility")
plt.grid(True)
plt.show()


# 4️⃣ Features & Target
X = df[['Return','MA_5','MA_10','Volatility','Volume']]
y = df['Target']


# 5️⃣ Train-Test Split
split = int(len(df) * 0.8)
X_train, X_test = X.iloc[:split], X.iloc[split:]
y_train, y_test = y.iloc[:split], y.iloc[split:]

# 6️⃣ Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


# 8️⃣ Predictions
y_train_pred = model.predict(X_train_scaled)
y_test_pred  = model.predict(X_test_scaled)

#random forst
rf = RandomForestRegressor(
    n_estimators=300,
    max_depth=12,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42
)

rf.fit(X_train, y_train)

y_train_rf = rf.predict(X_train)
y_test_rf  = rf.predict(X_test)

print("\n🔥 RANDOM FOREST RESULTS")
print("Train RMSE:", np.sqrt(mean_squared_error(y_train, y_train_rf)))
print("Test  RMSE:", np.sqrt(mean_squared_error(y_test, y_test_rf)))
print("Train R²:", r2_score(y_train, y_train_rf))
print("Test  R²:", r2_score(y_test, y_test_rf))

# 7️⃣ Train Lasso with Hyperparameter Tuning
alphas = np.logspace(-4, 0, 50)  # range of alpha values
model = LassoCV(alphas=alphas, max_iter=10000, cv=5)
model.fit(X_train_scaled, y_train)
print("Best alpha:", model.alpha_)


print("Train RMSE:", rmse_train)
print("Test  RMSE:", rmse_test)
print("Train R²:", train_r2)
print("Test  R²:", test_r2)

# 🔹 Graphs
plt.figure(figsize=(10,5))
plt.plot(y_test.values, label='Actual Price', color='blue')
plt.plot(y_test_pred, label='Predicted Price', color='red')
plt.title('Lasso Regression: Actual vs Predicted Stock Price')
plt.xlabel('Time')
plt.ylabel('Stock Price')
plt.legend()
plt.grid(True)
plt.show()

plt.figure(figsize=(6,6))
plt.scatter(y_test, y_test_pred, alpha=0.6)
plt.xlabel('Actual Price')
plt.ylabel('Predicted Price')
plt.title('Actual vs Predicted (Lasso)')
plt.grid(True)
plt.show()

current_price = df['Close'].iloc[-1]  # last actual closing price
latest_data = scaler.transform(X.iloc[[-1]])
predicted_price = model.predict(latest_data)[0]

print("Current Price:", current_price)
print("Predicted Next Day Price:", predicted_price)

# Decide signal
if predicted_price > current_price * 1.01:  # if predicted > current by 1%
    print("🔔 BUY ALERT")
elif predicted_price < current_price * 0.99:  # if predicted < current by 1%
    print("⚠️ SELL ALERT")
else:
    print("⏳ HOLD")


import joblib
joblib.dump(model, "model.pkl")
print("model.pkl saved successfully")