import React from 'react'

const Signin = () => {
  return (
    <div className='signup'>
      <h1>Signup</h1>
      <div className='form'>
        <div>
          <form>
            <label htmlFor="email">Email:</label><br />
            <input id='email' name='email' type='email' placeholder='Email' /><br />
            <label htmlFor="email">Confirm Email:</label><br />
            <input id='email' name='email' type='email' placeholder='Email' /><br />
            <label htmlFor="password">Password:</label><br />
            <input id='password' name='password' type='password' placeholder='Password' /><br />
            <label htmlFor="password">Confirm Password:</label><br />
            <input id='password' name='password' type='password' placeholder='Password' /><br />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Signin