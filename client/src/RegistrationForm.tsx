import { type FormEvent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export function RegistrationForm({login}) {
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
        body: JSON.stringify(userData)
    };
    const res = await fetch('/api/auth/sign-up', req);
    if (!res.ok) {
      throw new Error(`fetch Error ${res.status}`);
    }
    const user = await res.json();
    // return user;
     console.log('Registered', user);
  } catch (err) {
    alert(`Error registering user ${err}`);
  } finally {
    setIsLoading(false);
    navigate('/login');
  }
}
async function handleDemo() {
  try {
    const req = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username: 'demo'})
    }
    const res = await fetch(`/api/auth/login`, req);
    if (!res.ok) {
      throw new Error(`fetch Error ${res.status}`);
    }
    const { user, token } = await res.json();
    sessionStorage.setItem('token', token);
    console.log('Signed In', user, '; received token:', token);
  } catch (err) {
    console.error('Error inserting dummy data:', err);
  } finally {
    setIsLoading(false);
    navigate('/header');
    login();
  }
}

  return (
    <>
    <div className="register-container ">
      <div className="row">
        <div className="column-full">
          <h2>Sign up</h2>
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
            <button disabled={isLoading} className="green-button">Sign up</button>
          </div>
        </div>
        </form>
        <div className="row2 d-block">
          <div className="align-column">
            <p>---- OR ----</p>
          </div>
          <div className="align-column margin-bottom">
            <Link to="/login">Login</Link>
          </div>
          <div className="align-column">
            <p>---- OR ----</p>
          </div>
         <div className="align-column margin-bottom">
          <button onClick={handleDemo}>DEMO</button>
        </div>
      </div>
    </div>
    </>
  )
}
