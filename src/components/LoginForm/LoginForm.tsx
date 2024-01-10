import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { login } from "../../redux/auth/operations";
import {
  Form,
  FormHeader,
  FormLabel,
  FormInput,
  ButtonShow,
  ButtonSubmit,
} from "./LoginForm.styled";
import { BiShow, BiHide } from "react-icons/bi";
import { theme } from "theme/theme";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
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
    <Form onSubmit={handleSubmit}>
      <FormHeader>Login form</FormHeader>
      <FormLabel htmlFor="email">
        Email
        <FormInput
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={inputChange}
          required
        ></FormInput>
      </FormLabel>
      <FormLabel htmlFor="password">
        Password
        <FormInput
          type={show ? "text" : "password"}
          name="password"
          id="password"
          value={password}
          onChange={inputChange}
          required
        ></FormInput>
        <ButtonShow type="button" onClick={hideShowPassword}>
          {show ? <BiShow color={theme.colors.light} /> : <BiHide color={theme.colors.light} />}
        </ButtonShow>
      </FormLabel>
      <ButtonSubmit type="submit" disabled={!email || !password}>
        LogIn
      </ButtonSubmit>
    </Form>
  );
};

export default LoginForm;
