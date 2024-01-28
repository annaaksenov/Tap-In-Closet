import { type FormEvent, useState } from "react";
import { Link } from 'react-router-dom';

export function RegistrationForm() {
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
        </div>
    </div>
    </>
  )
}
