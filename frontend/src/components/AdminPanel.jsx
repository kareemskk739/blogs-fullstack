import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserGroup, getPendingRequests, clearMessages } from '../AdminSlice'

function AdminPanel() {
    const { pendingRequests, message, errorMessage } = useSelector(state => state.adminreducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPendingRequests())
    }, [])


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => dispatch(clearMessages()), 5000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const handleAction = async (req_id, action) => {
        try {
            await dispatch(changeUserGroup({
                req_id: req_id,
                action: action
            })).unwrap()
            dispatch(getPendingRequests())
        } catch (error) {

        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-gray-100 px-4 py-10">


            {errorMessage ? (
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="w-64 sm:w-72 md:w-80 aspect-square bg-white/80 backdrop-blur-lg border border-red-200 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center p-6">
                        <div className="text-5xl mb-3">🚫</div>
                        <h2 className="text-xl sm:text-2xl font-bold text-red-600">Access Denied</h2>
                        <p className="text-sm text-gray-600 mt-2">You don't have permission to view this page</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <h1 className="text-center text-2xl sm:text-3xl font-bold text-purple-700 mb-5">
                        🛠 Admin Panel
                    </h1>

                    {/* Success Message */}
                    {message && (
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-center text-sm mb-6 max-w-lg mx-auto">
                            ✅ {typeof message === 'object' ? message.message : message}
                        </div>
                    )}

                    {pendingRequests.length === 0 ? (
                        <p className="text-center text-gray-500 text-lg">
                            No pending requests
                        </p>
                    ) : (
                        <div className="flex justify-center">
                            <div className={`grid gap-6 max-w-6xl mx-auto w-full
                                ${pendingRequests.length === 1
                                    ? 'grid-cols-1 justify-items-center'
                                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                }`}
                            >
                                {pendingRequests.map((req, index) => (
                                    <div
                                        key={req.id}
                                        className="w-full max-w-sm bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >

                                        <div>
                                            <p className="font-semibold text-gray-800 text-base">
                                                👤 {req.username}
                                            </p>
                                            <p className="text-sm text-purple-600">
                                                Requested: {req.requested_role}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {req.created_at}
                                            </p>
                                        </div>


                                        {req.reason && (
                                            <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                                💬 {req.reason}
                                            </p>
                                        )}


                                        <div className="flex gap-2 mt-auto">
                                            <button
                                                onClick={() => handleAction(req.id, 'Approved')}
                                                className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition transform hover:scale-105 active:scale-95"
                                            >
                                                ✅ Approve
                                            </button>
                                            <button
                                                onClick={() => handleAction(req.id, 'Rejected')}
                                                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition transform hover:scale-105 active:scale-95"
                                            >
                                                ❌ Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default AdminPanel