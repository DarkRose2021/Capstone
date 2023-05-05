import React from 'react'

const Login = () => {

  return (
    <div className='login'>
      <h1>Login</h1>
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