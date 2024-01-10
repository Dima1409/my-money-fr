import RegisterForm from "components/RegisterForm";
import { HeaderWelcome } from "pages/HomePage/HomePage.styled";

const RegisterPage: React.FC = () => {
  return (
    <>
      <HeaderWelcome>Реєстрація нового користувача</HeaderWelcome>
      <RegisterForm></RegisterForm>
    </>
  );
};

export default RegisterPage;
