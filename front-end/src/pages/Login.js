import React from 'react'
import { useLocation } from 'react-router-dom'

const Login = () => {
  const location = useLocation();
  
  return (
    <div className='login'>
      {
        location.pathname.toLowerCase()==="/admin"? <h1>Admin Login</h1>:<h1>Login</h1>
      }
      
      <div className='form'>
        <div>
          <form>
            <label htmlFor="email">Email:</label><br />
            <input id='email' name='email' type='email' placeholder='Email' /><br />
            <label htmlFor="password">Password:</label><br />
            <input id='password' name='password' type='password' placeholder='Password' /><br />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login