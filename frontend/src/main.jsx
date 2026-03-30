import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import myStore, { persistedStore } from './store/index.js'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import {Provider} from 'react-redux'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import Register from './components/Register.jsx'
import Landing from './components/Landing.jsx'
import Details from './components/Details.jsx'
import AddBlog from './components/AddBlog.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import RequestForChange from './components/RequestForChange.jsx'

createRoot(document.getElementById('root')).render(
  
  <Provider store={myStore}>
    <PersistGate persistor={persistedStore}>
      
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Landing}/>
        <Route path='/home' Component={Home}/>
        <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/logout' Component={Logout}/>
        <Route path='/details' Component={Details}/>
        <Route path='/addblog' Component={AddBlog}/>
        <Route path='/change-group' Component={AdminPanel}/>
        <Route path='/requestforchange' Component={RequestForChange}/>
      </Routes>
      </BrowserRouter>
   </PersistGate>
    </Provider>

)
