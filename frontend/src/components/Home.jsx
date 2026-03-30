
// import React,{useState} from 'react'

// import { useNavigate } from 'react-router-dom'


// import { useSelector,useDispatch } from 'react-redux'

// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// import PaginationItem from '@mui/material/PaginationItem';

// import { getBlogsData,getCommentsData,getOwnersData,searchByBlog,getPaginatedResults} from '../mySlice'

// import { logoutUser } from '../authSlice'

// function Home() {
//   const [clickedState,setClickedState]=useState('')
//   const [searchVal,setSearchVal]=useState('')
//   const[page,setPage]=useState(1)
//   const navigate=useNavigate()
//   const dispatch=useDispatch()
//   const clicked=(value,e)=>{
//      e.preventDefault()
//      setClickedState(value)
//      switch (value) {
//       case 'blogs':
//         dispatch(getBlogsData())
//         break
//       case 'comments':
//         dispatch(getCommentsData())
//         break
//       case 'owners':
//         dispatch(getOwnersData())
//         break
//       default:
//         break;
//      }

//   }
 
//   const {blogsData,ownersData,commentsData,errorMessage,accessToken,refreshToken,isLoggedIn}=useSelector(state=>state.myReducer)
//  console.log(blogsData)
//   const logoutBtn=()=>{
//      dispatch(logoutUser({ access: accessToken, refresh: refreshToken }))
     
//      navigate('/login')
     
//  }
  
//   return (
//     <>
//     <div>Home</div>
    
// {/* <Link to="/login" className="btn">
//   Login
// </Link>
// <Link to="/login" className="btn">
//   Login
// </Link> */}
//   {isLoggedIn&& <button onClick={()=>navigate('/login')}>Login</button>}
//     <button onClick={()=>{dispatch(logoutUser())}}></button>
//     {/* {errorMessage&&<p>{errorMessage}</p>} */}

    
//     <ul className="nav nav-pills  nav-justified">

//   <li className="nav-item">
//     <a className={clickedState=='blogs'?'nav-link active': "nav-link"} onClick={(e)=>clicked('blogs',e)}  href="#">Blogs</a>
//   </li>
//   <li className="nav-item">
//     <a className={clickedState=='owners'?'nav-link active': "nav-link"} onClick={(e)=>clicked('owners',e)} href="#">Owners</a>
//   </li>
//   <li className="nav-item">
//     <a className={clickedState=='comments'?'nav-link active': "nav-link"} onClick={(e)=>clicked('comments',e)} href="#">Comments</a>
//   </li>
//   {/* <li class="nav-item">
//     <a class="nav-link disabled" aria-disabled="true">Disabled</a>
//   </li> */}
// </ul>

// <input
//   type="search"
//   placeholder="search for a blog"
//   value={searchVal}
//   onChange={(e) => {
//     const value = e.target.value;
//     setSearchVal(value);
//     dispatch(searchByBlog(value));
//   }}
// />

// <div>
//   <button onClick={logoutBtn}>logout</button>
//   {clickedState=='blogs'&&blogsData&&blogsData.map((i,index)=><p key={index}>{i.title}</p>)}
//    {!blogsData&&errorMessage&&<p>{errorMessage}</p>}
//    {clickedState=='comments'&& commentsData.results.map((i,index)=><p key={index}>{i.description}</p>)}
//     {clickedState=='owners'&& ownersData.results.map((i,index)=><p key={index}>{i.name}</p>)}
  

// </div> 
// <Stack spacing={2}>
//       <Pagination count={blogsData?blogsData.length:1} color="secondary" renderItem={(item) => (
//           <PaginationItem
            
//             {...item}
//           />
//         )} 
        
//         onChange={async(e,value)=>{
//           setPage(value)
//           await dispatch(getPaginatedResults(value)).unwrap()
//         }}
//         page={page}
//         />
//     </Stack>
//    <p>{`page${page}`}</p>

//     </>
//   )
// }

// export default Home





import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import PaginationItem from '@mui/material/PaginationItem'
import { getBlogsData, getCommentsData, getOwnersData, searchByBlog, getPaginatedResults,getBlog } from '../mySlice'
import { clearError, logoutUser } from '../authSlice'
import { setClickedState } from '../mySlice'

