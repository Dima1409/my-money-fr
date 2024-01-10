import LoginForm from "components/LoginForm";
import { HeaderWelcome } from "pages/HomePage/HomePage.styled";

const LoginPage: React.FC = () => {
  return (
    <>
      <HeaderWelcome>Вхід в обліковий запис</HeaderWelcome>
      <LoginForm></LoginForm>
    </>
  );
};

export default LoginPage;
