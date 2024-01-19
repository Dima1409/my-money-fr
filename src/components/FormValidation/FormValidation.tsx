import * as yup from "yup";
import { ErrorMessage } from "formik";
import { Error, Correct } from "./FormValidation.styled";
import { emailPattern, passwordPattern } from "utils/patterns";

const validationLogin = yup.object().shape({
  email: yup
    .string()
    .required("Поле email обов'якове")
    .matches(emailPattern, "Недійсна або неприпустима email-адреса")
    .email(),
  password: yup
    .string()
    .matches(passwordPattern, "Введіть від 6 до 14 символів")
    .max(32, "14 або менше символів")
    .min(6, "6 або більше символів")
    .required("Поле пароль обов'язкове"),
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
  InputCorrect,
  InputError,
};

export default FormValidations;
