import { LoginForm } from "@/components/login-form";

export default function AuthPage() {
  return <LoginForm title="Sign In As User" redirectTo="/dashboard" showSignUpLink={true} expectedRole="USER" />;
}