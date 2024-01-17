import styled from "styled-components";
import { theme } from "theme/theme";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const PageButton = styled.button<{ $isCurrent: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.merriweather};
  width: 30px;
  height: 30px;
  border-radius: ${theme.radii.small};
  background-color: ${({ $isCurrent }) =>
    $isCurrent ? theme.colors.accentActive : theme.colors.background};
  color: ${({ $isCurrent }) =>
    $isCurrent ? theme.colors.light : theme.colors.accent};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.accentActive};
    color: white;
  }
`;

export { PaginationContainer, PageButton };
