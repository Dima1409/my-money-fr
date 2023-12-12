import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { login } from "../../redux/auth/operations";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

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
    dispatch(
      login({
        email: email,
        password: password,
      })
    );
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>Login form</div>
      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={inputChange}
          required
        ></input>
      </label>
      <label htmlFor="password">
        Password
        <input
          type={show ? "text" : "password"}
          name="password"
          id="password"
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
