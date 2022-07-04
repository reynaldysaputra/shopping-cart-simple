import { createContext, useContext, useState } from "react";

interface shoppingCartProvideProps {
  children: React.ReactNode;
}

interface shoppingCartContext {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

interface CartItem {
  id: number;
  quantity: number
}

export function useShoppingCart(){
  return useContext(ShoppingCartContext);
}

const ShoppingCartContext = createContext({} as shoppingCartContext );

export function ShoppingCartProvider({ children }: shoppingCartProvideProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getItemQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const increaseCartQuantity = (id: number) => {
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id) == null){
        return [...currItems, { id, quantity: 1 }]
      }else  {
        return currItems.map(item => {
          if(item.id === id) {
            return {...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const decreaseCartQuantity = (id: number) => {
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id)?.quantity === 1){
        return currItems.filter(item => item.id !== id);
      }else  {
        return currItems.map(item => {
          if(item.id === id) {
            return {...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const removeFromCart = (id: number) => {
    return setCartItems(currItems => currItems.filter(item => item.id !== id));
  }

  return (
    <ShoppingCartContext.Provider 
      value={{ 
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart 
      }}
    > 
      {children}
    </ShoppingCartContext.Provider>
  )
}