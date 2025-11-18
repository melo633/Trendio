import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

const initialProductsState = {
    items: [],
    status: 'idle',
    error: null,
    selectedProduct: null,
    categories: ['all'],
    selectedCategory: 'all',
    searchTerm: '',
    sortOption: 'default',
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('/data.json')
    if (!response.ok) throw new Error('Məlumat alınmadı')
    return response.json()
})

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await fetch('/data.json')
    if (!response.ok) throw new Error('Məhsul tapılmadı')
    const items = await response.json()
    return items.find((item) => item.id === id)
})

const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
        },
        setSortOption(state, action) {
            state.sortOption = action.payload
        },
        clearSelectedProduct(state) {
            state.selectedProduct = null
        },
        setSelectedProductFromList(state, action) {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
                const categorySet = new Set(action.payload.map((item) => item.category))
                state.categories = ['all', ...Array.from(categorySet)]
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const { setSelectedCategory, setSearchTerm, setSortOption, clearSelectedProduct, setSelectedProductFromList } = productsSlice.actions
export const selectProductState = (state) => state.products
export const selectFilteredProducts = createSelector(
    [selectProductState],
    ({ items, selectedCategory, searchTerm, sortOption }) => {
        const search = searchTerm.trim().toLowerCase()
        let filtered = items.filter((product) => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
            const matchesSearch = !search || product.title.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)
            return matchesCategory && matchesSearch
        })
        switch (sortOption) {
            case 'price-asc':
                filtered = [...filtered].sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                filtered = [...filtered].sort((a, b) => b.price - a.price)
                break
            case 'rating-desc':
                filtered = [...filtered].sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
                break
        }
        return filtered
    }
)
export default productsSlice.reducer