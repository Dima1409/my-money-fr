import { useState, ChangeEvent, FormEvent } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);

  const hideShowPassword = () => {
    setShow(!show);
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    //dispatch
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>Login form</div>
      <label>
        Email
        <input
          type="text"
          name="email"
          value={email}
          onChange={inputChange}
          required
        ></input>
      </label>
      <label>
        Password
        <input
          type={show ? "text" : "password"}
          name="password"
          value={password}
          onChange={inputChange}
          required
        ></input>
        <button type="button" onClick={hideShowPassword}>
          {show ? "hide" : "show"}
        </button>
      </label>
      <button type="submit" disabled={!email || !password}>
        LogIn
      </button>
    </form>
  );
};

export default LoginForm;
