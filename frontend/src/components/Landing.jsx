import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'


function Landing() {
    const navigate = useNavigate()
     const [loader, setLoader] = useState(false)

    return (
        <>
         {loader? 
         <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                              
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
  
         </div>:
        <div className="min-h-screen w-full bg-gradient-to-br from-orange-500 via-purple-500 to-red-500">

            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 py-4 ">
                <h1 className="text-white text-2xl font-bold tracking-wide">📝 BlogSpace</h1>
                <div className="flex gap-2 sm:gap-3 items-center">
                    <button
                        onClick={() => {
                           setTimeout(()=>{
                          navigate('/login')
                          },2000)
                        } }
                        className="text-white border px-3 sm:px-4  py-1.5 rounded-full text-sm hover:bg-green-500 hover:text-gray-700 transition font-medium"
                    >
                      Login
                    </button>
                   
                    <button
                        onClick={() => {
                          setLoader(true)
                          setTimeout(()=>{
                          navigate('/register')
                          },2000)
                          
                        }}
                        className=" text-orange-500 border bg-white  px-3 sm:px-4 py-1.5 rounded-full text-sm hover:bg-gray-300 transition font-medium"
                    >
                        Register
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-20 gap-6">

                {/* Badge */}
                <div className="bg-white/20 text-white text-xs px-4 py-1.5 rounded-full backdrop-blur-sm">
                    ✨ Your space to write, share and explore
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
                    Share Your Ideas
                    <span className="text-yellow-300"> With The World</span>
                </h1>

                {/* Description */}
                <p className="text-purple-200 text-base sm:text-lg max-w-xl leading-relaxed">
                    BlogSpace is your platform to write, discover and connect with amazing stories.
                    Join thousands of writers sharing their thoughts every day.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <button
                        onClick={() => {
                          setLoader(true)
                           setTimeout(()=>{
                            
                          navigate('/register')
                          },2000)
                        }}
                        className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-full font-bold text-sm hover:bg-yellow-300 transition shadow-lg hover:shadow-yellow-400/50 active:scale-95"
                    >
                        🚀 Get Started Free
                    </button>
                    <button
                        onClick={() => {
                          setLoader(true)
                           setTimeout(()=>
                            {
                           
                          navigate('/login')
                          },2000)
                        }}
                        className="bg-white/20 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/30 transition backdrop-blur-sm border border-white/30"
                    >
                        Login to Account
                    </button>
                </div>

            </div>

            {/* Features Section */}
            <div className="px-6 pb-16">
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition">
                        <span className="text-4xl">✍️</span>
                        <h3 className="text-white font-bold text-lg mt-3">Write Blogs</h3>
                        <p className="text-purple-200 text-sm mt-2">
                            Share your thoughts, stories and expertise with a global audience.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition">
                        <span className="text-4xl">🔍</span>
                        <h3 className="text-white font-bold text-lg mt-3">Discover Stories</h3>
                        <p className="text-purple-200 text-sm mt-2">
                            Explore thousands of blogs on topics you love and get inspired daily.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition">
                        <span className="text-4xl">💬</span>
                        <h3 className="text-white font-bold text-lg mt-3">Engage & Connect</h3>
                        <p className="text-purple-200 text-sm mt-2">
                            Comment on blogs, connect with writers and build your community.
                        </p>
                    </div>

                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 px-6 py-8">
                <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-3xl font-bold text-yellow-300">1K+</p>
                        <p className="text-purple-200 text-sm mt-1">Blogs Published</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-yellow-300">500+</p>
                        <p className="text-purple-200 text-sm mt-1">Active Writers</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-yellow-300">10K+</p>
                        <p className="text-purple-200 text-sm mt-1">Monthly Readers</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-6 border-t border-white/20">
                <p className="text-purple-300 text-xs">
                    © 2026 BlogSpace. Made with ❤️
                </p>
            </div>

        </div>}
        </>
    )
}

export default Landing