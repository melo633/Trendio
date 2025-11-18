import { createSlice } from '@reduxjs/toolkit'

const USERS_KEY = 'fakeStoreUsers'
const SESSION_KEY = 'fakeStoreSession'

const loadUsers = () => {
    try {
        const raw = localStorage.getItem(USERS_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const saveSession = (session) => {
    if (session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
        localStorage.removeItem(SESSION_KEY)
    }
}

const loadSession = () => {
    try {
        const raw = localStorage.getItem(SESSION_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

const initialState = {
    isAuthenticated: false,
    currentUser: null,
    users: [],
    authError: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadAuthFromStorage(state) {
            const storedUsers = loadUsers()
            const session = loadSession()
            state.users = storedUsers
            if (session) {
                state.isAuthenticated = true
                state.currentUser = session
            }
        },
        registerUser(state, action) {
            const { email, password, fullName } = action.payload
            const exists = state.users.find((user) => user.email === email)
            if (exists) {
                state.authError = 'Bu e-poçt artıq qeydiyyatdan keçib.'
                return
            }
            const newUser = { email, password, fullName }
            const updatedUsers = [...state.users, newUser]
            state.users = updatedUsers
            saveUsers(updatedUsers)
            state.authError = null
        },
        loginUser(state, action) {
            const { email, password } = action.payload
            const user = state.users.find((candidate) => candidate.email === email)
            if (!user || user.password !== password) {
                state.authError = 'E-poçt və ya şifrə yanlışdır.'
                return
            }
            state.isAuthenticated = true
            state.currentUser = { email: user.email, fullName: user.fullName }
            saveSession(state.currentUser)
            state.authError = null
        },
        logoutUser(state) {
            state.isAuthenticated = false
            state.currentUser = null
            saveSession(null)
        },
        clearAuthError(state) {
            state.authError = null
        },
    },
})

export const {
    loadAuthFromStorage,
    registerUser,
    loginUser,
    logoutUser,
    clearAuthError,
} = authSlice.actions

export const selectAuthState = (state) => state.auth

export default authSlice.reducer