import { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/shoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface shoppingCartProvideProps {
  children: React.ReactNode;
}

interface shoppingCartContext {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[]
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
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [isOpen, setOpen] = useState(false);

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

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  return (
    <ShoppingCartContext.Provider 
      value={{ 
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
      }}
    > 
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}