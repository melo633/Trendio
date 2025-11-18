import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

const initialCartState = { items: {}, totalQuantity: 0, totalPrice: 0 }

const recalcTotals = (state) => {
    let totalQuantity = 0
    let totalPrice = 0
    Object.values(state.items).forEach(({ product, quantity }) => {
        totalQuantity += quantity
        totalPrice += product.price * quantity
    })
    state.totalQuantity = totalQuantity
    state.totalPrice = totalPrice
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload
            const existing = state.items[product.id]
            if (existing) existing.quantity += 1
            else state.items[product.id] = { product, quantity: 1 }
            recalcTotals(state)
        },
        decrementQuantity(state, action) {
            const existing = state.items[action.payload]
            if (!existing) return
            if (existing.quantity > 1) existing.quantity -= 1
            else delete state.items[action.payload]
            recalcTotals(state)
        },
        removeFromCart(state, action) {
            delete state.items[action.payload]
            recalcTotals(state)
        },
        clearCart(state) {
            state.items = {}
            state.totalQuantity = 0
            state.totalPrice = 0
        },
    },
})

export const { addToCart, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions
export const selectCartState = (state) => state.cart
export const selectCartItems = (state) => Object.values(state.cart.items)
export const selectCartSummary = createSelector(
    selectCartState,
    (cart) => ({ totalQuantity: cart.totalQuantity, totalPrice: cart.totalPrice })
)
export default cartSlice.reducer