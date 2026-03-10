export default function ResultCard({ result }) {
  return (
    <div className="mt-6 border border-white/[0.08] rounded-xl p-8 bg-white/[0.02]">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">
        Estimated Value
      </p>
      <h2 className="text-6xl font-semibold tracking-tight text-white mb-2">
        ${result.toLocaleString()}
      </h2>
      <div className="mt-6 pt-6 border-t border-white/5 flex gap-6">
        <div>
          <p className="text-xs text-gray-600 mb-1">Model</p>
          <p className="text-xs text-gray-400">Ridge Regression</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">R² Score</p>
          <p className="text-xs text-gray-400">0.8872</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Training Samples</p>
          <p className="text-xs text-gray-400">1,460 homes</p>
        </div>
      </div>
    </div>
  )
}