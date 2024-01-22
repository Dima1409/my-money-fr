import * as yup from "yup";
import { ErrorMessage } from "formik";
import { Error, Correct } from "./FormValidation.styled";
import { emailPattern, passwordPattern, namePattern } from "utils/patterns";

const validationLogin = yup.object().shape({
  email: yup
    .string()
    .required("Поле email обов'якове")
    .matches(emailPattern, "Недійсна або неприпустима email-адреса")
    .email(),
  password: yup
    .string()
    .matches(passwordPattern, "Введіть від 6 до 14 символів")
    .required("Поле пароль обов'язкове"),
});

const validationRegister = yup.object().shape({
  name: yup
    .string()
    .required("Поле Ім'я обов'якове")
    .matches(namePattern, "Недійсне або неприпустиме ім'я"),
  email: yup
    .string()
    .required("Поле email обов'якове")
    .matches(emailPattern, "Недійсна або неприпустима email-адреса")
    .email(),
  password: yup
    .string()
    .matches(passwordPattern, "Введіть від 6 до 14 символів")
    .required("Поле пароль обов'язкове"),
});

const validationUpdate = yup.object().shape({
  name: yup
    .string()
    .required("Поле Ім'я обов'якове")
    .matches(namePattern, "Недійсне або неприпустиме ім'я"),
  email: yup
    .string()
    .required("Поле email обов'якове")
    .matches(emailPattern, "Недійсна або неприпустима email-адреса")
    .email(),
});

const InputError = ({ name }: { name: string }) => {
  return (
    <Error>
      <ErrorMessage
        name={name}
        render={(message) => <p style={{ margin: 0 }}>{message}</p>}
      />
    </Error>
  );
};

const InputCorrect = ({ name }: { name: string }) => {
  return (
    <Correct>
      <p style={{ margin: 0 }}>{name}</p>
    </Correct>
  );
};

const FormValidations = {
  validationLogin,
  validationRegister,
  validationUpdate,
  InputCorrect,
  InputError,
};

export default FormValidations;
