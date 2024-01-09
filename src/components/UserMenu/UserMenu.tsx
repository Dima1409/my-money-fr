import useAuth from "hooks/useAuth";
import { UserWrapper, User, Logout } from "./userMenu.styled";
import { logout } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AiOutlineLogout } from "react-icons/ai";
import { theme } from "theme/theme";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      {isLoggedIn && (
        <UserWrapper>
          <User>{user.name}</User>
          {user.avatarURL && (
            <img
              src={user.avatarURL}
              alt="User Avatar"
              className="user-avatar"
              width={150}
            />
          )}

          <Logout onClick={() => dispatch(logout())}>
            <AiOutlineLogout color={theme.colors.light} size={16} />
          </Logout>
        </UserWrapper>
      )}
    </>
  );
};
export default UserMenu;
