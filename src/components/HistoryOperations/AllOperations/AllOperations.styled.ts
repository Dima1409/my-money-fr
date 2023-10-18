import styled from "styled-components";

const OperationWrapper = styled.ul`
  margin-top: 10px;
  border: 1px solid gray;
  list-style: none;
`;
const OperationsHeader = styled.h2`
  color: teal;
  text-align: center;
`;
const Operation = styled.li`
  margin-right: 20px;
  position: relative;
`;
const Marker = styled.div`
position: absolute;
display: block;
top: 50%;
left: -12px;
transform: translateY(-50%);
width: 6px;
height: 6px;
border-radius: 50%;
`
const OperationInfo = styled.span`
margin-right: 10px;
`

export { OperationWrapper, OperationsHeader, Operation, Marker, OperationInfo};
