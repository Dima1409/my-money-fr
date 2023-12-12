import { lazy, Suspense, ReactNode, useEffect } from "react";
import Container from "components/Container";
import Loader from "components/Loader";
import { Route, Routes, Navigate } from "react-router-dom";
// import { refreshUser } from "../redux/auth/operations";
// import { useDispatch } from "react-redux";
import Routs from "components/Routs";
import SharedLayout from "components/SharedLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

// const HomePage = lazy(() => import("../pages/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
// const LoginPage = lazy(() => import("../pages/LoginPage"));
const ExpensesPage = lazy(() => import("../pages/Expenses"));
const IncomePage = lazy(() => import("../pages/Income"));
const TransfersPage = lazy(() => import("../pages/Transfers"));

const LoadingFallback: React.FC = () => <Loader type="spin" color="teal" />;

const LazyPage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

const App: React.FC = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(refreshUser() as any);
  // }, [dispatch]);
  return (
    <Container>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index={true} element={<HomePage />} />
          <Route
            path="/register"
            element={
              <Routs.RestrictedRoute
                component={RegisterPage}
                redirectTo="/income"
              />
            }
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/income"
            element={
              <Routs.PrivateRoute component={IncomePage} redirectTo="/login" />
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
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
