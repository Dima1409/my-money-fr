import axios from "axios";

const wallets = async (): Promise<any> => {
  try {
    const {data} = await axios.get(
      `${process.env.REACT_APP_WALLETS_URL}`
    );
    console.log("API DATA",data.data.result)
    return data.data.result;
  } catch (error) {
    console.log("API ERR",error);
  }
};

export { wallets };
