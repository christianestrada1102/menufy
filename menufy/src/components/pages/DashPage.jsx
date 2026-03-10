import { useContext } from "react";
import {MenuContext} from "../../context/MenuContext";
import {Link } from "react-router-dom";

const DashPage = () => {
  const {dishes,categories} = useContext(MenuContext)
  const total = dishes.length
  const agotados = dishes.filter(d => !d.available).length
  const disponibles = dishes.filter(d => d.available).length

  return (
    <div className="flex flex-col gap-6">

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-xl font-semibold text-white">Panel de administración</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gestiona el menú de tu restaurante</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#1c1c1f] border border-white/10 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total platillos</p>
          <p className="text-3xl font-semibold text-white mt-2">{total}</p>
        </div>
        <div className="bg-[#1c1c1f] border border-white/10 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Disponibles</p>
          <p className="text-3xl font-semibold text-green-400 mt-2">{disponibles}</p>
        </div>
        <div className="bg-[#1c1c1f] border border-white/10 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Agotados</p>
          <p className="text-3xl font-semibold text-red-400 mt-2">{agotados}</p>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Link to="/menu/new" className="bg-[#6A1E55] text-white text-sm px-4 py-2 hover:bg-[#A64D79] transition">
          + Nuevo platillo
        </Link>
        <Link to="/preview" className="border border-white/10 text-gray-400 text-sm px-4 py-2 hover:border-white/30 transition">
          Ver mi menú
        </Link>
      </div>

    </div>
  )
}
export default DashPage