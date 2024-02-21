import { Link, useNavigate } from 'react-router-dom';
import { type FormEvent, useState } from 'react';
//import { TapInCloset } from './TapInCloset';

export function LoginForm({login}) {
  const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/login', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      //return {user, token};
      navigate('/header');
       console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
      login();
    }
  }
  return (
    <>
    <div className="register-container">
      <div className="row">
        <div className="column-full">
          <h2>Login</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="column-half">
            <label className="d-block margin-bottom">
              username
              <input className="d-block width-full text-padding" required name="username" type="text" />
            </label>
            <label className="d-block margin-bottom">
              password
              <input className="d-block width-full text-padding" required name="password" type="password" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="center">
            <button disabled={isLoading} className="green-button">Login</button>
          </div>
        </div>
      </form>
        <div className="row2 d-block">
          <div className="align-column">
            <p>---- OR ----</p>
          </div>
          <div className="align-column margin-bottom">
            <Link to="/">Sign Up</Link>
          </div>
        </div>
    </div>
    </>
  )
}
