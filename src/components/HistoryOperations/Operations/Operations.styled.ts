import styled from "styled-components";
import { theme } from "theme/theme";

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

const OperationResult = styled.span`
  font-family: ${theme.fonts.merriweather};
  text-transform: "uppercase";
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.dark};
`;

const BtnDelete = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: ${theme.borders.none};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: ${theme.radii.round};
  border: ${theme.borders.normal} ${theme.colors.accent};
  background-color: transparent;
  cursor: pointer;
`;

export {
  OperationWrapper,
  OperationsHeader,
  OperationSort,
  Operation,
  OperationInfo,
  OperationResult,
  BtnDelete,
};
