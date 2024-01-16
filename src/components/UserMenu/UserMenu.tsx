import useAuth from "hooks/useAuth";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  UserWrapper,
  User,
  Logout,
  EditButton,
  InputEdit,
} from "./userMenu.styled";
import { logout, editUser } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AiOutlineLogout } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { theme } from "theme/theme";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import {
  FormEdit,
  LabelName,
  BtnSubmit,
  InfoWallets,
} from "components/WalletsList/WalletsList.styled";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoggedIn, user } = useAuth();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const { name, email } = user;
  const initialState = {
    name: name,
    email: email,
  };
  const [formData, setFormData] = useState(initialState);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { isOpen, close, toggle } = useToggle();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatchTyped(editUser(formData));
      close();
    } catch (error) {
      console.log(error);
    }
  };

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
          <EditButton
            type="button"
            onClick={() => {
              setShowUserInfo(true);
              toggle();
            }}
          >
            <AiTwotoneEdit color={theme.colors.light} size={16} />
          </EditButton>
          <Logout onClick={() => dispatch(logout())}>
            <AiOutlineLogout color={theme.colors.light} size={16} />
          </Logout>
        </UserWrapper>
      )}
      {isOpen && (
        <Modal
          onClick={() => {
            setShowUserInfo(false);
            close();
          }}
        >
          {showUserInfo && user && (
            <InfoWallets>
              <FormEdit onSubmit={handleSubmit} autoComplete="off">
                <span>Ім'я:</span>
                <LabelName>
                  <InputEdit
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  ></InputEdit>
                </LabelName>
                <span>Email:</span>
                <LabelName>
                  <InputEdit
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  ></InputEdit>
                </LabelName>
                <BtnSubmit type="submit">Зберегти</BtnSubmit>
              </FormEdit>
            </InfoWallets>
          )}
        </Modal>
      )}
    </>
  );
};
export default UserMenu;
