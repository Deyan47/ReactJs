const Login = () => {
  return (
    <div>
      <div className="authForm">
        <form method="POST">
          <label htmlFor="username">Username </label>
          <br />
          <input type="text" name="username" />
          <br />

          <label htmlFor="password">Password </label>
          <br />
          <input type="password" name="password" />
          <br />

          <input id="loginBtn" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