function Home() {
 
  const [searchVal, setSearchVal] = useState('')
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(()=>{
  dispatch(clearError())
  },[])

  const { blogsData, ownersData, commentsData, errorMessage,clickedState} = useSelector(state => state.myReducer)
  const { accessToken, refreshToken, isLoggedIn } = useSelector(state => state.authReducer)


  const clicked = async (value, e) => {
    e.preventDefault()
     dispatch(setClickedState(value))
    switch (value) {
      case 'blogs':
        dispatch(getBlogsData())
        break
      case 'comments':
        dispatch(getCommentsData())
        break
      case 'owners':
        dispatch(getOwnersData())
        console.log(ownersData)
        break
      default:
        break
    }
  }

  const logoutBtn = async () => {
    setTimeout(()=>navigate('/login'),2000)
    await dispatch(logoutUser({ access: accessToken, refresh: refreshToken })).unwrap() 
    

  }

  return (
    <>
    
    {!localStorage.getItem('access') ? <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10 flex flex-col items-center gap-5 text-center">
            
            {/* Icon */}
            <div className="bg-green-100 rounded-full p-5">
                <span className="text-5xl">✅</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Logged Out Successfully!</h2>
            <p className="text-gray-500 text-sm">You have been safely logged out of your account.</p>

         
            

        </div>
    </div>
    :
    <div className="min-h-screen bg-gray-100 pb-5">
      {/* profile */}
      <div className="bg-pink-700  px-4 py-4 flex flex justify-between items-center ">
    <p className="text-purple-200 text-sm m-0" >📝 BlogSpace</p>
    <p className="text-white text-sm font-medium m-0">
        👤 Welcome,{' '}
        <span className="font-bold text--500 capitalize m-0">
            {localStorage.getItem('username') || 'User'}
        </span>
    </p>
</div>
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
   <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-purple-600 tracking-wide w-full sm:w-auto text-center sm:text-left">
    📝 BlogSpace
</h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {!localStorage.getItem('access')
            ? <button
    onClick={() => navigate('/login')}
     style={{ borderRadius: '15px' }}
    className="bg-purple-600 text-white px-4 py-2 rounded-full border-1 border-purple-400 hover:bg-purple-700 transition w-40 w-auto text-sm"
>
    Login
</button>
            : <button
                onClick={logoutBtn}
                style={{ borderRadius: '15px' }}
    className="bg-red-600 text-white px-4 py-2 rounded-full border-1 border-purple-400 hover:bg-purple-700 transition w-full w-auto text-sm"
              >
                Logout
              </button>
          }
        </div>
      </nav>

      {/* Nav Pills */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center my-5 px-4">
        {['blogs', 'owners', 'comments'].map((item) => (
          <button
            key={item}
            onClick={(e) => clicked(item, e)}
            className={`capitalize px-6 py-2 rounded-full font-medium transition w-60 sm:w-auto
              ${clickedState === item
                ? 'bg-purple-600 text-white shadow'
                : 'bg-white text-purple-600 border border-purple-600 hover:bg-purple-50'
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-center px-4 mb-6">
        
        <input
          type="search"
          placeholder="🔍 Search for a blog..."
          value={searchVal}
          onChange={(e) => {
            const value = e.target.value
            console.log(errorMessage)
            setSearchVal(value)
            dispatch(searchByBlog({'clickedState':clickedState,'val':value}))
          }}
          className="w-80 text-center sm:w-1/2 lg:w-96  border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-sm"
        />
      </div>

      {/* Error Message */}
       {/* {errorMessage && (
 <div className="flex justify-center mb-4">
  <div className="w-64 border border-black bg-red-100 text-red-700 px-4 py-3 rounded-lg text-center">
    <p>No data found by your search</p>
  </div>
</div>
)} */}
    
    
    { errorMessage && <div className="mx-auto w-1/2 mb-4 bg-red-200 text-red-700 p-3 rounded-lg text-center">
    <p style={{paddingBottom:'0px'}}>no data found by your search</p>
    </div>}
    
      
     <button
    onClick={() => navigate('/addblog')}
    className="group flex items-center justify-center m-auto mb-5 gap-2 
bg-gradient-to-r from-gray-500  to-gray-400 
text-white px-7 py-3 rounded-full font-semibold text-sm tracking-wide

shadow-lg shadow-orange-200/50
hover:shadow-xl hover:shadow-purple-600/200

transition-all duration-400 ease-in-out
transform hover:scale-110 active:scale-100

relative overflow-hidden"
>
     <span className="text-xl transition-transform duration-300 group-hover:rotate-35 group-hover:scale-140">
    ✍️
  </span>

  {/* Text */}
  <span className="relative z-10">
    Add New Blog
  </span>
</button>


      {/* Content Area */}
      

      <div className="px-4 flex flex-wrap justify-center gap-4">

    {/* Blogs */}
    {(clickedState === 'blogs') && blogsData.results && blogsData.results.map((blog, index) => (
        <div key={index}
            onClick={async() => {

                await dispatch(getBlog(blog.id)).unwrap()
                navigate('/details', { state: { keepData: true } })
            }}
            className=" w-full sm:w-[48%] lg:w-[23%] rounded-2xl shadow p-5 hover:bg-gray-200 transition flex flex-col justify-between h-100  gap-2 cursor-pointer pb-3"
        >
            <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{blog.title}</h2>
            <p className="text-gray-500 text-sm flex-1 line-clamp-1">{blog.description}</p>
            <p className="text-blue-400 text-sm flex-1 ">{blog.owner_name}</p>
        </div>
    ))}

    {/* Comments */}
    {clickedState === 'comments' && commentsData &&commentsData.map((comment, index) => (
        <div key={index} className="bg-white w-full sm:w-[48%] lg:w-[23%] rounded-2xl shadow p-5 hover:shadow-lg transition">
            <p className="text-gray-700 text-sm"><span className="text-green-700">Blog Name:</span> {comment.blog_title}</p>
            <p className="text-gray-700 text-sm"><span className="text-green-700">Comment:</span> {comment.description}</p>
            <p className="text-gray-500 text-sm mt-2">— {comment.commented_by}</p>
        </div>
    ))}

    {/* Owners */}
    {clickedState === 'owners' && ownersData && ownersData.map((owner, index) => (
        <div key={index} className="bg-white w-full sm:w-[48%] lg:w-[23%] rounded-2xl shadow p-5 hover:shadow-lg transition">
            <p className="text-gray-800 font-semibold text-base">👤 {owner.name}</p>
        </div>
    ))}

      </div>

      {/* Empty States */}
      {clickedState === 'blogs' && blogsData?.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No blogs found.</p>
      )}
      {clickedState === 'comments' && commentsData?.results?.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No comments found.</p>
      )}
      {clickedState === 'owners' && ownersData?.results?.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No owners found.</p>
      )}

      {/* Pagination — only show for blogs */}
      {clickedState === 'blogs' && blogsData && (
        <div className="flex flex-col items-center mt-20 gap-2">
          <Stack spacing={2}>
            <Pagination
              count={blogsData.count?Math.floor(blogsData.count/4)+1:1}
              color="secondary"
              renderItem={(item) => (
                <PaginationItem {...item} />
              )}
              onChange={async (e, value) => {
                setPage(value)
                await dispatch(getPaginatedResults({value,searchVal})).unwrap()
              }}
              page={page}
              sx={{
                '& .MuiPaginationItem-root': {
            // ✅ Different spacing for different devices
            margin: {
                xs: '0 0.5px',    // below 600px — mobile
                sm: '0 4px',    // 600px+      — tablet
                md: '0 6px',    // 900px+      — laptop
                lg: '0 14px',   // 1200px+     — desktop
                xl: '0 17px',   // 1536px+     — large desktop
            },
            // ✅ Different font size for different devices
            fontSize: {
                xs: '10px',
                sm: '12px',
                md: '14px',
                lg: '16px',
            }
        }

    }}
            />
          </Stack>
          <p className="text-gray-400 text-sm">Page {page}</p>
        </div>
      )}

    </div>}
    </>
  )
}

export default Home