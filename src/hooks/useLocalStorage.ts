import { useEffect, useState } from "react"

interface Item {
  id: number;
  quantity: number;
}

export function useLocalStorage<T>(key: string, initialValue: T | string | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    
    if (typeof initialValue === "function") {
      return (initialValue as () => T)()
    } else {
      return initialValue
    }
  }) 

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
    
  return [value, setValue] as [typeof value, typeof setValue] ;
}