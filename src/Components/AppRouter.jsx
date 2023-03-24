import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/login";

const AppRouter = () => {

  const isAuth = true

  return (
    isAuth
      ?
      <Routes>
        <Route path='/about' element={ <About/> }/>
        <Route path='/posts' element={ <Posts/> }/>
        <Route path='/posts/:id' element={ <PostIdPage/> }/>
        <Route path='/error' element={ <Error/> }/>
        <Route path='/*' element={ <Navigate to='/posts' replace/> }/>
      </Routes>
      :
      <Routes>
        <Route path='/login' element={ <Login/> } />
        <Route path='/*' element={ <Navigate to='/login' replace/> }/>
      </Routes>

  );
};

export default AppRouter;