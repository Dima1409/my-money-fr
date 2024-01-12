import styled from "styled-components";
import { theme } from "theme/theme";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const Modal = styled.div`
  position: relative;
  background-color: ${theme.colors.accent};
  padding: 50px 10px;
  border-radius: ${theme.radii.normal};
  max-width: calc(100vw - 80px);
  max-height: calc(100vh - 20px);
`;
const ButtonClose = styled.button`
  position: absolute;
  border: none;
  border-radius: ${theme.radii.small};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  top: 12px;
  right: 12px;
`;

export { Overlay, Modal, ButtonClose };
