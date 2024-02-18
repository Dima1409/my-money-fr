import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Select, Option } from "components/Forms/IncomeForm/IncomeForm.styled";
import { theme } from "theme/theme";

const SelectStyled = styled(Select)`
  width: 120px;
  margin: 0;
  margin-left: auto;
`;

const SelectWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 200px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const OptionStyled = styled(Option)``;

const Month = styled.div`
  text-align: center;
  font-family: ${theme.fonts.merriweather};
  color: ${theme.colors.accent};
  margin-bottom: 10px;
  & span {
    font-weight: ${theme.fontWeight.bold};
    font-family: ${theme.fonts.open_sans};
    text-decoration: underline;
  }
`;

const HeaderTotal = styled.h2`
  text-align: center;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.accent};
  margin-bottom: 10px;
  font-family: ${theme.fonts.merriweather};
  ${theme.mq.tablet} {
    margin-bottom: 20px;
  }
`;

const TabListStyled = styled(TabList)`
  border-bottom: ${theme.borders.normal} ${theme.colors.accent};
  margin: 0 0 20px;
  padding: 0;
  text-align: center;
`;

const TabsStyled = styled(Tabs)`
  margin: 0 auto;
  border-bottom: ${theme.borders.normal} ${theme.colors.accent};
  max-width: 1000px;
`;
const TabPanelStyled = styled(TabPanel)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &.react-tabs__tab-panel--selected {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const TabStyled = styled(Tab)`
  font-size: ${theme.fontSizes.extraSmall};
  font-family: ${theme.fonts.comfortaa};
  color: ${theme.colors.accent};
  display: inline-block;
  border: 1px solid transparent;
  border-bottom: none;
  bottom: -1px;
  position: relative;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.normal};
  }
  &.react-tabs__tab--selected {
    color: ${theme.colors.accentActive};
    border-color: ${theme.colors.accent};
  }
`;

export {
  SelectStyled,
  OptionStyled,
  SelectWrapperStyled,
  Month,
  HeaderTotal,
  TabListStyled,
  TabPanelStyled,
  TabsStyled,
  TabStyled,
};
