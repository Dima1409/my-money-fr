import styled from "styled-components";

const InfoOperation = styled.p`
  text-align: center;
  margin: 0;
`;

const OperationWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid aqua;
  margin-bottom: 10px;
  padding: 0;
`;
const Operation = styled.li`
  padding: 4px;
  border: 1px solid azure;
  background-color: orange;
  color: white;
`;

export { InfoOperation, OperationWrapper, Operation };
