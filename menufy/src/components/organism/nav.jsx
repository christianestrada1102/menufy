import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex gap-6">
      <Link to="/">Dashboard</Link>
      <Link to="/menu">Menú</Link>
      <Link to="/preview">Vista previa</Link>
    </nav>
  )
}

export default Navbar