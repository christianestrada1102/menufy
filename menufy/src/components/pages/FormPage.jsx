import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { MenuContext } from "../../context/MenuContext"

const FormPage = () => {
  const { addDish, categories } = useContext(MenuContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true
  })

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
    addDish(form)
    navigate('/menu')
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">

      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-xl font-semibold text-gray-900">Nuevo platillo</h1>
        <p className="text-sm text-gray-500 mt-0.5">Completa la información del platillo</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Nombre *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej. Tacos de pastor"
            className="border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe el platillo brevemente"
            rows={3}
            className="border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500 resize-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-gray-600">Precio *</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              type="number"
              className="border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-gray-600">Categoría *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500 bg-white"
            >
              <option value="">Selecciona una</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">URL de imagen</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className="border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            name="available"
            id="available"
            checked={form.available}
            onChange={handleChange}
            className="accent-violet-600"
          />
          <label htmlFor="available" className="text-sm text-gray-600">Disponible</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-violet-600 text-white text-sm px-4 py-2 hover:bg-violet-700 transition">
            Guardar platillo
          </button>
          <button type="button" onClick={() => navigate('/menu')} className="border border-gray-300 text-gray-600 text-sm px-4 py-2 hover:border-gray-400 transition">
            Cancelar
          </button>
        </div>

      </form>
    </div>
  )
}

export default FormPage