import AuthNeonBackground from "@/components/Background/AuthNeonBackground";
import { handleError, handleSuccess } from "@/utils/utils";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { api } from "@/lib/api";
const Signup = () => {
  type SignupInfo = {
    name: string;
    email: string;
    password: string;
  };
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: "",
    email: "",
    password: "",
  });

  const Navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name as keyof SignupInfo] = value;
    setSignupInfo(copySignupInfo);
  };
  console.log("Signup info->", signupInfo);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // client side validation
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All Fields Are Required");
    }
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}new-auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          Navigate("/new-login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      // Convert the error to a string safely:
      handleError(err instanceof Error ? err.message : String(err));
    }
  };
  return (
    <>
      <AuthNeonBackground />

      <div className="min-h-screen flex items-center justify-center bg-none px-4">
        {/* Neon Border Wrapper */}
        <div className="w-full max-w-md rounded-2xl p-px translate-y-12">
          {/* Card */}
          <div className="rounded-2xl bg-black/90 backdrop-blur-md p-8 ring-1 ring-cyan-500/20">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-white text-center mb-2 tracking-wider">
              CREATE ACCOUNT
            </h1>
            <p className="text-blue-400 text-center mb-6 text-sm">
              Secure access to your workspace
            </p>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-5">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-blue-400 uppercase tracking-widest">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-lg bg-black text-white 
                  placeholder-slate-500 border border-blue-500/30
                  focus:outline-none focus:border-cyan-400
                  focus:shadow-[0_0_10px_rgba(34,211,238,0.6)]
                  transition"
                  value={signupInfo.name}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-blue-400 uppercase tracking-widest">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-black text-white 
                  placeholder-slate-500 border border-blue-500/30
                  focus:outline-none focus:border-cyan-400
                  focus:shadow-[0_0_10px_rgba(34,211,238,0.6)]
                  transition"
                  value={signupInfo.email}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-blue-400 uppercase tracking-widest">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-black text-white 
                  placeholder-slate-500 border border-blue-500/30
                  focus:outline-none focus:border-cyan-400
                  focus:shadow-[0_0_10px_rgba(34,211,238,0.6)]
                  transition"
                  value={signupInfo.password}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 mt-3 rounded-lg font-semibold text-white
                bg-linear-to-r from-cyan-500 to-blue-600
                hover:from-cyan-400 hover:to-blue-500
                shadow-[0_0_15px_rgba(34,211,238,0.6)]
                hover:shadow-[0_0_30px_rgba(34,211,238,0.9)]
                transition-all tracking-widest"
              >
                SIGN UP
              </button>

              {/* Footer */}
              <p className="text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/new-login"
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Signup;
