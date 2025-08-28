import React from 'react'
import { Navigate } from 'react-router-dom';

const ProfileCompletionCheckRoute = ({children}) => {
    const isLoginedLocalStorage=false
    const profileCompletionDone=false
    if(!profileCompletionDone){
        return <Navigate to={"/auth/login"} />
    }
    
}

export default ProfileCompletionCheckRoute