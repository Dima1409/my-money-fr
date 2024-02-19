import styled from "styled-components";
import { theme } from "theme/theme";
import {
  SelectStyled,
  OptionStyled,
} from "components/Statistic/Statistics.styled";

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
  max-width: 600px;
  border-radius: ${theme.radii.normal};
  padding: 10px 12px;
  margin: 6px auto;
  font-size: ${theme.fontSizes.extraSmall};
  position: relative;
  ${theme.mq.tablet} {
    max-width: 768px;
    display: flex;
    padding: 10px 60px;
    justify-content: space-between;
    font-size: ${theme.fontSizes.normal};
  }
  ${theme.mq.desktop} {
    max-width: 900px;
  }
`;

const OperationSort = styled.div`
  display: flex;
`;

const OperationInfo = styled.span`
  display: block;
  margin-right: 2px;
  padding: 4px;
  font-family: ${theme.fonts.comfortaa};
  color: ${theme.colors.accentActive};
  ${theme.mq.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OperationResult = styled.span`
  font-family: ${theme.fonts.merriweather};
  text-transform: "uppercase";
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.accentActive};
`;

const BtnDelete = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.radii.round};
  border: ${theme.borders.normal} ${theme.colors.darkRed};
  background-color: transparent;
  cursor: pointer;
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
};
