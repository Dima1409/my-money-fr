import { lazy, Suspense, ReactNode, useEffect } from "react";
import Container from "components/Container";
import Loader from "components/Loader";
import { Route, Routes, Navigate } from "react-router-dom";
import { refreshUser } from "../redux/auth/operations";
import { useDispatch } from "react-redux";
import Routs from "components/Routs";
import SharedLayout from "components/SharedLayout";
import { ThunkDispatch } from "@reduxjs/toolkit";

const HomePage = lazy(() => import("../pages/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ExpensesPage = lazy(() => import("../pages/Expenses"));
const IncomePage = lazy(() => import("../pages/Income"));

const LoadingFallback: React.FC = () => <Loader type="spin"/>;

const LazyPage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

const App: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <Container>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <LazyPage>
                <HomePage />
              </LazyPage>
            }
          />
          <Route
            path="register"
            element={
              <Routs.RestrictedRoute
                component={() => (
                  <LazyPage>
                    <RegisterPage />
                  </LazyPage>
                )}
                redirectTo="/"
              ></Routs.RestrictedRoute>
            }
          ></Route>
          <Route
            path="login"
            element={
              <Routs.RestrictedRoute
                component={() => (
                  <LazyPage>
                    <LoginPage />
                  </LazyPage>
                )}
                redirectTo="/"
              ></Routs.RestrictedRoute>
            }
          ></Route>
          <Route
            path="incomes"
            element={
              <Routs.PrivateRoute
                component={() => (
                  <LazyPage>
                    <IncomePage />
                  </LazyPage>
                )}
                redirectTo="/login"
              />
            }
          ></Route>
          <Route
            path="expenses"
            element={
              <Routs.PrivateRoute
                component={() => (
                  <LazyPage>
                    <ExpensesPage />
                  </LazyPage>
                )}
                redirectTo="/login"
              />
            }
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </Container>
  );
};

export default App;
