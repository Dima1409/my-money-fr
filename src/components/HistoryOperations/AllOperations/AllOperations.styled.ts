import styled from "styled-components";

const OperationWrapper = styled.ul`
  margin-top: 10px;
  border: 1px solid gray;
  list-style: none;
  padding: 0;
`;
const OperationsHeader = styled.h2`
  color: teal;
  text-align: center;
`;
const Operation = styled.li`
  max-width: 600px;
  border: 1px solid gray;
  margin: 2px auto;
  margin-left: 12px;
  font-size: 14px;
  position: relative;
`;
const Marker = styled.div`
  position: absolute;
  display: block;
  top: 50%;
  left: -12px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;
const OperationInfo = styled.span`
  margin-right: 2px;
`;
const BtnDelete = styled.button`
  position: absolute;
  right: 0;
  border: none;
  background-color: red;
  margin-left: 12px;
  cursor: pointer;
`;

export {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
  BtnDelete,
};
