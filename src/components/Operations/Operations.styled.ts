import styled from "styled-components";
import { NavLink } from "react-router-dom";

const InfoOperation = styled.p`
  text-align: center;
  margin: 0;
`;

const OperationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid aqua;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 0;
  max-width: 550px;
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
