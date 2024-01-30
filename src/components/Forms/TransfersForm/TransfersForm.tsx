import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Form,
  SelectWrapper,
  IconWrapper,
  Select,
  Option,
  Input,
  ButtonsWrapper,
  ButtonSubmit,
} from "../IncomeForm/IncomeForm.styled";
import { transfersOperation } from "../../../redux/operations/operations";
import { ISearchWallet } from "types/data";
import Loader from "components/Loader";
import useWallets from "hooks/useWallets";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAll } from "../../../redux/categories/operations";

import {
  DoneIcon,
  CloseIcon,
  WalletIcon,
  AmountIcon,
} from "components/Icons/Icons";
import { amountPattern } from "utils/patterns";
import { theme } from "theme/theme";

const initialState = {
  walletFrom: "",
  walletTo: "",
  amount: "",
  // type: "transfer",
};

const TransfersForm: React.FC = () => {
  const { isLoading, wallets } = useWallets();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    dispatchTyped(getAll());
  }, [dispatchTyped]);

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "walletFrom" && value === formData.walletTo) {
      setFormData((prevData) => ({
        ...prevData,
        walletTo: "",
      }));
    } else if (name === "walletTo" && value === formData.walletFrom) {
      setFormData((prevData) => ({
        ...prevData,
        walletFrom: "",
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      dispatchTyped(transfersOperation(formData));
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setFormData(initialState);
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      {isLoading ? (
        <Loader type="spin" />
      ) : (
        <>
          <SelectWrapper>
            <IconWrapper>
              <WalletIcon color={theme.colors.invalid} />
            </IconWrapper>
            <Select
              style={{ marginRight: "auto" }}
              name="walletFrom"
              onChange={handleInputChange}
              value={formData.walletFrom}
            >
              <Option value="" disabled>
                Списати з гаманця
              </Option>
              {wallets?.map(({ _id, name }: ISearchWallet) => (
                <Option key={_id} disabled={_id === formData.walletTo}>
                  {name}
                </Option>
              ))}
            </Select>
          </SelectWrapper>
          <SelectWrapper>
            <IconWrapper>
              <WalletIcon color={theme.colors.valid} />
            </IconWrapper>
            <Select
              style={{ marginRight: "auto" }}
              name="walletTo"
              onChange={handleInputChange}
              value={formData.walletTo}
            >
              <Option value="" disabled>
                Зарахувати на гаманець
              </Option>
              {wallets?.map(({ _id, name }: ISearchWallet) => (
                <Option key={_id} disabled={_id === formData.walletFrom}>
                  {name}
                </Option>
              ))}
            </Select>
          </SelectWrapper>
          <SelectWrapper>
            <IconWrapper style={{ marginLeft: 0 }}>
              <AmountIcon color={theme.colors.red} />
            </IconWrapper>
            <Input
              style={{ borderColor: "transparent" }}
              type="number"
              name="amount"
              placeholder="Сума"
              value={formData.amount}
              onChange={handleInputChange}
              pattern={amountPattern.source}
            ></Input>
          </SelectWrapper>

          <ButtonsWrapper>
            <ButtonSubmit
              type="submit"
              disabled={
                formData.amount === "" ||
                formData.walletFrom === "" ||
                formData.walletTo === "" ||
                formData.walletFrom === formData.walletTo
              }
            >
              <DoneIcon color={theme.colors.valid} />
            </ButtonSubmit>
            <ButtonSubmit
              type="button"
              disabled={
                formData.amount === "" &&
                formData.walletFrom === "" &&
                formData.walletTo === ""
              }
              onClick={() => clearForm()}
              style={{ backgroundColor: theme.colors.red }}
            >
              <CloseIcon color={theme.colors.invalid} />
            </ButtonSubmit>
          </ButtonsWrapper>
        </>
      )}
    </Form>
  );
};

export default TransfersForm;
