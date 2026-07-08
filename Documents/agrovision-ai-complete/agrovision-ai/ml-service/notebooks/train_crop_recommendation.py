"""
AgroVision AI — XGBoost Crop Recommendation Model Training
Trains on soil + climate data to recommend optimal crops
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, classification_report
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
import xgboost as xgb
import joblib
import os

# ─── Synthetic dataset (replace with real ICAR/IMD data) ────────────────────
np.random.seed(42)
N = 10000

CROPS = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Soybean', 'Sugarcane',
         'Tomato', 'Potato', 'Onion', 'Groundnut', 'Pigeon Pea', 'Jowar']

def generate_crop_data(n):
    data = []
    for _ in range(n):
        rainfall = np.random.uniform(300, 2000)
        temp = np.random.uniform(15, 42)
        humidity = np.random.uniform(30, 95)
        ph = np.random.uniform(4.5, 8.5)
        soil = np.random.randint(0, 7)
        water = np.random.randint(0, 4)
        season = np.random.randint(0, 4)
        nitrogen = np.random.uniform(10, 80)

        # Rule-based label assignment
        if rainfall > 1200 and temp > 25 and humidity > 70:
            crop = 'Rice'
        elif rainfall < 500 and temp > 25 and soil in [0, 3]:
            crop = 'Jowar'
        elif soil == 1 and temp > 28 and season == 0:
            crop = 'Soybean'
        elif temp > 30 and water >= 3:
            crop = 'Sugarcane'
        elif rainfall > 700 and soil == 2 and temp > 25:
            crop = 'Maize'
        elif temp < 25 and rainfall > 500 and season == 1:
            crop = 'Wheat'
        elif ph > 7 and rainfall > 600:
            crop = 'Cotton'
        else:
            crop = np.random.choice(CROPS)

        data.append([rainfall, temp, humidity, ph, soil, water, season, nitrogen, crop])

    return pd.DataFrame(data, columns=['rainfall', 'temperature', 'humidity', 'ph',
                                        'soil_type', 'water_availability', 'season',
                                        'nitrogen', 'crop'])

print("Generating training dataset...")
df = generate_crop_data(N)
print(f"Dataset shape: {df.shape}")
print(f"Crop distribution:\n{df['crop'].value_counts()}")

# ─── Feature Engineering ─────────────────────────────────────────────────────
df['rainfall_temp_ratio'] = df['rainfall'] / (df['temperature'] + 1)
df['humidity_ph_product'] = df['humidity'] * df['ph']
df['water_soil_score'] = df['water_availability'] * df['soil_type']
df['nitrogen_normalized'] = df['nitrogen'] / 80.0

FEATURES = ['rainfall', 'temperature', 'humidity', 'ph', 'soil_type',
            'water_availability', 'season', 'nitrogen',
            'rainfall_temp_ratio', 'humidity_ph_product', 'water_soil_score']

le = LabelEncoder()
df['crop_label'] = le.fit_transform(df['crop'])

X = df[FEATURES].values
y = df['crop_label'].values

# ─── Train/Test Split ─────────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"\nTraining: {X_train.shape}, Test: {X_test.shape}")

# ─── XGBoost Model ───────────────────────────────────────────────────────────
print("\nTraining XGBoost model...")
xgb_model = xgb.XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    use_label_encoder=False,
    eval_metric='mlogloss',
    random_state=42,
    n_jobs=-1,
)
xgb_model.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=50)

# ─── Random Forest ────────────────────────────────────────────────────────────
print("\nTraining Random Forest model...")
rf_model = RandomForestClassifier(n_estimators=200, max_depth=12, random_state=42, n_jobs=-1)
rf_model.fit(X_train, y_train)

# ─── Ensemble ─────────────────────────────────────────────────────────────────
ensemble = VotingClassifier([('xgb', xgb_model), ('rf', rf_model)], voting='soft')
ensemble.fit(X_train, y_train)

# ─── Evaluation ───────────────────────────────────────────────────────────────
for name, model in [('XGBoost', xgb_model), ('Random Forest', rf_model), ('Ensemble', ensemble)]:
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"\n{name} Accuracy: {acc:.4f} ({acc*100:.2f}%)")

print("\nEnsemble Classification Report:")
print(classification_report(y_test, ensemble.predict(X_test), target_names=le.classes_))

# ─── Save Models ─────────────────────────────────────────────────────────────
os.makedirs('./models', exist_ok=True)
joblib.dump(ensemble, './models/xgboost_recommend.pkl')
joblib.dump(le, './models/crop_label_encoder.pkl')
print("\n✅ Models saved to ./models/")

# ─── Feature Importance ──────────────────────────────────────────────────────
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

feat_imp = pd.Series(xgb_model.feature_importances_, index=FEATURES).sort_values(ascending=False)
plt.figure(figsize=(10, 6))
feat_imp.plot(kind='bar', color='#22c55e', edgecolor='#16a34a')
plt.title('XGBoost Feature Importance — Crop Recommendation')
plt.tight_layout()
plt.savefig('./docs/feature_importance.png', dpi=150)
print("Feature importance chart saved.")
