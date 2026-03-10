export default function Navbar() {
  return (
    <nav className="border-b border-white/5 px-6 py-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <span className="text-sm font-medium text-white/80 tracking-tight">
          HouseML
        </span>
        <div className="flex gap-6 text-xs text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Model</a>
          <a href="https://github.com/minahilw1122-sketch" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </nav>
  )
}