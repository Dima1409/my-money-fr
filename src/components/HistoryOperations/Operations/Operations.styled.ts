import styled from "styled-components";

const OperationWrapper = styled.ul`
  margin-top: 10px;
  list-style: none;
  padding: 0;
`;
const OperationsHeader = styled.h2`
  color: teal;
  text-align: center;
`;
const Operation = styled.li`
  max-width: 600px;
  border-radius: 4px;
  padding: 10px 4px;
  margin: 6px auto;
  font-size: 14px;
  position: relative;
`;
// const Marker = styled.div`
//   position: absolute;
//   display: block;
//   top: 50%;
//   left: -15px;
//   transform: translateY(-50%);
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
// `;
const OperationInfo = styled.span`
  margin-right: 2px;
  padding: 4px;
`;
const BtnDelete = styled.button`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  border-radius: 2px;
  padding: 2px;
  background-color: orange;
  cursor: pointer;
`;

export {
  OperationWrapper,
  OperationsHeader,
  Operation,
  OperationInfo,
  BtnDelete,
};
