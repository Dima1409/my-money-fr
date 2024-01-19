import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { login } from "../../redux/auth/operations";
import { Formik, FormikHelpers } from "formik";
import FormValidation from "components/FormValidation";
import {
  FormLogin,
  FormLabel,
  FormInput,
  ButtonShow,
  ButtonSubmit,
} from "./LoginForm.styled";
import { BiShow, BiHide } from "react-icons/bi";
import { theme } from "theme/theme";

const LoginForm: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const { validationLogin, InputCorrect, InputError } = FormValidation;
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const hideShowPassword = () => {
    setShow(!show);
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    );
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationLogin}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <FormLogin>
          <FormLabel htmlFor="email">
            Email
            <FormInput
              className={
                !formik.errors.email && formik.values.email !== ""
                  ? "success"
                  : formik.errors.email && formik.values.email !== ""
                  ? "error"
                  : "default"
              }
              type="text"
              name="email"
              id="email"
              required
            ></FormInput>
            {!formik.errors.email && formik.values.email !== "" ? (
              <InputCorrect name="Email is correct" />
            ) : null}
            <InputError name="email" />
          </FormLabel>
          <FormLabel htmlFor="password">
            Пароль
            <FormInput
              className={
                !formik.errors.password && formik.values.password !== ""
                  ? "success"
                  : formik.errors.password && formik.values.password !== ""
                  ? "error"
                  : "default"
              }
              type={show ? "text" : "password"}
              name="password"
              id="password"
              required
            ></FormInput>
            <ButtonShow type="button" onClick={hideShowPassword}>
              {show ? (
                <BiShow color={theme.colors.light} />
              ) : (
                <BiHide color={theme.colors.light} />
              )}
            </ButtonShow>
            {!formik.errors.password && formik.values.password !== "" ? (
              <InputCorrect name="Password is correct" />
            ) : null}
            <InputError name="password" />
          </FormLabel>
          <ButtonSubmit
            disabled={!!formik.errors.email || !!formik.errors.password}
            type="submit"
          >
            Увійти
          </ButtonSubmit>
        </FormLogin>
      )}
    </Formik>
  );
};

export default LoginForm;
