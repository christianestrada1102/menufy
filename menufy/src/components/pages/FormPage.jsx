import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MenuContext } from "../../context/MenuContext"

const FormPage = () => {
  const { addDish, updateDish, categories, dishes } = useContext(MenuContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const dishToEdit = dishes.find(d => d.id === Number(id))

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true
  })

  useEffect(() => {
    if (dishToEdit) setForm(dishToEdit)
  }, [dishToEdit])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category) return
    if (dishToEdit) {
      updateDish(Number(id), form)
    } else {
      addDish(form)
    }
    navigate('/menu')
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-xl font-semibold text-white">
          {dishToEdit ? 'Editar platillo' : 'Nuevo platillo'}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Completa la información del platillo</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej. Tacos de pastor"
            className="bg-[#1c1c1f] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#A64D79]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe el platillo brevemente"
            rows={3}
            className="bg-[#1c1c1f] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#A64D79] resize-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-gray-400">Precio</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="$0.00"
              type="number"
              className="bg-[#1c1c1f] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#A64D79]"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-gray-400">Categoría</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="bg-[#1c1c1f] border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-[#A64D79]"
            >
              <option value="">Selecciona una</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">URL de imagen</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className="bg-[#1c1c1f] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#A64D79]"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            name="available"
            id="available"
            checked={form.available}
            onChange={handleChange}
            className="accent-[#6A1E55]"
          />
          <label htmlFor="available" className="text-sm text-gray-400">Disponible</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-[#6A1E55] text-white text-sm px-4 py-2 hover:bg-[#A64D79] transition">
            Guardar platillo
          </button>
          <button type="button" onClick={() => navigate('/menu')} className="border border-white/10 text-gray-400 text-sm px-4 py-2 hover:border-white/30 transition">
            Cancelar
          </button>
        </div>

      </form>
    </div>
  )
}
export default FormPage