import { useState } from "react"

const steps = [
  {
    title: "Basic Info",
    fields: [
      { name: "OverallQual", label: "Overall Quality", hint: "1 – 10" },
      { name: "OverallCond", label: "Overall Condition", hint: "1 – 10" },
      { name: "YearBuilt", label: "Year Built", hint: "e.g. 1995" },
      { name: "YearRemodAdd", label: "Year Remodeled", hint: "e.g. 2010" },
    ]
  },
  {
    title: "Size & Space",
    fields: [
      { name: "GrLivArea", label: "Living Area", hint: "sq ft" },
      { name: "LotArea", label: "Lot Area", hint: "sq ft" },
      { name: "TotalBsmtSF", label: "Total Basement Area", hint: "sq ft" },
      { name: "GarageArea", label: "Garage Area", hint: "sq ft" },
      { name: "GarageCars", label: "Garage Capacity", hint: "cars" },
    ]
  },
  {
    title: "Rooms & Features",
    fields: [
      { name: "FullBath", label: "Full Bathrooms", hint: "count" },
      { name: "HalfBath", label: "Half Bathrooms", hint: "count" },
      { name: "BedroomAbvGr", label: "Bedrooms", hint: "count" },
      { name: "TotRmsAbvGrd", label: "Total Rooms", hint: "count" },
      { name: "Fireplaces", label: "Fireplaces", hint: "count" },
      { name: "WoodDeckSF", label: "Wood Deck Area", hint: "sq ft" },
    ]
  }
]

export default function PredictForm({ setResult, setLoading }) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) })
  }

  const handleNext = (e) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const response = await fetch("http://127.0.0.1:8080/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: formData }),
      })
      const data = await response.json()
      setResult(data.predicted_price)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const currentStep = steps[step]
  const isLastStep = step === steps.length - 1

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-medium transition-colors ${
              i < step ? "bg-blue-600 text-white" :
              i === step ? "bg-blue-600 text-white" :
              "bg-white/10 text-gray-500"
            }`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`text-xs transition-colors ${
              i === step ? "text-white" : "text-gray-600"
            }`}>
              {s.title}
            </span>
            {i < steps.length - 1 && (
              <div className={`w-8 h-px mx-1 ${i < step ? "bg-blue-600" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={isLastStep ? handleSubmit : handleNext}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentStep.fields.map((field) => (
            <div key={field.name}>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider">
                  {field.label}
                </label>
                <span className="text-xs text-gray-600">{field.hint}</span>
              </div>
              <input
                type="number"
                name={field.name}
                onChange={handleChange}
                defaultValue={formData[field.name] || ""}
                required
                className="w-full bg-white/[0.03] border border-white/[0.08] text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 text-sm text-gray-400 border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-colors"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-3 rounded-lg transition-colors"
          >
            {isLastStep ? "Estimate Price" : "Next →"}
          </button>
        </div>
      </form>
    </div>
  )
}