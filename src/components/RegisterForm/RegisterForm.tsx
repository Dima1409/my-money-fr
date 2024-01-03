import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { register } from "../../redux/auth/operations";
import {
  Form,
  FormHeader,
  FormLabel,
  FormInput,
  ButtonShow,
  ButtonSubmit,
} from "components/LoginForm/LoginForm.styled";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

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
    dispatch(
      register({
        email,
        name,
        password,
      })
    );
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <FormHeader>Register form</FormHeader>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={inputChange}
          required
        ></FormInput>
      </FormLabel>
      <FormLabel>
        Email
        <FormInput
          type="text"
          name="email"
          value={email}
          onChange={inputChange}
          required
        ></FormInput>
      </FormLabel>
      <FormLabel>
        Password
        <FormInput
          type={!show ? "text" : "password"}
          name="password"
          value={password}
          onChange={inputChange}
          required
        ></FormInput>
        <ButtonShow
          type="button"
          aria-label="Toggle password visibility"
          onClick={showHidePassword}
        >
          {!show ? "i" : "!"}
        </ButtonShow>
      </FormLabel>
      <ButtonSubmit type="submit" disabled={!name || !email || !password}>
        Register
      </ButtonSubmit>
    </Form>
  );
};

export default RegisterForm;
