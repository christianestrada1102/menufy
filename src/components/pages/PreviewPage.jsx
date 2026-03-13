import { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";

const PreviewPage = () => {
  const {dishes,categories} = useContext(MenuContext)
  const availableDishes = dishes.filter(d => d.available)
  const categoriesWithDishes = categories.filter(cat =>
    availableDishes.some(d => d.category === cat)
  )

  return (
    <div className="flex flex-col gap-10 max-w-3xl mx-auto">

      <div className="text-center pt-4">
        <img src="/menufffu.png" alt="MenuFy" className="h-24 mx-auto" />
        <p className="text-sm text-gray-500 mt-1">Descubre lo que tenemos para ti</p>
      </div>

      {availableDishes.length === 0 ? (
        <p className="text-center text-gray-600 py-16 text-sm">No hay platillos disponibles por el moento</p>
      ) : (
        categoriesWithDishes.map(cat => (
          <div key={cat} className="flex flex-col gap-4">

            <h2 className="text-xs text-[#A64D79] uppercase tracking-widest border-b border-white/10 pb-2">
              {cat}
            </h2>

            <div className="flex flex-col gap-3">
              {availableDishes
                .filter(d => d.category === cat)
                .map(dish => (
                  <div key={dish.id} className="flex items-center gap-4 bg-[#1c1c1f] border border-white/10 p-4">

                    {dish.image && (
                      <img src={dish.image} alt={dish.name} className="w-16 h-16 object-cover shrink-0" />
                    )}

                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{dish.name}</p>
                      {dish.description && (
                        <p className="text-xs text-gray-500 mt-0.5">{dish.description}</p>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-[#A64D79] shrink-0">${dish.price}</p>

                  </div>
                ))
              }
            </div>

          </div>
        ))
      )}

    </div>
  )
}

export default PreviewPage