import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRouter from "./routing/route/PublicRouter";
import PublicRoute from "./routing/route/PublicRoute";
import Login from "./views/auth/Login";
import { Navigate } from 'react-router-dom'
import ProfileCompletionCheckRoute from './routing/route/ProfileCompletionCheckRoute';
import InhouseRouter from './routing/route/InhouseRouter';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/*"
        element={
          <ProfileCompletionCheckRoute>
            <InhouseRouter />
          </ProfileCompletionCheckRoute>
        }
      />
      {/* <Route path="/fill/*"
        element={
          <PublicRoute>
            <PublicRouter />
          </PublicRoute>
        }
      /> */}
      <Route path="/auth/*"
        element={
          <PublicRoute>
            <PublicRouter />
          </PublicRoute>
        }
      />

    </Routes>
  )
}

export default MainRouter;