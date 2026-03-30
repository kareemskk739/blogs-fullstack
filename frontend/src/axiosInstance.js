import axios from "axios";


const baseURL=import.meta.env.VITE_BACKEND_BASE_URL



const axiosInstance=axios.create({
    baseURL:baseURL,
    headers:{
        'Content-Type':'application/json',
    }
})  

const refreshClient=axios.create({
    baseURL:baseURL
})

axiosInstance.interceptors.request.use((config)=>{
       const token=localStorage.getItem('access')
       if(token && token !== "null"){
         config.headers['Authorization']=`Bearer ${token}`
       }
       return config 
    },

       (error) => {
        console.log(error)
        Promise.reject(error)}

)


// axiosInstance.interceptors.response.use((response)=>
// {   
//     return response},
//     async(error)=>{
//         const orginalRequest=error.config
//         console.log(error.response.status)
//         if(error.response?.status == 401 && !orginalRequest._retry){
//             orginalRequest._retry=true
//             const refresh=localStorage.getItem('refresh')
//             if(!refresh){
//                 window.location.href='/login'
//                 return Promise.reject(error)
//             }
//             try{
//                const response = await axiosInstance.post('api/v1/token/refresh/',{refresh}) 
//                const newAccess= await response.data.access
//                localStorage.setItem('access',newAccess)
//                orginalRequest.headers.Authorization=`Bearer ${newAccess}`
//                return axiosInstance(orginalRequest)
//             }
//             catch(error){
//               localStorage.removeItem('access')
//               localStorage.removeItem('refresh')
//               window.location.href('/login')
//             }

//         }
//         return Promise.reject(error)

//     }
// )



axiosInstance.interceptors.response.use((response)=>{
    return response
},
  async(error)=>{
     console.log(error.response.status)
     const orginalRequest=error.config
     if(error.response.status === 401 || error.response.status === 403 && !orginalRequest._retry){
        orginalRequest._retry=true
        try{
           const refresh=localStorage.getItem('refresh')
        //    if (!refresh) {
        //   window.location.href = "/login"
        //   return Promise.reject(error)
        //    }
           const res= await refreshClient.post('/token/refresh/',{refresh})
           const newAccess=await res.data.access
           localStorage.setItem('access',newAccess)
           orginalRequest.headers.Authorization=`Bearer ${newAccess}`
           return axiosInstance(orginalRequest)
        }
        catch(error){
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            window.location.href='/login'
            console.log(error)
            return Promise.reject(error)
            
        }

     }
    return Promise.reject(error)

  }
)

export default axiosInstance    