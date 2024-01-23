//import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';

export default function App() {
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
// const [page, setPage] = useState<PageTpe>('sign-up');
  return (
    <>
      <Routes>
        <Route path='/' element={<RegistrationForm/>} />
          <Route path='login' element={<LoginForm/>} />
      </Routes>
    </>
  );
}
