import { useState } from "react"
import PredictForm from "./components/PredictForm"
import ResultCard from "./components/ResultCard"
import Navbar from "./components/Navbar"

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500 mb-3">
            ML Powered
          </p>
          <h1 className="text-5xl font-semibold tracking-tight mb-4">
            House Price Estimator
          </h1>
          <p className="text-gray-500 text-lg">
            Predict residential property values using a Ridge Regression model trained on 1,460 homes.
          </p>
        </div>
        <PredictForm setResult={setResult} setLoading={setLoading} />
        {loading && (
          <p className="text-gray-500 text-sm mt-6">Analyzing features...</p>
        )}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  )
}