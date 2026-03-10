import {useContext} from 'react'
import { MenuContext } from '../../context/MenuContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

const MenuPage = () => {
  const {dishes,deleteDish,toggleAvailability,addDish} = useContext(MenuContext)

  return (
    <div className="flex flex-col gap-6">

      <div className="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Mis platillos</h1>
          <p className="text-sm text-gray-500 mt-0.5">{dishes.length} platillos en tu menú</p>
        </div>
        <Link to="/menu/new" className="bg-[#6A1E55] text-white text-sm px-4 py-2 hover:bg-[#A64D79] transition">
          + Nuevo platillo
        </Link>
      </div>

      {dishes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-gray-500">No tienes platillos todavía.</p>
          <Link to="/menu/new" className="text-[#A64D79] text-sm mt-2 inline-block hover:underline">
            Agrega tu primer platillo
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {dishes.map(dish => (
            <div key={dish.id} className="bg-[#1c1c1f] border border-white/10 p-4 flex items-center gap-4">

              {dish.image ? (
                <img src={dish.image} alt={dish.name} className="w-14 h-14 object-cover" />
              ) : (
                <div className="w-14 h-14 bg-[#111113] flex items-center justify-center text-gray-600 text-xs">
                  Sin img
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm font-medium text-white">{dish.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{dish.category} · ${dish.price}</p>
              </div>

             <span className={`text-xs font-medium ${dish.available ? 'text-[#34d399]' : 'text-[#f87171]'}`}>
                {dish.available ? 'Disponible' : 'Agotado'}
            </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleAvailability(dish.id)}
                  className="p-2 text-gray-500 hover:text-white transition"
                  title={dish.available ? 'Agotar' : 'Activar'}
                >
                  {dish.available
                    ? <ToggleRight size={18} className="text-[#34d399]" />
                    : <ToggleLeft size={18} />
                  }
                </button>
                <Link
                  to={`/menu/edit/${dish.id}`}
                  className="p-2 text-gray-500 hover:text-white transition"
                  title="Editar"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => {
                    const deleted = dish
                    deleteDish(deleted.id)
                    toast(
                      (t) => (
                        <span className="flex items-center gap-3 text-sm">
                          <span><b>{deleted.name}</b> eliminado</span>
                          <button
                            onClick={() => {
                              addDish(deleted)
                              toast.dismiss(t.id)
                            }}
                            className="text-[#A64D79] font-medium hover:underline"
                          >
                            Deshacer
                          </button>
                        </span>
                      ),
                      { duration: 5000 }
                    )
                  }}
                  className="p-2 text-gray-500 hover:text-red-400 transition"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default MenuPage