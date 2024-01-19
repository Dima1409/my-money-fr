import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { register } from "../../redux/auth/operations";
import {
  FormLogin,
  FormLabel,
  FormInput,
  ButtonShow,
  ButtonSubmit,
} from "components/LoginForm/LoginForm.styled";
import { BiShow, BiHide } from "react-icons/bi";
import { theme } from "theme/theme";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
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
    <FormLogin onSubmit={handleSubmit} autoComplete="off">
      <FormLabel>
        Ім'я
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
        Пароль
        <FormInput
          type={show ? "text" : "password"}
          name="password"
          value={password}
          onChange={inputChange}
          required
        ></FormInput>
        <ButtonShow type="button" onClick={hideShowPassword}>
          {show ? (
            <BiShow color={theme.colors.light} />
          ) : (
            <BiHide color={theme.colors.light} />
          )}
        </ButtonShow>
      </FormLabel>
      <ButtonSubmit type="submit" disabled={!name || !email || !password}>
        Реєстрація
      </ButtonSubmit>
    </FormLogin>
  );
};

export default RegisterForm;
