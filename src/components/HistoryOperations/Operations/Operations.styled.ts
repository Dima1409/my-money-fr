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

const OperationSort = styled.div`
display: flex;
`

const OperationInfo = styled.span`
display: block;
  font-size: 10px;
  margin-right: 2px;
  padding: 4px;
`;
const BtnDelete = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width:20px;
  height: 20px;
  border-radius: 50%;
  background-color: orange;
  cursor: pointer;
`;

export {
  OperationWrapper,
  OperationsHeader,
  OperationSort,
  Operation,
  OperationInfo,
  BtnDelete,
};
