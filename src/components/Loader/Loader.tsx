import { Spinner } from "./Loader.styled";
import ReactLoading, { LoadingType } from "react-loading";
import Container from "components/Container";
import { theme } from "theme/theme";

interface LoaderProps {
  type: LoadingType;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ type }) => {
  return (
    <Container>
      <Spinner>
        <ReactLoading
          type={type}
          color={`${theme.colors.spinner}`}
          width={80}
          height={80}
        ></ReactLoading>
      </Spinner>
    </Container>
  );
};

export default Loader;
