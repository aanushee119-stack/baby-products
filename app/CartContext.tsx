'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

const CartContext = createContext<any>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any[]>([])

  const addToCart = (product: any) => {
    setCart((prev) => {
      const found = prev.find((item: any) => item.id === product.id)
      if (found) {
        return prev.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item: any) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item: any) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
