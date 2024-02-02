import styled from "styled-components";
import { theme } from "theme/theme";

const WalletsContainer = styled.div`
  padding: 0 6px;
  margin-bottom: 8px;
`;

const WalletsHeader = styled.h2`
  text-align: center;
  font-family: ${theme.fonts.merriweather};
  color: ${theme.colors.light};
  font-size: ${theme.fontSizes.bold};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 4px;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.extraBold};
  }
`;

const WalletsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const LabelName = styled.label`
  position: relative;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.light};
  font-family: ${theme.fonts.merriweather};
  margin-bottom: 2px;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.extraBold};
    margin-bottom: 5px;
  }
`;

const LabelList = styled(LabelName)`
  margin: 0;
`;

const BtnEdit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: ${theme.radii.small};
  background-color: ${theme.colors.light};
  transition: 0.3s;
  margin-right: 5px;
  &:disabled {
    opacity: 0.5;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px ${theme.colors.accentActive};
  }
  ${theme.mq.tablet} {
    width: 45px;
    height: 45px;
  }
`;

const BtnDelete = styled(BtnEdit)`
  margin-left: auto;
  margin-right: 6px;
`;

const BtnRename = styled(BtnEdit)`
  background-color: ${theme.colors.green};
`;

const BtnCloseEdit = styled(BtnEdit)`
  background-color: ${theme.colors.red};
`;

const IsEditing = styled.div`
  margin: 0 auto;
  text-align: center;
  font-family: ${theme.fonts.merriweather};
  color: ${theme.colors.light};
  font-size: ${theme.fontSizes.normal};
`;

const FormEdit = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.colors.light};
  border: ${theme.borders.normal};
  border-radius: ${theme.radii.small};
  padding: 6px;
`;

const FormCreateNew = styled(FormEdit)`
  padding: 6px;
`;

const InputCreateNew = styled.input`
  outline: none;
  border: ${theme.borders.normal} transparent;
  border-radius: ${theme.radii.small};
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.dark};
  padding: 4px 6px;
  height: 30px;
  margin-bottom: 2px;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.bold};
  }
  &.success {
    border-color: ${theme.colors.valid};
  }
  &.error {
    border-color: ${theme.colors.invalid};
  }
  &:invalid {
    border-color: ${theme.colors.invalid};
  }
`;

const BtnSubmit = styled.button`
  border: none;
  border-radius: ${theme.radii.small};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.accentActive};
  width: 80px;
  height: 30px;
  padding: 10px;
  transition: 0.3s;
  &:disabled {
    opacity: 0.5;
  }
  &:hover:not(:disabled) {
    cursor: pointer;
    box-shadow: 0 0 5px ${theme.colors.accentActive};
  }
  ${theme.mq.tablet} {
    width: 140px;
    height: 40px;
  }
`;

const InfoWallets = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  ${theme.mq.tablet} {
    width: 420px;
  }
`;

export {
  WalletsContainer,
  WalletsHeader,
  WalletsWrapper,
  LabelName,
  LabelList,
  BtnDelete,
  BtnEdit,
  FormEdit,
  FormCreateNew,
  IsEditing,
  BtnSubmit,
  InputCreateNew,
  InfoWallets,
  BtnRename,
  BtnCloseEdit,
};
