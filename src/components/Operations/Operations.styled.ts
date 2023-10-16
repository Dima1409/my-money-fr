import styled from "styled-components";
import { NavLink } from "react-router-dom";

const InfoOperation = styled.p`
  text-align: center;
  margin: 0;
`;

const OperationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid aqua;
  margin-bottom: 10px;
  padding: 0;
`;
const Operation = styled(NavLink)`
  padding: 4px;
  border: 1px solid azure;
  background-color: orange;
  color: white;
  &:active {
    color: red;
  }
`;

export { InfoOperation, OperationWrapper, Operation };
