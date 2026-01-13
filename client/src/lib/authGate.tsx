// AuthGate.tsx
import { useAuthStore } from "@/lib/auth-store";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useState } from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  const [mode, setMode] = useState<"login" | "register">("login");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {mode === "login" ? (
          <LoginForm onSwitchToRegister={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode("login")} />
        )}
      </div>
    );
  }

  return <>{children}</>;
}
