import styled from "styled-components";
import { theme } from "theme/theme";
import { GrClose } from "react-icons/gr";

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

const IconClose = styled(GrClose)`
  width: 15px;
  height: 15px;
  color: ${theme.colors.accent};
  transition: 0.3s;
  &:hover {
    cursor: pointer;
  }
  ${theme.mq.tablet} {
    width: 22px;
    height: 22px;
  }
`;

const Modal = styled.div`
  position: relative;
  background-color: ${theme.colors.accent};
  padding: 50px 30px;
  border-radius: ${theme.radii.normal};
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);
  ${theme.mq.tablet} {
    padding: 55px 250px;
  }
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

export { Overlay, Modal, ButtonClose, IconClose };
