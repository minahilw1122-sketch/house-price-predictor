# 🏠 House Price Predictor

A full-stack machine learning web app that predicts residential property prices using a Ridge Regression model trained on the Ames Housing dataset.

**Live Demo:** [House Price Predictor](https://house-price-predictor-two.vercel.app)

---

## Tech Stack

**ML & Backend**
- Python, scikit-learn, FastAPI, uvicorn
- Ridge Regression (R² = 0.8872)
- joblib for model serialization

**Frontend**
- React + Vite
- Tailwind CSS

**Deployment**
- Railway (backend)
- Vercel (frontend)

---

## How It Works

1. User fills out a 3-step form with house details
2. React frontend sends the data to the FastAPI backend
3. Backend loads the trained Ridge Regression model
4. Model predicts the price and returns it
5. Result is displayed on the frontend

---

## How To Run Locally

**Clone the repo**
```bash
git clone https://github.com/minahilw1122-sketch/house-price-predictor.git
cd house-price-predictor
```

**Run the backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8080
```

**Run the frontend**
```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173`

---

## Model Details

| Detail | Value |
|---|---|
| Algorithm | Ridge Regression |
| Dataset | Ames Housing (1,460 samples) |
| Features | 242 (after encoding) |
| R² Score | 0.8872 |
| RMSE | 0.1451 (log scale) |
| Best Alpha | 500 |

---

## Project Structure
```
house-price-predictor/
├── backend/
│   ├── main.py
│   ├── ridge_model.pkl
│   ├── scaler.pkl
│   ├── columns.pkl
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PredictForm.jsx
│   │   │   └── ResultCard.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── notebook/
    └── ML_MODEL.ipynb
```

---

## Author

**Minahil** — [@minahilw1122-sketch](https://github.com/minahilw1122-sketch)
