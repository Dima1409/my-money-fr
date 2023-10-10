import axios from "axios";

const wallets = async (): Promise<any> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_WALLETS_URL}`);
    console.log("API wallets", data.data.result);
    return data.data.result;
  } catch (error) {
    console.log("API ERR", error);
  }
};

const operations = async (): Promise<any> => {
  try {
    const  {data}  = await axios.get(`${process.env.REACT_APP_OPERATIONS_URL}`);
    console.log("API operations", data.data.results);
    return data.data.results;
  } catch (error) {
    console.log("API ERR", error);
  }
};

export { wallets, operations };
