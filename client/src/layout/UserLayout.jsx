import React, { useEffect, useState } from 'react'
import Footer from '../components/user/Footer'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/user/Header'
import UserHeader from '../components/user/UserHeader'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserData, saveUserData } from '../redux/features/authSlice'



const UserLayout= () => {
  
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log("location.pathname",location.pathname)
  
  
  const checkUser = async ()=>{
    try{
      const response = await axiosInstance({
        method:"GET",
        url:"/user/check-user",
      });
      dispatch(saveUserData());
    }catch(error){
      dispatch(clearUserData());
      console.log(error); 
    }

  };
  console.log("isUserAuth====",isUserAuth);
  console.log("userData",userData);

  useEffect(()=>{
    checkUser();

  },[location.pathname]);


  return (
    <div>
      {isUserAuth?<UserHeader />:<Header />} 
      <div className='min-h-96'>
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;