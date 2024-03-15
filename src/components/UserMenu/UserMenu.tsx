import useAuth from "hooks/useAuth";
import { useState, ChangeEvent } from "react";
import Avatar from "react-avatar-edit";
import {
  UserWrapper,
  User,
  AvatarContainer,
  AvatarWrapper,
  UserAvatar,
  Logout,
  EditButton,
  InputEdit,
  DeleteAvatar,
} from "./userMenu.styled";
import {
  logout,
  editUser,
  refreshUser,
  updateUserAvatar,
  deleteAvatar,
} from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { theme } from "theme/theme";
import { LogOutIcon, EditIcon } from "components/Icons/Icons";
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
import useRetinaDisplay from "hooks/useRetina/useRetinaDisplay";
import AvatarImage from "../../images/desktop/avatar-min.png";
import AvatarImage2x from "../../images/desktop2x/avatar2x-min.png";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const onBeforeFileLoad = (elem: ChangeEvent<HTMLInputElement>) => {
    if (elem.target.files && elem.target.files[0].size > 200 * 1024) {
      alert("Максимум 200 kB!");
      elem.target.value = "";
    }
  };
  const { isLoggedIn, user } = useAuth();
  const { validationUpdate, InputError } = FormValidation;
  const { name, email, avatarURL } = user;
  const initialState = {
    name: user.name,
    email: user.email,
  };
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showAvatarInfo, setShowAvatarInfo] = useState(false);
  const [avatar, setAvatar] = useState(avatarURL);
  const { isOpen, close, toggle } = useToggle();
  const avatarImageSrc = useRetinaDisplay(AvatarImage, AvatarImage2x);
  const imageExtensions = ["png", "jpg", "jpeg", "webp"];

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const splitToFindExtension = e.target.value.split(".");
    const fileExtension = splitToFindExtension[splitToFindExtension.length - 1];

    if (!imageExtensions.includes(fileExtension)) {
      window.alert("Avatar should be an image: png, jpg, jpeg, webp");
      return;
    }

    const imgFile = files[0];

    if (imgFile) {
      const value = { avatarURL: imgFile };
      setAvatar(value);
      await dispatch(updateUserAvatar({ value }));
      dispatch(refreshUser());
    }
  };

  const deleteUserAvatar = async () => {
    await dispatch(deleteAvatar());
    dispatch(refreshUser());
  };

  const handleLogOut = async () => {
    const shouldLogout = window.confirm("Вийти з облікового запису?");
    if (shouldLogout) {
      dispatch(logout());
    }
  };

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
          {user.avatarURL ? (
            <AvatarContainer>
              <UserAvatar
                onClick={() => {
                  setShowAvatarInfo(true);
                  toggle();
                }}
                src={avatar}
                alt="User Avatar"
              />
            </AvatarContainer>
          ) : (
            <AvatarContainer>
              <UserAvatar
                onClick={() => {
                  setShowAvatarInfo(true);
                  toggle();
                }}
                src={avatarImageSrc}
                alt="user-avatar"
              />
            </AvatarContainer>
          )}
          <User>{user.name}</User>
          <EditButton
            type="button"
            onClick={() => {
              setShowUserInfo(true);
              toggle();
            }}
          >
            <EditIcon color={theme.colors.transfers} />
          </EditButton>
          <Logout onClick={handleLogOut}>
            <LogOutIcon color={theme.colors.red} />
          </Logout>
        </UserWrapper>
      )}
      {isOpen && (
        <Modal
          onClick={() => {
            setShowUserInfo(false);
            setShowAvatarInfo(false);
            close();
          }}
        >
          {showAvatarInfo && user && (
            <>
              <AvatarWrapper onChange={handleFileChange}>
                <Avatar
                  width={240}
                  height={180}
                  exportSize={10}
                  onBeforeFileLoad={onBeforeFileLoad}
                  mimeTypes="image/jpeg, image/png, image/jpg, image/webp"
                  label="Виберіть новий файл"
                />
                <p>*максимум 200kB</p>
                {avatar && (
                  <DeleteAvatar onClick={deleteUserAvatar}>
                    <p>Видалити аватар</p>
                  </DeleteAvatar>
                )}
              </AvatarWrapper>
            </>
          )}
          {showUserInfo && user && (
            <InfoWallets>
              <Formik
                initialValues={initialState}
                validationSchema={validationUpdate}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <FormEdit autoComplete="off" onSubmit={formik.handleSubmit}>
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
                        value={formik.values.name}
                        onChange={formik.handleChange}
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
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="text"
                        name="email"
                        id="email"
                      ></InputEdit>
                      <InputError name="email" />
                    </LabelName>
                    <BtnSubmit
                      type="submit"
                      disabled={
                        !!formik.errors.name ||
                        !!formik.errors.email ||
                        (formik.values.name === name &&
                          formik.values.email === email)
                      }
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
