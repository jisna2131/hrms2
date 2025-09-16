import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRouter from "./routing/route/PublicRouter";
import PublicRoute from "./routing/route/PublicRoute";
import ProfileCompletionCheckRoute from "./routing/route/ProfileCompletionCheckRoute";
import MainRouterLayout from "./routing/route/MainRouterLayout"



const MainRouter = () => {
  
  
  
  
  return (
    <Routes>
      <Route
        path="/auth/*"
        element={<PublicRoute><PublicRouter/></PublicRoute>}/>
       

      <Route
        path="/*"
        element={
          <ProfileCompletionCheckRoute>
            <MainRouterLayout/>
          </ProfileCompletionCheckRoute>
        }
      />
  {/* Admin routes (protected) */}
      <Route
        path="/admin/*"
        element={
          <ProfileCompletionCheckRoute>
            <adminRouter/>
          </ProfileCompletionCheckRoute>
        }
      />



    </Routes>
  );
};

export default MainRouter;
