import { Navigate } from "react-router-dom";
import Hooks from "hooks";
import React, { ComponentType } from "react";

interface RestrictedRoutesProps {
  component: ComponentType;
  redirectTo?: string;
}

const RestrictedRoute: React.FC<RestrictedRoutesProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { isLoggedIn } = Hooks.useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
