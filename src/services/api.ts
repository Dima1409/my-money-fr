import axios, { AxiosResponse } from "axios";

const startPage = async (): Promise<any> => {
  try {
    const { data }: AxiosResponse<any> = await axios.get(
      // `${process.env.REACT_APP_BASE_URL}`
      `${process.env.REACT_APP_BASE_URL}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { startPage };
