import { Spinner } from "./Loader.styled";
import ReactLoading, { LoadingType } from "react-loading";

interface LoaderProps {
  type: LoadingType;
  color: string;
}

const Loader: React.FC<LoaderProps> = ({ type, color }) => {
  return (
    <Spinner>
      <ReactLoading type={type} color={color}></ReactLoading>
    </Spinner>
  );
};

export default Loader;
