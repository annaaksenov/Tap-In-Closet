//import { useEffect, useState } from 'react';
import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import { RegistrationForm } from './RegistrationForm';
// import { LoginForm } from './LoginForm';
// import { PrivateRoutes } from './PrivateRoutes';
import { TapInCloset } from './TapInCloset';

export default function App() {
  // const [page, setPage] = useState<PageType>('sign-up');

/*{  {const [serverData, setServerData] = useState('');}
{useEffect(() => {
  async function readServerData() {
    const resp = await fetch('/api/hello');
    const data = await resp.json();

    console.log('Data from server:', data);

    setServerData(data.message);
  }

  readServerData();
}, []);}}*/
/* The current page that should display
    'sign-up' - the registration page
    'log-in' - the log in page
    'closet' - the closet tab
    'dress-me' - the dress me tab / mode
    'outfits' - outfits tab
*/
  return (
    <>
      {/* <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path='/tap-in-closet' element={<TapInCloset />}/>
        </Route>
        <Route path='/' element={<RegistrationForm/>} />
        <Route path='login' element={<LoginForm/>} />
      </Routes> */}
      <TapInCloset />
    </>
  );
}
