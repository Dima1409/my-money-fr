import { useState, useEffect } from "react";
import { TopIcon } from "components/Icons/Icons";
import { Icon, ToTop } from "./ButtonToTop.styled";
import { theme } from "theme/theme";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ToTop>
      {showTopBtn && (
        <Icon onClick={goToTop}>
          <TopIcon color={theme.colors.accentActive} />
        </Icon>
      )}
    </ToTop>
  );
};
export default ScrollToTop;
