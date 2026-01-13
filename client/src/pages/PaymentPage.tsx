import AuthNeonBackground from "@/components/Background/AuthNeonBackground";
import { handleError } from "@/utils/utils";
import { CheckCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("token");
  const ACCESS_FEE_USD = 10;

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/payments/create-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken || "",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment failed");
      }

      // 🔥 STRIPE handles everything from here
      window.location.href = data.url;
    } catch (err: any) {
      handleError(err.message);
    }
  };

  return (
    <>
      <AuthNeonBackground />
      <div className="min-h-screen flex items-center justify-center bg-none late-100 px-4">
        {/* Neon Border Wrapper */}
        <div
          className="w-full max-w-md rounded-2xl p-px
        bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500
        shadow-[0_0_35px_rgba(37,99,235,0.45)]"
        >
          {/* Card */}
          <div className="rounded-2xl bg-black p-8">
            {/* Heading */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lock className="h-6 w-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white tracking-wider">
                UNLOCK ACCESS
              </h1>
            </div>

            <p className="text-blue-400 text-center mb-6 text-sm">
              One-time payment to apply for jobs
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-6">
              {[
                "Unlimited job applications",
                "No recurring charges",
                "Instant dashboard access",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
            {/* Price */}
            <div className="my-6 text-center">
              <div className="text-4xl font-extrabold text-white tracking-wide">
                ${ACCESS_FEE_USD}
              </div>
              <p className="text-slate-400 text-sm mt-1">
                One-time access fee · No subscriptions
              </p>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              className="w-full py-3 rounded-lg font-semibold text-white
            bg-linear-to-r from-cyan-500 to-blue-600
            hover:from-cyan-400 hover:to-blue-500
            shadow-[0_0_15px_rgba(34,211,238,0.6)]
            hover:shadow-[0_0_30px_rgba(34,211,238,0.9)]
            transition-all tracking-widest"
            >
              PAY & CONTINUE
            </button>

            {/* Cancel */}
            <button
              onClick={() => navigate(-1)}
              className="w-full mt-4 text-sm text-slate-400 hover:text-slate-300 transition"
            >
              Cancel & go back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
