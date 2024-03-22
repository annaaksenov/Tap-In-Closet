//import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { AddItem } from './AddItem';
import { Closet } from './Closet';
import { DressMe } from './DressMe';
import { Outfits } from './Outfits';
import { EditOutfit } from './EditOutfit';

export default function App() {
/* The current page that should display
    'sign-up' - the registration page
    'log-in' - the log in page
    'closet' - the closet tab
    'dress-me' - the dress me tab / mode
    'outfits' - outfits tab
*/
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function logout() {
    sessionStorage.removeItem('token')
    setIsAuthenticated(false);
  }

  function login() {
    setIsAuthenticated(true);
  }
  useEffect(() => {
      const token = sessionStorage.getItem('token');
      console.log('token', token);
      if (token) {
       setIsAuthenticated(true);
      }
  }, []);
return (
    <>
    <Routes>
        <Route path='/' element={<RegistrationForm login={login}/>}/>
        <Route path='login' element={<LoginForm login={login}/>}/>

        <Route
          path="header"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Header logout={logout} />
              <Outlet />
            </RequireAuth>
          }>
          <Route index element={<Closet />} />
          <Route path="dress-me" element={<DressMe />} />
          <Route path="outfits" element={<Outfits />} />
        </Route>
        <Route
          path="add-item"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <AddItem />
            </RequireAuth>
          }
        />
        <Route
          path="edit-outfit/:outfitId"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <EditOutfit />
            </RequireAuth>
          }
        />
    </Routes>
    </>
  );
}

function RequireAuth({ children, isAuthenticated}) {
  const location = useLocation();
  console.log('Pre isAuth', isAuthenticated);
  if (!isAuthenticated) {
    console.log('Post isAuth', isAuthenticated);
     return <Navigate to="/login" state={{ from: location }} replace />;
  }
return children;
}
