import styled from "styled-components";
import { theme } from "theme/theme";
import { SelectStyled } from "components/Statistic/Statistics.styled";

const HistorySelect = styled(SelectStyled)`
  width: 250px;
`;

const OperationWrapper = styled.ul`
  margin-top: 10px;
  padding: 0;
`;

const OperationsHeader = styled.h2`
  text-align: center;
`;

const Operation = styled.li`
  max-width: 400px;
  border-radius: ${theme.radii.normal};
  padding: 10px 12px;
  margin: 6px auto;
  font-size: ${theme.fontSizes.extraSmall};
  position: relative;
  ${theme.mq.tablet} {
    position: relative;
    max-width: 550px;
    display: flex;
    flex-direction: column;
    padding: 10px 60px;
    font-size: ${theme.fontSizes.normal};
  }
  ${theme.mq.desktop} {
    max-width: 600px;
  }
`;

const OperationSort = styled.div`
  display: flex;
`;

const OperationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 2px;
  padding: 4px;
  font-family: ${theme.fonts.comfortaa};
  font-size: ${theme.fontSizes.extraSmall};
  color: ${theme.colors.accentActive};
  ${theme.mq.tablet} {
    gap: 8px;
  }
`;

const TypeWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  ${theme.mq.tablet} {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }
`;

const OperationResult = styled.span`
  font-family: ${theme.fonts.merriweather};
  font-size: ${theme.fontSizes.extraSmall};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.accentActive};
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.small};
  }
`;

const BtnDelete = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.radii.round};
  border: ${theme.borders.normal} ${theme.colors.darkRed};
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s;
  &:hover,
  &:focus {
    box-shadow: 0 0 8px ${theme.colors.dark};
    transform: scale(1.05);
  }
`;

const BtnEdit = styled(BtnDelete)`
  bottom: 10px;
  right: 60px;
  border: ${theme.borders.normal} ${theme.colors.valid};
`;

export {
  OperationWrapper,
  OperationsHeader,
  HistorySelect,
  OperationSort,
  TypeWrapper,
  Operation,
  OperationInfo,
  OperationResult,
  BtnDelete,
  BtnEdit,
};
