import React from 'react'
import { Navigate } from 'react-router-dom';

const ProfileCompletionCheckRoute = ({children}) => {
 const profile= true

 if(!profile){
 return   <Navigate to="/auth/login" />
 }else{
    return children
 }

}

export default ProfileCompletionCheckRoute