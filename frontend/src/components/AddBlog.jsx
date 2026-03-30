
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { addBlog, getOwnersData } from '../mySlice'
import { useNavigate } from 'react-router-dom'

import { emptyMessage } from '../mySlice'

import Link from '@mui/material/Link';

const postSchema = Yup.object().shape({
    title: Yup.string()
        .min(1, "Title must be at least 3 characters")
        .max(50, "Title cannot exceed 50 characters")
        .required("Title is required"),
    description: Yup.string()
        .required("Description is required"),

})

function AddBlog() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message, ownersData,errorMessage} = useSelector(state => state.myReducer)
    const {accessToken} =useSelector(state=>state.authReducer)
   const decoded = accessToken ? JSON.parse(atob(accessToken.split('.')[1])) : null
const username = decoded?.username
const currentOwner = ownersData?.find(owner => owner.name === username)
const ownerId = currentOwner?.id
  console.log(message)

    useEffect(() => {
        dispatch(getOwnersData())
    }, [])

    useEffect(()=>{
      const timer=setTimeout(()=>{ dispatch(emptyMessage()
    )},10000)
    return ()=>{clearTimeout(timer)}
    },[message,errorMessage])
 

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Top Bar */}
            <div className="bg-purple-700 px-4 py-3 flex justify-center items-center">
                <span className="text-white text-xs font-medium">
                    👤 Welcome, <span className="font-bold text-base capitalize">{localStorage.getItem('username') || 'User'}</span>
                </span>
            </div>

            {/* Navbar */}
            <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-purple-600">📝 BlogSpace</h1>
                <button
                    onClick={() => {
                        navigate('/home')
                        dispatch(emptyMessage())
                    } }
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
                >
                    ← Back
                </button>
            </nav>
              
             {message && (
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-center text-sm mb-6">
                            ✅ {message}
                        </div>
                    )}
             {errorMessage && (
                        <div className="bg-red-100 text-red-700 px-4 py-5 rounded-lg text-center text-sm mb-6">
                            x {errorMessage.detail}
                        </div>
                    )}
            {errorMessage && <Link component="button"
      variant="body2"
      onClick={() => { 
        navigate('/requestforchange') 
      }}>get permission to add a blog?</Link>}
            <div className="flex items-center justify-center px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                            <span className="text-3xl">✍️</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Add New Blog</h2>
                        <p className="text-gray-500 text-sm mt-1">Fill in the details to publish your blog</p>
                    </div>

                    {/* Success Message */}

                    <Formik
                        initialValues={{
                            title: "",
                            description: "",
                            owner: "",
                        }}
                        validationSchema={postSchema}
                        validateOnChange={true}
                        validateOnBlur={true}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                await dispatch(addBlog({
                                    title: values.title,
                                    description: values.description,
                                    owner:ownerId
                                })).unwrap()
                                resetForm()
                            } catch (error) {
                                
                            } finally {
                                setSubmitting(false)
                            }
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="flex flex-col gap-5">

                                {/* Title */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        📌 Title
                                    </label>
                                    <Field
                                        name="title"
                                        type="text"
                                        placeholder="Enter blog title"
                                        className={`border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white
                                            ${errors.title && touched.title ? 'border-red-400' : 'border-gray-300'}`}
                                    />
                                    {errors.title && touched.title && (
                                        <p className="text-red-500 text-xs">{errors.title}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        📝 Description
                                    </label>
                                    <Field
                                        name="description"
                                        as="textarea"
                                        rows="4"
                                        placeholder="Write your blog description..."
                                        className={`border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white resize-none
                                            ${errors.description && touched.description ? 'border-red-400' : 'border-gray-300'}`}
                                    />
                                    {errors.description && touched.description && (
                                        <p className="text-red-500 text-xs">{errors.description}</p>
                                    )}
                                </div>

                                {/* Owner */}
                                {/* <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        👤 Owner
                                    </label>
                                    <Field
                                        as="select"
                                        name="owner"
                                        style={{ color: '#374151' }}
                                        className={`border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white w-full
                                            ${errors.owner && touched.owner ? 'border-red-400' : 'border-gray-300'}`}
                                    >
                                        <option value="" disabled>-- Select Owner --</option>
                                        {ownersData?.map(item => (
                                            <option key={item.id} value={item.id} style={{ color: '#374151' }}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Field>
                                    {errors.owner && touched.owner && (
                                        <p className="text-red-500 text-xs">{errors.owner}</p>
                                    )}
                                </div> */}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            ⏳ Submitting...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            🚀 Publish Blog
                                        </span>
                                    )}
                                </button>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>

        </div>
    )
}

export default AddBlog