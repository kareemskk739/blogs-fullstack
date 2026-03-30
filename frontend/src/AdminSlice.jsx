import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "./axiosInstance";

const AdminSlice=createSlice({
 name:'adminreducer',
 initialState:{pendingRequests:[],errorMessage:'',message:''},
 reducers:{
   clearMessages:(state,action)=>{
      state.message=''
   }
 },
 extraReducers:(builder)=>{
      builder.addCase(getPendingRequests.fulfilled,(state,action)=>{
         state.pendingRequests=action.payload
         state.errorMessage=null
      })
      builder.addCase(getPendingRequests.rejected,(state,action)=>{
         
         state.errorMessage=action.payload.message
      })
      .addCase(changeUserGroup.fulfilled,(state,action)=>{
          state.message=action.payload
          state.errorMessage=null
      })
      .addCase(changeUserGroup.rejected,(state,action)=>{
         
         state.errorMessage=action.payload.message
         state.message=null
      })
 }


})


export const changeUserGroup=createAsyncThunk('/changegroup',async(payload,thunkAPI)=>{
   
    try{
     const res=await axiosInstance.post('change-group/',payload)
     
     return res.data
    }
     catch(e){
        
        return thunkAPI.rejectWithValue({
    message: error.response?.data?.detail || "Error",
  })
     }
     



})

export const getPendingRequests=createAsyncThunk('getpendingrequests/',async(payload,thunkAPI)=>{
   try{
     const res=await axiosInstance.get('change-group/')
     
   return res.data
   }
   catch(error){
      
     return thunkAPI.rejectWithValue({
    message: error.response?.data?.detail || "Error",
  })
   }
  
})



export default AdminSlice.reducer

export const {clearMessages}=AdminSlice.actions