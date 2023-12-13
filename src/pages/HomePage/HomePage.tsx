import Header from "components/Header";
import UserMenu from "components/UserMenu";
import useAuth from "hooks/useAuth";
// import Operations from "components/Operations";
// import Wallets from "components/Wallets";
// import AllOperations from "components/HistoryOperations/AllOperations";

const HomePage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  return (
    <>
      <Header>
        <span>Мої гроші</span>
      </Header>
      {/* {isLoggedIn && <UserMenu></UserMenu>} */}
      {isLoggedIn && <div>Name: {user.name}</div>}
      {isLoggedIn && <div>Email: {user.email}</div>}
      {isLoggedIn && (
        <img
          src={user.avatarURL}
          alt="User Avatar"
          className="user-avatar"
          width={250}
        />
      )}

      {/* <Operations></Operations>
      <Wallets></Wallets>
      <AllOperations /> */}
    </>
  );
};

export default HomePage;
