import React, { useState } from "react";
import {
  KeyboardWrapper,
  InputElement,
  KeyElement,
  // BtnAct,
  KeyWrapper,
} from "./Keyboard.styled";
import * as math from "mathjs";

// const ClearButton: React.FC<{ handleClear: () => void }> = ({
//   handleClear,
// }) => <BtnAct onClick={handleClear}>Clear</BtnAct>;

// const ActButton: React.FC<{ handleSubmit: () => void }> = ({
//   handleSubmit,
// }) => <BtnAct onClick={handleSubmit}>Ok</BtnAct>;

const Input: React.FC<{ input: string }> = ({ input }) => (
  <InputElement>{input}</InputElement>
);

interface ButtonProps {
  handleClick: (value: string) => void;
  children: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, children }) => (
  <KeyElement onClick={() => handleClick(children)}>{children}</KeyElement>
);

const Keyboard = () => {
  const [input, setInput] = useState('');
  const handleClick = (val: string) => {
    setInput(input + val);
  };
  const handleEqual = () => {
    setInput(math.evaluate(input));
  };
  // const handleClear = () => {
  //   setInput('');
  // };
  // const handleSubmit = () => {
  //   setInput("Submit");
  // };

  return (
    <KeyboardWrapper>
      <div>
        <Input input={input} />
        <KeyWrapper>
          <Button handleClick={handleClick}>7</Button>
          <Button handleClick={handleClick}>8</Button>
          <Button handleClick={handleClick}>9</Button>
          <Button handleClick={handleClick}>/</Button>
        </KeyWrapper>
        <KeyWrapper>
          <Button handleClick={handleClick}>4</Button>
          <Button handleClick={handleClick}>5</Button>
          <Button handleClick={handleClick}>6</Button>
          <Button handleClick={handleClick}>*</Button>
        </KeyWrapper>
        <KeyWrapper>
          <Button handleClick={handleClick}>1</Button>
          <Button handleClick={handleClick}>2</Button>
          <Button handleClick={handleClick}>3</Button>
          <Button handleClick={handleClick}>-</Button>
        </KeyWrapper>
        <KeyWrapper>
          <Button handleClick={handleClick}>.</Button>
          <Button handleClick={handleClick}>0</Button>
          <Button handleClick={handleEqual}>=</Button>
          <Button handleClick={handleClick}>+</Button>
        </KeyWrapper>
        {/* <KeyWrapper>
          <ClearButton handleClear={handleClear} />
          <ActButton handleSubmit={handleSubmit}></ActButton>
        </KeyWrapper> */}
      </div>
    </KeyboardWrapper>
  );
};

export default Keyboard;
