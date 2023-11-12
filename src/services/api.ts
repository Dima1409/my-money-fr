import axios from "axios";

const wallets = async (): Promise<any> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_WALLETS_URL}`);
    return data.data.result;
  } catch (error) {
    console.log("API ERR", error);
  }
};

const operations = async (): Promise<any> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_OPERATIONS_URL}`);
    return data.data.results;
  } catch (error) {
    console.log("API ERR", error);
  }
};

const deleteOperation = async (_id: String): Promise<any> => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_OPERATIONS_URL}/${_id}`
    );
    console.log(data.data)
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
    console.log("data api add",data);
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
    console.log("data api sell",data.data.sellCash);
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

export { wallets, operations, deleteOperation, incomeOperation, expenseOperation, categories };
