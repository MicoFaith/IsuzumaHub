import { LoginForm } from "@/components/login-form";

export default function EmLoginPage() {
  return <LoginForm title="Sign In As Employee" redirectTo="/dashboard/employee" showSignUpLink={false} expectedRole="EMPLOYEE" />;
}