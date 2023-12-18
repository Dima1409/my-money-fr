import axios from "axios";

const wallets = async (): Promise<any> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_WALLETS_URL}`);
    return data.data.result;
  } catch (error) {
    console.log("API ERR", error);
  }
};

const newWallet = async (body: {}): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_WALLETS_URL}/new`,
      body
    );
    console.log(data);
  } catch (error) {
    console.log("Error adding new wallet");
  }
};

const deleteWallet = async (id: string): Promise<any> => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_WALLETS_URL}/${id}`
    );
    console.log("Data from api delete", data);
    return data;
  } catch (error) {
    console.log("API ERR", error);
  }
};
const editWalletName = async (id: string, name: string): Promise<any> => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_WALLETS_URL}/${id}`,
      { name }
    );
    console.log("Data from api- renamed", data);
    return data;
  } catch (error) {
    console.log("API ERR", error);
  }
};
const operations = async (): Promise<any> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_OPERATIONS_URL}`);
    return data.data.results;
  } catch (error) {
    console.log("API ERREE", error);
  }
};

const deleteOperation = async (_id: String): Promise<any> => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_OPERATIONS_URL}/${_id}`
    );
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log("API ERR", error);
  }
};
const incomeOperation = async (body: {}): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_OPERATIONS_URL}/add`,
      body
    );
    console.log("data api add", data);
    return data.data.addNew;
  } catch (error) {
    console.log("API ERR", error);
  }
};
const expenseOperation = async (body: {}): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_OPERATIONS_URL}/sell`,
      body
    );
    console.log("data api sell", data.data.sellCash);
    return data.data.addNew;
  } catch (error) {
    console.log("API ERR", error);
  }
};
const categories = async (): Promise<any> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_CATEGORIES_URL}`);
    return data.data.results;
  } catch (error) {
    console.log("API ERR", error);
  }
};

const createCategory = async (body: {}): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_CATEGORIES_URL}`,
      body
    );
    return data.data.results;
  } catch (error) {
    console.log("API ERR", error);
  }
};

const deleteCategory = async (id: string): Promise<any> => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_CATEGORIES_URL}/${id}`
    );
    return data.data.results;
  } catch (error) {
    console.log("API ERR", error);
  }
};

const renameCategory = async (id: string, name: string): Promise<any> => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_CATEGORIES_URL}/${id}`,
      { name }
    );
    return data;
  } catch (error) {
    console.log("API ERR", error);
  }
};

export {
  wallets,
  newWallet,
  deleteWallet,
  editWalletName,
  operations,
  deleteOperation,
  incomeOperation,
  expenseOperation,
  categories,
  createCategory,
  deleteCategory,
  renameCategory
};
