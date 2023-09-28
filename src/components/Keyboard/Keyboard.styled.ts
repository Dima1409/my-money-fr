import styled from "styled-components";

const KeyboardWrapper = styled.div`
  border: 1px solid orange;
  margin: 0 auto;
  padding: 10px;
`;
const InputElement = styled.div`
  border: 1px solid teal;
  min-height: 40px;
  padding: 10px 10px;
  font-size: 28px;
`;
const KeyWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const KeyElement = styled.button`
  border: none;
  cursor: pointer;
  color: #ffffff;
  opacity: 1;
  margin: 4px;
  font-size: 20px;
  background-color: teal;
  padding: 4px;
  width: 45px;
  height: 45px;
  border-radius: 10px;
`;

const BtnAct = styled(KeyElement)`
  width: 80px;
  margin: 0 10px;
`;

export { KeyboardWrapper, KeyWrapper, InputElement, KeyElement, BtnAct };
