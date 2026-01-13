import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthNeonBackground from "../Background/AuthNeonBackground";

const PaymentError = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirectTo = params.get("redirect") || "/new-home";

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(redirectTo);
    }, 1500);
    return () => clearTimeout(t);
  }, [redirectTo]);

  return (
    <>
      <AuthNeonBackground />
      <div className="min-h-screen flex items-center justify-center bg-none">
        <div
          className="rounded-2xl p-px
        bg-linear-to-r from-red-400 via-cyan-400 to-blue-500
        shadow-[0_0_35px_rgba(16,185,129,0.45)]"
        >
          <div className="rounded-2xl bg-black p-10 text-center">
            <CheckCircle className="h-14 w-14 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white tracking-wider">
              PAYMENT ERROR
            </h2>
            <p className="text-slate-400 mt-2 text-sm">Redirecting you back…</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentError;
