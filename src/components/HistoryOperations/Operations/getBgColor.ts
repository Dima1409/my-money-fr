import { theme } from "theme/theme";
const getBackgroundColor = (type: string): string => {
  switch (type) {
    case "income":
      return theme.colors.green;
    case "expense":
      return theme.colors.red;
    default:
      return theme.colors.transfers;
  }
};

export default getBackgroundColor;
