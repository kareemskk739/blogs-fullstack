import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyMessage, RequestChange } from '../mySlice'

function RequestForChange() {
  const { message, errorMessage } = useSelector((state) => state.myReducer)
  console.log(message,errorMessage)
  const [reason, setReason] = useState('')
  const dispatch = useDispatch()
  const handleRequest = async () => {
    try {
      await dispatch(RequestChange({
        requested_role: 'Editor',
        reason: reason
      })).unwrap()
    }
    catch (e) {
      setTimeout(() => {
        dispatch(emptyMessage())
      }, 5000)
    }
    finally {
      setTimeout(() => {
        dispatch(emptyMessage())
      }, 5000)
    }

  }
  useEffect(() => {
    dispatch(emptyMessage())
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-gray-100 flex items-center justify-center px-4 py-10">


      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 
                    animate-fadeIn">


        <div className="text-center mb-6">
          <div className="text-5xl animate-bounce">✍️</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">
            Request Editor Access
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Tell admin why you need Editor access
          </p>
        </div>

        {message != null && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 
                        rounded-lg text-center text-sm mb-5 animate-slideDown">
            {message}
          </div>
        )}

        {errorMessage != null && (
          <div className="bg-red-200 border border-green-300 text-red-700 px-4 py-3 
                        rounded-lg text-center text-sm mb-5 animate-slideDown">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Reason
            </label>

            <textarea
              rows="4"
              placeholder="Explain clearly why you need Editor access..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-purple-400 
                       resize-none transition duration-200 
                       hover:border-purple-400"
            />
          </div>

          <button
            onClick={handleRequest}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl 
                     font-semibold tracking-wide shadow-md 
                     hover:from-purple-700 hover:to-purple-800 
                     transition duration-300 transform hover:scale-105 active:scale-95"
          >
            🚀 Submit Request
          </button>

        </div>

      </div>
    </div>
  )
}

export default RequestForChange