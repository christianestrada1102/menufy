import { createContext, useState,useEffect } from "react";
import { STORAGE_KEY } from "../constants"

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [dishes,setDishes] = useState([]);
    const [categories,setCategories] = useState(['Entradas','Platos Fuertes','Postres','Bebidas','Especiales']);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if(stored) setDishes(JSON.parse(stored))
     }, [])

      useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes))
      }, [dishes])

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