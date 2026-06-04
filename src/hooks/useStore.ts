import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export interface ProductSummary {
  id: string
  name: string
  price: number
  image: string
}

interface CommerceState {
  // Cart State
  cart: CartItem[]
  isCartOpen: boolean
  setCart: (items: CartItem[]) => void
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: (isOpen?: boolean) => void

  // Wishlist State
  wishlist: ProductSummary[]
  toggleWishlist: (product: ProductSummary) => void
  isInWishlist: (id: string) => boolean

  // Compare State
  compareList: ProductSummary[]
  toggleCompare: (product: ProductSummary) => void
  isInCompare: (id: string) => boolean
}

export const useStore = create<CommerceState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      isCartOpen: false,
      
      setCart: (items) => set({ cart: items }),
      
      addToCart: (item) => set((state) => {
        // Check if exact same item (with same variants) exists
        const existingItemIndex = state.cart.findIndex(
          i => i.productId === item.productId && i.size === item.size && i.color === item.color
        )

        if (existingItemIndex >= 0) {
          const newCart = [...state.cart]
          newCart[existingItemIndex].quantity += item.quantity
          return { cart: newCart, isCartOpen: true }
        }

        return { 
          cart: [...state.cart, { ...item, id: Math.random().toString(36).substring(7) }],
          isCartOpen: true
        }
      }),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
      })),
      
      clearCart: () => set({ cart: [] }),
      
      toggleCart: (isOpen) => set((state) => ({ 
        isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen 
      })),

      // Wishlist
      wishlist: [],
      
      toggleWishlist: (product) => set((state) => {
        const exists = state.wishlist.some(p => p.id === product.id)
        if (exists) {
          return { wishlist: state.wishlist.filter(p => p.id !== product.id) }
        }
        return { wishlist: [...state.wishlist, product] }
      }),
      
      isInWishlist: (id) => get().wishlist.some(p => p.id === id),

      // Compare
      compareList: [],
      
      toggleCompare: (product) => set((state) => {
        const exists = state.compareList.some(p => p.id === product.id)
        if (exists) {
          return { compareList: state.compareList.filter(p => p.id !== product.id) }
        }
        // Limit to 4 items max
        if (state.compareList.length >= 4) {
          return state
        }
        return { compareList: [...state.compareList, product] }
      }),
      
      isInCompare: (id) => get().compareList.some(p => p.id === id)
    }),
    {
      name: 'lumiere-commerce-storage',
      // Don't persist UI state like isCartOpen
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        compareList: state.compareList
      })
    }
  )
)
