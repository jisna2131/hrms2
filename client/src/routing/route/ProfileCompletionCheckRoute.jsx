import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setToken } from '../../redux/Features/authSlice';

const ProfileCompletionCheckRoute = ({children}) => {

   const dispatch = useDispatch()

   const token = useSelector((state)=>state.auth.accessToken)


   


 if(!token){
   const TempToken = localStorage.getItem('token');
   if(TempToken)
   {
      dispatch(setToken(TempToken));
      return children
   }
else
 return   <Navigate to="/auth/login" />
 }else{
    return children
 }

}

export default ProfileCompletionCheckRoute




