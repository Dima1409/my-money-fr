import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { register } from "../../redux/auth/operations";
import { Formik, FormikHelpers } from "formik";
import {
  FormLogin,
  FormLabel,
  FormInput,
  ButtonShow,
  ButtonSubmit,
} from "components/LoginForm/LoginForm.styled";
import FormValidation from "components/FormValidation";
import { Slide } from "react-toastify";
import { notifyError, ToastContainer } from "utils/toastify";
import { BiShow, BiHide } from "react-icons/bi";
import { theme } from "theme/theme";

const RegisterForm: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const { validationRegister, InputError } = FormValidation;
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
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    ).then((res) => {
      if (res.payload === "Request failed with status code 409") {
        notifyError("Користувач з таким email вже існує");
      }
      if (res.payload.user) {
        resetForm();
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationRegister}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <FormLogin autoComplete="off">
          <ToastContainer transition={Slide} />
          <FormLabel>
            Ім'я
            <FormInput
              className={
                !formik.errors.name && formik.values.name !== ""
                  ? "success"
                  : formik.errors.name && formik.values.name !== ""
                  ? "error"
                  : "default"
              }
              type="text"
              name="name"
              required
            ></FormInput>
            <InputError name="name" />
          </FormLabel>
          <FormLabel>
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
              required
            ></FormInput>
            <InputError name="email" />
          </FormLabel>
          <FormLabel>
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
              required
            ></FormInput>
            <ButtonShow type="button" onClick={hideShowPassword}>
              {show ? (
                <BiShow color={theme.colors.light} />
              ) : (
                <BiHide color={theme.colors.light} />
              )}
            </ButtonShow>
            <InputError name="password" />
          </FormLabel>
          <ButtonSubmit
            type="submit"
            disabled={
              !!formik.errors.name ||
              !!formik.errors.email ||
              !!formik.errors.password
            }
          >
            Реєстрація
          </ButtonSubmit>
        </FormLogin>
      )}
    </Formik>
  );
};

export default RegisterForm;
