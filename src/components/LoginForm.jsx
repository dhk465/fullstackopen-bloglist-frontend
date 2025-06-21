const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form data-testid="login-form" onSubmit={handleSubmit}>
        <div>
          username
          <input
            data-testid="username-input"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-testid="password-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button data-testid="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
