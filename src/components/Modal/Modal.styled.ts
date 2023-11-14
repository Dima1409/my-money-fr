import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const Modal = styled.div`
  position: relative;
  padding: 4px;
  background-color: teal;
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);
`;
const ButtonClose = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
`;

export { Overlay, Modal, ButtonClose };
