import { Spinner } from "./Loader.styled";
import ReactLoading, { LoadingType } from "react-loading";
import Container from "components/Container";
import { theme } from "theme/theme";

interface LoaderProps {
  type: LoadingType;
  width?: string;
  height?: string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ type, width, height, color }) => {
  return (
    <Container>
      <Spinner>
        <ReactLoading
          type={type}
          color={`${theme.colors.spinner}`}
          width={width}
          height={height}
        ></ReactLoading>
      </Spinner>
    </Container>
  );
};

export default Loader;
