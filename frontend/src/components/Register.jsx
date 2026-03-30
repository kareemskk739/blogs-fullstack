import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerThunk } from '../authSlice'
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Oval } from 'react-loader-spinner'

function Register() {
  const [loader, setLoader] = useState(false)
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(1, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      {loader ? <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

        <Oval
          height={150}
          width={150}
          color="#7c3aed"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#c4b5fd"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />

      </div> :
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 m-5">

            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-purple-600">📝 BlogSpace</h1>
              <p className="text-gray-500 mt-2 text-sm">Create your account</p>
            </div>

            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignupSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  await dispatch(registerThunk({
                    username: values.username,
                    email: values.email,
                    password: values.password
                  })).unwrap()
                  setLoader(true)

                  resetForm()
                } catch (error) {

                } finally {
                  setSubmitting(false)
                  setTimeout(() => {
                    navigate('/login')
                  }, 3000)
                }
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="flex flex-col gap-3">

                  {/* Username */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <Field
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      className={`border text-center rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white
                    ${errors.username && touched.username ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {errors.username && touched.username && (
                      <p className="text-red-500 text-xs">{errors.username}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      className={`border rounded-lg text-center px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white
                    ${errors.email && touched.email ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      className={`border text-center rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white
                    ${errors.password && touched.password ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className={`border text-center rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white
                    ${errors.confirmPassword && touched.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                  </button>

                  {/* Login Link */}
                  <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <span
                      onClick={() => {
                        setLoader(true)
                        setTimeout(() => {
                          navigate('/login')
                        }, 2000)
                      }
                      }

                      className="text-purple-600 font-medium cursor-pointer hover:underline"
                    >
                      Login
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

export default Register