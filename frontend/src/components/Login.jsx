// import React from 'react'

// import { Formik, Form, Field, ErrorMessage } from "formik";

// import * as YUP from 'yup'

// import { useSelector,useDispatch } from 'react-redux'

// import { loginUser } from '../authSlice';

// import { Navigate, useNavigate } from 'react-router-dom';

// import { Oval } from 'react-loader-spinner'
// import { useState } from "react";



// function Login() {
//   const navigate = useNavigate();
//   const[loader,setLoader]=useState(false)
//   const {accessToken,refreshToken,errorMessage}=useSelector(state=>state.authReducer)
//   const dispatch=useDispatch()
//   console.log(typeof errorMessage, errorMessage)

//   return (
//     <div>
//         register
//     {loader?
//     <Oval
//   height={80}
//   width={80}
//   color="#4fa94d"
//   visible={true}
//   ariaLabel="oval-loading"
//   secondaryColor="#4fa94d"
//   strokeWidth={2}
//   strokeWidthSecondary={2}
//     /> :
//     <Formik onSubmit={async(values,{setSubmitting,resetForm})=>{
//           // const status= await dispatch(loginUser(values))
          
//           // resetForm()
//           // setSubmitting(false)
//           // if (loginUser.fulfilled.match(status)){
//           //   navigate('/home')
//           // }
//       setLoader(true)
//       try{
//         console.log(values)
//         await dispatch(loginUser(values)).unwrap()
//          resetForm()
//          navigate('/home')
        
//       }
//       catch(error){
        
//         setLoader(false)

//       }
//       finally{
       
//         setSubmitting(false)
//         setLoader(false)
        
//       }
//     }}
//      initialValues={{
//       username: "",
//       password: "",
//     }}
//     validationSchema={YUP.object({
//       username: YUP.string().required("Username is required"),
//       password: YUP.string().required("Password is required"),
//     })}
//      validateOnChange={true}   
//      validateOnBlur={true}  

//     >
//        {({ errors, touched, isSubmitting }) => (
//       <Form>
//        <div style={{ marginBottom: "10px" }}>
                     
//                      <Field name="username" type="text"  placeholder='Enter Username' style={{'backgroundColor':'white','border':'1px solid black',}}  />
//                      {errors.username && touched.username && (
//                        <div style={{ color: "red", fontSize: "12px" }}>
//                          {errors.username}
//                        </div>
//                      )}
//       </div>

//       <div style={{ marginBottom: "10px" }}>
                                 
//                                  <Field name="password" type="password" placeholder='Enter Your Password'  style={{'backgroundColor':'white','border':'1px solid black',}}/>
//                                  {errors.password && touched.password && (
//                                    <div style={{ color: "red", fontSize: "12px" }}>
//                                      {errors.password}
//                                    </div>
//                                  )}
//       </div>

//        <button type="submit" disabled={isSubmitting}  >
//               Login
//         </button>

//       </Form>

//       )}

//     </Formik>}

//       {typeof errorMessage === "string" && errorMessage && (
//   <div
//     style={{
//       color: "white",
//       backgroundColor: "red",
//       padding: "10px",
//       marginTop: "10px",
//       borderRadius: "4px",
//       width: "100%",
//     }}
//   >
//     {errorMessage}
//   </div>
// )}


//     </div>
//   )
// }

// export default Login



import React, { useState,useEffect } from 'react'
import { Formik, Form, Field } from "formik"
import * as YUP from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, loginUser } from '../authSlice'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'


function Login() {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const { errorMessage ,isLoggedIn} = useSelector(state => state.authReducer)
  const dispatch = useDispatch()
   useEffect(()=>{
   dispatch(clearError())
   },[])
   console.log(isLoggedIn)
  return (
     <>
    {loader ? (
           <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10 flex flex-col items-center gap-5 text-center">
            
            {/* Icon */}
            <div className="bg-purple-100 rounded-full p-5">
                <span className="text-5xl">📝</span>
            </div>

            {/* Spinner */}
            <Oval
                height={50}
                width={50}
                color="#7c3aed"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#c4b5fd"
                strokeWidth={3}
                strokeWidthSecondary={3}
            />

            {/* Message */}
            
            <p className="text-gray-500 text-sm">Please wait a moment</p>

        </div>
    </div>):
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600">📝 BlogSpace</h1>
          <p className="text-gray-500 mt-2 text-sm">Login to your account</p>
        </div>

        
    
          <Formik
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setLoader(true)
              try {
                await dispatch(loginUser(values)).unwrap()
                resetForm()
                navigate('/home')
              } catch (error) {
                setLoader(false)
              } finally {
                setSubmitting(false)
                setLoader(false)
                
              }
            }}
            initialValues={{ username: "", password: "" }}
            validationSchema={YUP.object({
              username: YUP.string().required("Username is required"),
              password: YUP.string().required("Password is required"),
            })}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="flex flex-col gap-3">

                {/* Username */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    className="border  text-center border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                  />
                  {errors.username && touched.username && (
                    <p className="text-red-500 text-xs">{errors.username}</p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="border text-center border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>

                {/* Error Message from API */}
                {typeof errorMessage === "string" && errorMessage && (
                  <div className="bg-red-100 text-red-700 text-sm px-4 py-3 rounded-lg text-center">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{' '}
                  <span
                    onClick={() =>{
                      setLoader(true)
                    setTimeout(()=>{
              navigate('/register')
              },2000)}
                    } 
                    className="text-purple-600 font-medium cursor-pointer hover:underline"
                  >
                    Register
                  </span>
                </p>

              </Form>
            )}
          </Formik>
        

      </div>
    </div>}
    
    </>
   )
  
}


export default Login