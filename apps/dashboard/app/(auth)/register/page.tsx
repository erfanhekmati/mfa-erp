import { AuthPageShell } from "../../../components/auth/auth-page-shell";
import { RegisterForm } from "../../../components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthPageShell variant="register">
      <RegisterForm />
    </AuthPageShell>
  );
}
