import { useEffect } from "react";
import { Overlay, Modal as ModalStyled, ButtonClose } from "./Modal.styled";
import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";

const modalRoot = document.querySelector("#modal-root");

interface ModalProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClick, children }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClick();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClick]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <ModalStyled>
        {children}
        <ButtonClose onClick={onClick}>
          <GrClose />
        </ButtonClose>
      </ModalStyled>
    </Overlay>,
    modalRoot as Element
  );
};

export default Modal;
