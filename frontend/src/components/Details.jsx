// import React, { useState } from 'react'

// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

// import { useNavigate } from 'react-router-dom'


// function Details() {
//     const {blog} =useSelector(state=>state.myReducer)
//     const navigate=useNavigate()

//   return (
//     <>
//     <button onClick={()=>navigate('/home', { state: { keepData: true } })}>Back</button>
//     <div>Details
//     <p>{blog.title}</p>
//     </div>
//     </>
//   )
// }

// export default Details



import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Details() {
    const { blog } = useSelector(state => state.myReducer)
    const navigate = useNavigate()
    
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Top Bar */}
            <div className="bg-purple-700 px-4 py-1.5 flex justify-center items-center">
                <span className="text-white text-xs font-medium">
                    👤 Welcome, <span className="font-bold capitalize">{localStorage.getItem('username') || 'User'}</span>
                </span>
            </div>

            {/* Navbar */}
        <nav className="bg-white w-full shadow-md px-4 py-3 flex justify-between items-center">
    <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-purple-600">
        📝 Blog App
    </h1>
    <button
        onClick={() => navigate('/home', { state: { keepData: true } })}
        className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition text-xs sm:text-sm"
    >
        ← Back
    </button>
</nav>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-8">

                {blog ? (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                        {/* Blog Header */}
                        <div className="bg-purple-600 px-6 py-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">{blog.title}</h1>
                            <div className="flex flex-wrap gap-3 mt-3">
                                {/* Owner */}
                                {blog.owner && (
                                    <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                                        ✍️ {blog.owner_name || blog.owner}
                                    </span>
                                )}
                                {/* Slug */}
                                {blog.slug && (
                                    <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                                        🔗 {blog.slug}
                                    </span>
                                )}
                                {/* Total Comments */}
                                {blog.total_comments !== undefined && (
                                    <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                                        💬 {blog.total_comments} Comments
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Blog Body */}
                        <div className="px-6 py-6">

                            {/* Description */}
                            <p className="text-gray-700 text-base leading-relaxed">{blog.description}</p>

                            {/* Divider */}
                            <hr className="my-6 border-gray-200" />

                            {/* Comments Section */}
                            {blog.comments && blog.comments.length > 0 ? (
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                                        💬 Comments ({blog.comments.length})
                                    </h2>
                                    <div className="flex flex-col gap-3">
                                        {blog.comments.map((comment, index) => (
                                            <div key={index} className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                                <p className="text-gray-700 text-sm">{comment.description}</p>
                                                <p className="text-purple-500 text-xs mt-1 font-medium">
                                                    — {comment.commented_by}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <span className="text-4xl">💬</span>
                                    <p className="text-gray-400 text-sm mt-2">No comments yet</p>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
                            <p className="text-gray-400 text-xs">Blog ID: #{blog.id || 'N/A'}</p>
                            <button
                                onClick={() => navigate('/home', { state: { keepData: true } })}
                                className="text-purple-600 text-xs font-medium hover:underline"
                            >
                                ← Back to Blogs
                            </button>
                        </div>

                    </div>
                ) : (
                    /* No Blog Found */
                    <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-4 text-center">
                        <span className="text-5xl">📭</span>
                        <h2 className="text-xl font-bold text-gray-800">Blog not found</h2>
                        <p className="text-gray-500 text-sm">The blog you're looking for doesn't exist.</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
                        >
                            Go Back Home
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Details