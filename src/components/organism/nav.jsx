import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-[#111111] border-b border-white/10 px-6 py-4 flex gap-6">
  <Link to="/" className="text-sm text-gray-400 hover:text-white transition">Dashboard</Link>
  <Link to="/menu" className="text-sm text-gray-400 hover:text-white transition">Menú</Link>
  <Link to="/preview" className="text-sm text-gray-400 hover:text-white transition">Vista previa</Link>
</nav>
  )
}

export default Navbar