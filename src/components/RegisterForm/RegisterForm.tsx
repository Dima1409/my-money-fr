import { useState, ChangeEvent, FormEvent } from "react";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);

  const showHidePassword = () => {
    setShow(!show);
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
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
    console.log({ name, email, password });
    // dispatch
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={inputChange}
          required
        ></input>
      </label>
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
        <button
          type="button"
          aria-label="Toggle password visibility"
          onClick={showHidePassword}
        >
          {show ? "hide" : "show"}
        </button>
      </label>
      <button type="submit" disabled={!name || !email || !password}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
