import { lazy } from "react";
import Container from "components/Container";
import { Route, Routes, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const ExpensesPage = lazy(() => import("../pages/Expenses"));
const IncomePage = lazy(() => import("../pages/Income"));
const TransfersPage = lazy(() => import("../pages/Transfers"));

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/income" element={<IncomePage />}></Route>
        <Route path="/expenses" element={<ExpensesPage />}></Route>
        <Route path="/transfers" element={<TransfersPage />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
