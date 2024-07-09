import React from 'react'
  
const Login = () => {
  return (
<div className="login">
  <h2>Login</h2>
  <form id="loginForm" action="/submit" method="POST">
    <label for="userId">User ID:</label>
    <input type="text" id="userId" name="userId" required/>
    <label for="password">Password:</label>
    <input id="password" name="password" required/>
    <button type="submit">Login</button>
  </form>
</div>
  )
}

export default Login