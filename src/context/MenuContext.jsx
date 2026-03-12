import { createContext, useState,useEffect } from "react";
import { STORAGE_KEY } from "../constants"

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [dishes,setDishes] = useState([
      { id: 1, name: 'Tacos de pastor', category: 'Platos Fuertes', price: 120, description: 'Deliciosos tacos con carne al pastor', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOnz48KIU-eIaQ9vBXvNXAhsFV8S6Wmy9yuA&s', available: true },
  { id: 2, name: 'Guacamole', category: 'Entradas', price: 80, description: 'Aguacate fresco con limón y cilantro', image: 'https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2024/08/07/guacamole-con-nachos.jpeg', available: true },
  { id: 3, name: 'Agua de horchata', category: 'Bebidas', price: 35, description: 'Bebida tradicional mexicana', image: 'https://i.blogs.es/f017a7/como-hacer-agua-de-horchata-arroz-3-/450_1000.jpg', available: true },
  { id: 4, name: 'Flan napolitano', category: 'Postres', price: 65, description: 'Postre cremoso con caramelo', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Yxp0B2ak1-7VFKWT42Kogj8aSQpB1s5fBQ&s', available: true },
  { id: 5, name: 'Enchiladas verdes', category: 'Platos Fuertes', price: 95, description: 'Con salsa verde y crema', image: 'https://cdn7.kiwilimon.com/recetaimagen/32015/640x640/36922.jpg.webp', available: true },
  { id: 6, name: 'Sopa de lima', category: 'Entradas', price: 70, description: 'Caldo yucateco con pollo y lima', image: 'https://cdn7.kiwilimon.com/recetaimagen/29757/640x640/31359.jpg.jpg', available: false },
  { id: 7, name: 'Pozole rojo', category: 'Platos Fuertes', price: 110, description: 'Caldo de maíz con cerdo', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTufeFkyRh0HAKs_klLq6ATTjSNHCkWB5jqw&s', available: true },
  { id: 8, name: 'Jamaica', category: 'Bebidas', price: 30, description: 'Agua fresca de flor de jamaica', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlbWs-126OMC677Z_MF6UGe9r_z0VBziNS1Q&s', available: true },
  { id: 9, name: 'Churros', category: 'Postres', price: 55, description: 'Con azúcar y canela', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-qf6GA2kbYPWciSCiC27SKZnnxdQsLLta7g&s', available: true },
  { id: 10, name: 'Quesadillas', category: 'Entradas', price: 75, description: 'Con queso Oaxaca derretido', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_WfCBnY5jtDRYj-tL3AsAR96HyUH4Zz6zcg&s', available: true },
  { id: 11, name: 'Birria', category: 'Platos Fuertes', price: 130, description: 'Carne de res en consomé', image: 'https://www.mexicodesconocido.com.mx/wp-content/uploads/2021/12/Captura-de-Pantalla-2021-12-14-a-las-21.19.16.png', available: false },
  { id: 12, name: 'Limonada', category: 'Bebidas', price: 30, description: 'Natural o mineral', image: 'https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/6b252c9019c800616e72865afa670260.jpg?itok=yYpVYSyo', available: true },
  { id: 14, name: 'Elotes', category: 'Entradas', price: 45, description: 'Con mayonesa, queso y chile', image: 'https://www.goya.com/wp-content/uploads/2023/10/mexican-corn-on-the-cob-elote.jpg', available: true },
  { id: 15, name: 'Chile relleno', category: 'Platos Fuertes', price: 105, description: 'Poblano relleno de queso', image: 'https://sabrosano.com/wp-content/uploads/2020/05/Chile-Relleno-de-Camarones-7.jpg', available: true },
    ]);
    const [categories,setCategories] = useState(['Entradas','Platos Fuertes','Postres','Bebidas','Especiales']);
    const [loaded, setLoaded] = useState(false) 

useEffect(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) setDishes(JSON.parse(stored))
  setLoaded(true)
}, [])

  useEffect(() => {
  if (!loaded) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes))
}, [dishes, loaded])

      const addDish = (dish) => {
        setDishes(prev => [...prev, {...dish, id: Date.now()}])
      }

      const updateDish = (id,updated) => {
        setDishes(prev => prev.map(d => d.id === id ? {...d,...updated} : d))
      }

      const deleteDish = (id) => {
    setDishes(prev => prev.filter(d => d.id !== id))
  }

    const toggleAvailability = (id) => {
    setDishes(prev => prev.map(d => d.id === id ? { ...d, available: !d.available } : d))
  }

   return (
    <MenuContext.Provider value={{ dishes, categories, addDish, updateDish, deleteDish, toggleAvailability }}>
      {children}
    </MenuContext.Provider>
  )



}