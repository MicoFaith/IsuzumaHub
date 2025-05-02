import { LoginForm } from "@/components/login-form";

export default function AdminLoginPage() {
  return <LoginForm title="Sign In As Admin" redirectTo="/dashboard/admin" showSignUpLink={false} expectedRole="ADMIN" />;
}