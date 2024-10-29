import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login';
import Signup from './Signup';
import Blogs from './Blog';
import Auth from './auth/auth';
import Add from './BlogAdd';
import BlogPiece from './BlogUpdate';
import PageNotFound from './404.jsx';
import UserProfile from './userProfile.jsx';

function App() {
  
  return (
    //in react-router-dom v6 Redirect,Component is replaced by Navigate,Element
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' Component={Signup}/>
          <Route element={<Auth/>}>
              <Route  path='/blogs' Component={Blogs}/>
              <Route path='/blogs/add' element={<Add/>}/>
              <Route path='/blogs/:id' element={<BlogPiece/>} />
              <Route path='/blogs/user/:id' element={<UserProfile/>} />
              <Route path='/404' element={<PageNotFound/>} />
              <Route path='*' element={<Navigate to='/404'/>} />   
          </Route> 
          

        </Routes>
      </Router>
    </>
  )
}

export default App
