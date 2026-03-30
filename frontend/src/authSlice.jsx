import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import axiosInstance from "./axiosInstance"


export const registerThunk = createAsyncThunk('register/', async (payload, thunkAPI) => {
    try {
        const res = await axios.post('https://blog-backend-ormm.onrender.com/api/v1/register/', payload)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.detail ||
            error.response?.data?.message ||
            error.response?.data?.username?.[0] ||
            error.response?.data?.password?.[0] ||
            "Something went wrong"
        )
    }
})


export const loginUser = createAsyncThunk('login/', async (payload, thunkAPI) => {
    try {
        const response = await axios.post('https://blog-backend-ormm.onrender.com/api/v1/token/', payload)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.detail ||
            error.response?.data?.non_field_errors?.[0] ||
            "Invalid username or password"
        )
    }
})


export const logoutUser = createAsyncThunk('logout', async (payload, thunkAPI) => {
    const { refresh } = payload
    try {
        const res = await axios.post('https://blog-backend-ormm.onrender.com/api/v1/logout/', { refresh })
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.detail || "Cannot logout"
        )
    }
})

const authSlice = createSlice({
    name: 'authReducer',
    initialState: {
        isLoggedIn: !!localStorage.getItem('access'),
        errorMessage: null,
        accessToken: localStorage.getItem('access') || null,
        refreshToken: localStorage.getItem('refresh') || null,
        userRegister: []
    },
    reducers: {
        clearError: (state) => {
            state.errorMessage = null
        }
    },
    extraReducers: (builder) => {
        builder

        
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.userRegister = action.payload
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.errorMessage = action.payload
            })

         
            .addCase(loginUser.pending, (state) => {
                state.errorMessage = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.errorMessage = null
                state.isLoggedIn = true
                state.accessToken = action.payload.access
                state.refreshToken = action.payload.refresh
                localStorage.setItem('access', action.payload.access)
                localStorage.setItem('refresh', action.payload.refresh)
                const decoded = JSON.parse(atob(action.payload.access.split('.')[1]))
                localStorage.setItem('username', decoded.username)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.errorMessage = action.payload
            })

    
            .addCase(logoutUser.fulfilled, (state) => {
                localStorage.removeItem('username')
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                state.accessToken = null
                state.refreshToken = null
                state.isLoggedIn = false
                state.errorMessage = null
            })
            .addCase(logoutUser.rejected, (state) => {
                localStorage.removeItem('username')
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                state.isLoggedIn = false
                state.errorMessage = null
                state.accessToken = null
                state.refreshToken = null
            })
    }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer