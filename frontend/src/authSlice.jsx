import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

import axios from 'axios'
import { data } from "react-router-dom";

import axiosInstance from "./axiosInstance";

import { useNavigate } from "react-router-dom";




export const registerThunk=createAsyncThunk('register/',async(payload,thunkAPI)=>{
    try{
      const res=await axios.post('http://127.0.0.1:8000/api/v1/register/',payload)
      return res.data
    }
    catch(error){
       return thunkAPI.rejectWithValue(
    error.response?.data?.detail ||
    error.response?.data?.message ||
    error.response?.data?.username?.[0] ||
    error.response?.data?.password?.[0] ||
    "Something went wrong"
  )
    }
})

export const loginUser=createAsyncThunk('login/',async(payload,thunkAPI)=>{
    try{
       const response= await axios.post('http://127.0.0.1:8000/api/v1/token/',
        payload
       )
       return response.data
    }
    catch(error){
       const message =
    error.response?.data?.detail ||
    error.response?.data?.non_field_errors?.[0] ||
    "Invalid username or password";

  return thunkAPI.rejectWithValue(message);
    }
})
export const logoutUser=createAsyncThunk('logout',async(payload,thunkAPI)=>{
       const {refresh}=payload
       console.log(refresh)
         try{
           const res=await axios.post('http://127.0.0.1:8000/api/v1/logout/',{refresh})
            console.log(res.data)
            return res.data
         }
         catch(error){
          console.log(error)
          return thunkAPI.rejectWithValue(error.response?.data?.detail || "Cannot logout") 

         }
})

export const getPermissions=createAsyncThunk('get/permission/','')


const authSlice=createSlice({
    name:'authReducer',
      initialState:{isLoggedIn:!!localStorage.getItem('access'),errorMessage:null,accessToken:localStorage.getItem('access') || null,refreshToken:localStorage.getItem('refresh') || null,userRegister:[]},
      reducers:{
          clearError:(state)=>{
        state.errorMessage=null
          }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerThunk.fulfilled,(state,action)=>{
        state.userRegister=action.payload
        
    })
    
      .addCase(loginUser.pending, (state) => {
      state.errorMessage = null
    })
    builder.addCase(loginUser.fulfilled,(state,action)=>{
        state.errorMessage=null
        console.log(state.errorMessage)
        state.isLoggedIn=true
        
        state.accessToken=action.payload.access
        state.refreshToken=action.payload.refresh
        localStorage.setItem('access',action.payload.access)
        localStorage.setItem('refresh',action.payload.refresh)

    const decoded = JSON.parse(atob(action.payload.access.split('.')[1]))
    console.log(decoded.username)   
    localStorage.setItem('username', decoded.username)  
       
    })
    builder.addCase(loginUser.rejected,(state,action)=>{
         state.errorMessage=action.payload

    })

    builder.addCase(logoutUser.fulfilled, (state,action) => {

      console.log('logout fulfilled!')  

      localStorage.removeItem('username')
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.accessToken = null      
      state.refreshToken = null 
      state.isLoggedIn=false
      state.errorMessage=null
      console.log(localStorage.getItem('username'))

    })

    builder.addCase(logoutUser.rejected,(state,action)=>{
        state.errorMessage=action.payload
      localStorage.removeItem('username')
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isLoggedIn=false
      state.errorMessage=null
       state.accessToken = null      
    state.refreshToken = null 
    })
    }


})

export default authSlice.reducer

export const {clearError}=authSlice.actions