const Register = () => {
  return (
    <div>
      <div className="authForm">
        <form>
          <label htmlFor="username">Username </label>
          <br />
          <input type="text" name="username" />
          <br />

          <label htmlFor="password">Password </label>
          <br />
          <input type="password" name="password" />
          <br />

          <label htmlFor="repeatPassword">Repeat password </label>
          <br />
          <input type="password" name="repeatPassword" />
          <br />
          <input id="registerBtn" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Register;
