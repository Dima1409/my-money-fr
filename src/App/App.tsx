import { lazy, Suspense, ReactNode } from "react";
import Container from "components/Container";
import Loader from "components/Loader";
import { Route, Routes, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const ExpensesPage = lazy(() => import("../pages/Expenses"));
const IncomePage = lazy(() => import("../pages/Income"));
const TransfersPage = lazy(() => import("../pages/Transfers"));

const LoadingFallback: React.FC = () => <Loader type="spin" color="teal" />;

const LazyPage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

function App() {
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <LazyPage>
              <HomePage />
            </LazyPage>
          }
        ></Route>
        <Route
          path="/income"
          element={
            <LazyPage>
              <IncomePage />
            </LazyPage>
          }
        ></Route>
        <Route
          path="/expenses"
          element={
            <LazyPage>
              <ExpensesPage />
            </LazyPage>
          }
        ></Route>
        <Route
          path="/transfers"
          element={
            <LazyPage>
              <TransfersPage />
            </LazyPage>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
