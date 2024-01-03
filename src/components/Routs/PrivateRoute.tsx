import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import React, { ComponentType } from "react";

interface PrivateRouteProps {
  component: ComponentType;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { isLoggedIn } = useAuth();
  const shouldDirect = !isLoggedIn;
  return shouldDirect ? <Navigate to={redirectTo} /> : <Component />;
};

export default PrivateRoute;
