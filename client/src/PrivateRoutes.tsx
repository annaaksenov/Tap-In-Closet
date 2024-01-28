import { Outlet, Navigate } from "react-router-dom";

export function PrivateRoutes() {
  let auth = {'token':false};

  return (
    {auth.token ? <Outlet/> : <Navigate to="/login"/>}
  )
}
