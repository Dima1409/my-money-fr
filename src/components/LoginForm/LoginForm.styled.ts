import styled from "styled-components";

const Form = styled.form`
  background-color: teal;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 8px;
`;

const FormHeader = styled.h3`
  color: orange;
  font-size: 20px;
  text-align: center;
`;

const FormLabel = styled.label`
  position: relative;
  width: 80%;
  color: orange;
  margin-bottom: 14px;
`;

const FormInput = styled.input`
  display: block;
  padding: 0;
  background-color: aqua;
  width: 100%;
  border: none;
  min-height: 22px;
`;

const ButtonShow = styled.button`
  border: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 0;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonSubmit = styled.button`
  display: block;
  margin: 0 auto;
  border: none;
  min-height: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export { Form, FormHeader, FormLabel, FormInput, ButtonShow, ButtonSubmit };
