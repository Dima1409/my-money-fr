import useAuth from "hooks/useAuth";

const UserMenu: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      {isLoggedIn && (
        <>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <img
            src={user.avatarURL}
            alt="User Avatar"
            className="user-avatar"
            width={150}
          />
        </>
      )}
    </>
  );
};
export default UserMenu;
