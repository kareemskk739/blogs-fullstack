import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

import axios from 'axios'
import { data } from "react-router-dom";

import axiosInstance from "./axiosInstance";

import { useNavigate } from "react-router-dom";



const mySlice=createSlice({
    name:'myReducer',
    initialState:{blogsData:[],commentsData:[],ownersData:[],searching:false,blog:{},clickedState:'',message:null,errorMessage:null},
    reducers:{
       setClickedState:(state,action)=>{
      state.clickedState=action.payload

       },
       emptyMessage:(state,action)=>{
        state.message=''
        state.errorMessage=''
       }
    },
    extraReducers:(builder)=>{
    builder.addCase(getBlogsData.fulfilled,(state,action)=>{
           
           state.blogsData=action.payload
           state.errorMessage=null
    })
    builder.addCase(getBlogsData.rejected,(state,action)=>{
        state.blogsData=[]
        state.errorMessage=action.payload
    })
 
    builder.addCase(getCommentsData.fulfilled,(state,action)=>{
          state.commentsData=action.payload
    })
    builder.addCase(getOwnersData.fulfilled,(state,action)=>{
          
          state.ownersData=action.payload

    })

    // builder.addCase(registerThunk.fulfilled,(state,action)=>{
    //     state.userRegister=action.payload
        
    // })
    // builder.addCase(loginUser.fulfilled,(state,action)=>{
    //     state.errorMessage=null
    //     state.isLoggedIn=true
    //     
    //     state.accessToken=action.payload.access
    //     state.refreshToken=action.payload.refresh
    //     localStorage.setItem('access',action.payload.access)
    //     localStorage.setItem('refresh',action.payload.refresh)
       
    // })
    // builder.addCase(loginUser.rejected,(state,action)=>{
    //       

    //      state.errorMessage=action.payload.detail
    // })

    // builder.addCase(logoutUser.fulfilled, (state,action) => {
    //   localStorage.removeItem("access");
    //   localStorage.removeItem("refresh");
    //   
    //   state.isLoggedIn=false
    // })

    // builder.addCase(logoutUser.rejected,(state,action)=>{
    //     state.errorMessage=action.payload.detail
    // })

    builder.addCase(addBlog.fulfilled,(state,action)=>{
        

         state.message=`Successfully added the blog with title: ${action.payload.title}`   
         state.errorMessage=null
    })
    .addCase(addBlog.rejected,(state,action)=>{
        state.errorMessage=action.payload
    })

    builder.addCase(searchByBlog.fulfilled,(state,action)=>{
          if (state.clickedState === 'blogs'){
            if(action.payload.data.results.length==0){
       state.errorMessage='error searching the results'
        }
        else{
            state.errorMessage=null
        }
          }

          else{
            if(action.payload.data.length==0){
       state.errorMessage='error searching the results'
        }
        else{
            state.errorMessage=null
        }
          }
          
        
        switch (action.payload.clickedState) {
            case 'blogs':
                state.blogsData=action.payload.data
                break;
            case 'comments':
               state.commentsData=action.payload.data
            break;
            case 'owners':
               state.ownersData=action.payload.data
            break;
        
            default:
                break;
        }
        
        state.searching=true
    })
    .addCase(searchByBlog.rejected,(state,action)=>{
        
       state.errorMessage=action.payload
    })

    .addCase(getPaginatedResults.fulfilled,(state,action)=>{
        state.blogsData=action.payload
    })
    .addCase(getPaginatedResults.rejected,(state,action)=>{
       state.errorMessage=action.payload
    })
    .addCase(getBlog.fulfilled,(state,action)=>{
        state.blog=action.payload
    })
    .addCase(RequestChange.fulfilled,(state,action)=>{
         state.message=action.payload.message
    })
    .addCase(RequestChange.rejected,(state,action)=>{
        
        state.message=action.payload
    })

  

    
    }


})
// 'http://127.0.0.1:8000/api/v1/blogs/'
export const getBlogsData=createAsyncThunk('blogs/',async(payload,thunkAPI)=>{
      try{
         const res= await axiosInstance.get('/blogs/')
         
         return res.data
      }
      catch(error){
           return thunkAPI.rejectWithValue(error.response?.data?.detail || "You are not authorized!")
      };
      

    
})

export const getOwnersData=createAsyncThunk('owners/',async()=>{
    const response=await axios.get('http://127.0.0.1:8000/api/v1/owners/')
    
    return response.data
})

export const getCommentsData=createAsyncThunk('comments/',async()=>{
    const response=await axios.get('http://127.0.0.1:8000/api/v1/comments/')
    
    return response.data
})

// export const registerThunk=createAsyncThunk('register/',async(payload,thunkAPI)=>{
//     try{
//       const res=await axios.post('http://127.0.0.1:8000/api/v1/register/',payload)
//       return res.data
//     }
//     catch(error){
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       )
//     }
// })

// export const loginUser=createAsyncThunk('login/',async(payload,thunkAPI)=>{
//     try{
//        const response= await axios.post('http://127.0.0.1:8000/api/v1/token/',
//         payload
//        )
//        return response.data
//     }
//     catch(error){
//         
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "cant log in " 
//       )
//     }
// })
// export const logoutUser=createAsyncThunk('logout',async(payload,thunkAPI)=>{
//        const {access,refresh}=payload
//          try{
//            const res=await axios.post('http://127.0.0.1:8000/api/v1/logout/',{refresh},
//              { headers: { Authorization: `Bearer ${access}` } })
//             return res.data
//          }
//          catch(error){
//            return thunkAPI.rejectWithValue(error.response?.data || "cant logged out" ) 
//          }
// })

export const searchByBlog=createAsyncThunk('search/',async(payload,thunkAPI)=>{
    const {clickedState}=payload
    
  
    try{ 
         switch (clickedState) {
            case 'blogs':
                const resp=await axiosInstance.get(`/blogs/?search=${payload.val}`)
                
                return{
                    data:resp.data,clickedState}
            case 'owners':
                const re=await axiosInstance.get(`/owners/?search=${payload.val}`)
                
                 return{
                    data:re.data,clickedState}

            case 'comments':
                const r=await axiosInstance.get(`/comments/?search=${payload.val}`)
                 return{
                    data:r.data,clickedState}
            default:
                break;
         }
        
    }
    catch(error){
        
        return thunkAPI.rejectWithValue(error.response?.data?.detail || "cant get the value"  )
    }
    
})

export const getPaginatedResults=createAsyncThunk('page/',async(payload,thunkAPI)=>{
   try {
        let url = `/blogs/?page=${payload.value}`

     
        if (payload.searchVal) {
            url += `&search=${payload.searchVal}`  // & not /?
        }

          // /blogs/?page=1&search=django
        const res = await axiosInstance.get(url)
        return res.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.detail || "Failed to fetch"
        )
    }

})

export const getBlog=createAsyncThunk('blog/',async(payload,thunkAPI)=>{
    try{
      const res= await axiosInstance.get(`blogs/${payload}`)
      return res.data
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const addBlog=createAsyncThunk('addblog/',async(payload,thunkAPI)=>{
    
          try{
          const res=await axiosInstance.post('blogs/',payload)
          console.log(res.data)
          return res.data
      }
      catch(error){
        
        return thunkAPI.rejectWithValue(error?.response?.data || 'error adding blog')
      }
})

export const RequestChange=createAsyncThunk('requestchange',async(payload,thunkAPI)=>{

    
    try{
    const res=await axiosInstance.post('request-permission/',payload)
    
    return(res.data.message)
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
    
})


export default mySlice.reducer

export const {setClickedState,emptyMessage}=mySlice.actions