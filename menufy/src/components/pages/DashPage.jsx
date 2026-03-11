import { useContext } from "react";
import {MenuContext} from "../../context/MenuContext";
import {Link } from "react-router-dom";
import { ToggleLeft } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"


const DashPage = () => {
  const {dishes,categories,toggleAvailability } = useContext(MenuContext)
  const total = dishes.length
  const agotados = dishes.filter(d => !d.available).length
  const disponibles = dishes.filter(d => d.available).length

  const chartData = categories
    .map(cat => ({
      name: cat,
      platillos: dishes.filter(d => d.category === cat).length
    }))
    .filter(item => item.platillos > 0)

  return (
    <div className="flex flex-col gap-6">

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-xl font-semibold text-white">Panel de administración</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gestiona el menú de tu restaurante</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#1c1c1f] border border-white/10 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total platillos</p>
          <p className="text-5xl font-semibold text-white mt-2">{total}</p>
        </div>
        <div className="bg-[#1c1c1f] border border-white/10 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Disponibles</p>
          <p className="text-5xl font-semibold text-green-400 mt-2">{disponibles}</p>
        </div>
        <div className="bg-[#1c1c1f] border border-white/10 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Agotados</p>
          <p className="text-5xl font-semibold text-red-400 mt-2">{agotados}</p>
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

      {chartData.length > 0 && (
  <div className="grid grid-cols-2 gap-3">

    <div className="bg-[#1c1c1f] border border-white/10 p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Platillos por categoría</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} barSize={12}>
          <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} width={20} />
          <Tooltip
            contentStyle={{ backgroundColor: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0 }}
            labelStyle={{ color: '#fff', fontSize: 11 }}
            itemStyle={{ color: '#A64D79' }}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="platillos">
            {chartData.map((_, index) => (
              <Cell key={index} fill="#7C3AED" fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-[#1c1c1f] border border-white/10 p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Platillos agotados</p>
      {agotados === 0 ? (
        <p className="text-sm text-gray-600">Todos los platillos están disponibles.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {dishes.filter(d => !d.available).slice(0, 8).map(dish => (
            <div key={dish.id} className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{dish.name}</p>
              <button
                onClick={() => toggleAvailability(dish.id)}
                className="text-xs text-[#A64D79] hover:text-white transition"
              >
             Activar
            </button>
            </div>
          ))}
        </div>
      )}
    </div>

  </div>
)}

    </div>
  )
}
export default DashPage