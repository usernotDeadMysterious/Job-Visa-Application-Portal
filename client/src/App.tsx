import { useState, type ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import RefreshHandler from "./pages/RefreshHandler";
import { HomePage } from "./components/home/HomePage";

import AdminDashboard from "./pages/AdminDasboard";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./components/paymentComponents/PaymentSuccess";
import PaymentError from "./components/paymentComponents/PatmentError";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import UserDashboard from "./pages/UserDashboard";

export default function App() {
  // SO user dont login again and again
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  type PrivateRouteProps = {
    element: ReactElement;
  };
  const PrivateRoute = ({ element }: PrivateRouteProps) => {
    return isAuthenticated ? element : <Navigate to={"/new-login"} />;
  };

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/*======================== */}
        {/*|    Payment Routes    | */}
        {/*======================== */}
        {/*-----------Starts--------*/}
        <Route path="/secure-payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/error" element={<PaymentError />} />
        {/*-----------Ends--------- */}
        {/*======================== */}
        {/*|    Dashboard Routes   |*/}
        {/*======================== */}
        {/*-----------Starts--------*/}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/super-dashboard" element={<SuperAdminDashboard />} />
        {/*-----------Ends--------- */}
        {/*======================== */}
        {/*|        Home Page      |*/}
        {/*======================== */}
        {/*-----------Starts--------*/}
        <Route path="/" element={<Navigate to="/new-login" />} />
        <Route
          path="/new-home"
          element={<PrivateRoute element={<HomePage />} />}
        />
        {/*-----------Ends--------- */}
        {/*======================== */}
        {/*|     Login/Sign UP     |*/}
        {/*======================== */}
        {/*-----------Starts--------*/}
        <Route path="/new-login" element={<Login />} />
        <Route path="/new-signup" element={<Signup />} />

        {/* Testing & Checking Components  */}
        {/* <Route path="/test" element={< />} /> */}
      </Routes>
    </>
  );
}
