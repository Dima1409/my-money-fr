import useAuth from "hooks/useAuth";
import { useState } from "react";
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
import { Formik } from "formik";
import FormValidation from "components/FormValidation";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoggedIn, user } = useAuth();
  const { validationUpdate, InputError } = FormValidation;
  const { name, email } = user;
  const initialState = {
    name: name,
    email: email,
  };
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { isOpen, close, toggle } = useToggle();

  const handleSubmit = async (values: typeof initialState) => {
    dispatch(
      editUser({
        name: values.name,
        email: values.email,
      })
    );
    close();
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
              <Formik
                initialValues={initialState}
                validationSchema={validationUpdate}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <FormEdit autoComplete="off">
                    <LabelName htmlFor="name">
                      Ім'я:
                      <InputEdit
                        className={
                          !formik.errors.name && formik.values.name !== ""
                            ? "success"
                            : formik.errors.name && formik.values.name !== ""
                            ? "error"
                            : "default"
                        }
                        type="text"
                        name="name"
                        id="name"
                      ></InputEdit>
                      <InputError name="name" />
                    </LabelName>
                    <LabelName htmlFor="email">
                      Email:
                      <InputEdit
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
                      ></InputEdit>
                      <InputError name="email" />
                    </LabelName>
                    <BtnSubmit
                      type="submit"
                      disabled={!!formik.errors.name || !!formik.errors.email}
                    >
                      Зберегти
                    </BtnSubmit>
                  </FormEdit>
                )}
              </Formik>
            </InfoWallets>
          )}
        </Modal>
      )}
    </>
  );
};
export default UserMenu;
