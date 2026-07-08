"""
AgroVision AI — LSTM Rain Prediction Model Training
Predicts 7-day rainfall probability using historical weather sequences
"""

import numpy as np
import pandas as pd
import os

# Generate synthetic IMD-style weather data (replace with real IMD CSV)
np.random.seed(42)
DAYS = 3650  # 10 years

dates = pd.date_range('2014-01-01', periods=DAYS, freq='D')
temps = 25 + 8 * np.sin(2 * np.pi * np.arange(DAYS) / 365) + np.random.normal(0, 2, DAYS)
humidity = 60 + 20 * np.sin(2 * np.pi * (np.arange(DAYS) - 60) / 365) + np.random.normal(0, 5, DAYS)
pressure = 1013 + 5 * np.sin(2 * np.pi * np.arange(DAYS) / 365) + np.random.normal(0, 2, DAYS)
rainfall = np.clip(
    30 * np.sin(2 * np.pi * (np.arange(DAYS) - 150) / 365) + np.random.exponential(5, DAYS),
    0, 100
)
rain_binary = (rainfall > 5).astype(float)

df = pd.DataFrame({'date': dates, 'temp': temps, 'humidity': humidity,
                   'pressure': pressure, 'rainfall': rainfall, 'will_rain': rain_binary})

print(f"Dataset: {df.shape}")
print(f"Rain days: {df['will_rain'].sum():.0f} ({df['will_rain'].mean()*100:.1f}%)")

# ─── Sequence creation ────────────────────────────────────────────────────────
SEQ_LEN = 30
FEATURES = ['temp', 'humidity', 'pressure']
TARGET = 'will_rain'

from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
scaled = scaler.fit_transform(df[FEATURES])

X, y = [], []
for i in range(SEQ_LEN, len(scaled)):
    X.append(scaled[i - SEQ_LEN:i])
    y.append(df[TARGET].iloc[i])

X, y = np.array(X), np.array(y)
split = int(len(X) * 0.8)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]
print(f"Train: {X_train.shape}, Test: {X_test.shape}")

# ─── Build LSTM Model ─────────────────────────────────────────────────────────
try:
    import tensorflow as tf
    from tensorflow import keras
    from tensorflow.keras import layers

    model = keras.Sequential([
        layers.Bidirectional(layers.LSTM(128, return_sequences=True), input_shape=(SEQ_LEN, len(FEATURES))),
        layers.Dropout(0.3),
        layers.LSTM(64, return_sequences=False),
        layers.Dropout(0.3),
        layers.Dense(32, activation='relu'),
        layers.Dense(1, activation='sigmoid'),
    ])

    model.compile(optimizer='adam', loss='binary_crossentropy',
                  metrics=['accuracy', tf.keras.metrics.AUC(name='auc')])
    model.summary()

    callbacks = [
        keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
        keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=3),
    ]

    history = model.fit(X_train, y_train, epochs=50, batch_size=64,
                        validation_data=(X_test, y_test), callbacks=callbacks, verbose=1)

    _, acc, auc = model.evaluate(X_test, y_test, verbose=0)
    print(f"\nTest Accuracy: {acc:.4f} ({acc*100:.2f}%)")
    print(f"AUC-ROC: {auc:.4f}")

    os.makedirs('./models', exist_ok=True)
    model.save('./models/lstm_rain.h5')
    import joblib
    joblib.dump(scaler, './models/weather_scaler.pkl')
    print("✅ LSTM model saved to ./models/lstm_rain.h5")

except ImportError:
    print("TensorFlow not installed. Install with: pip install tensorflow")
    print("Model architecture would be: BiLSTM(128) → Dropout → LSTM(64) → Dense(1, sigmoid)")
