import { AuthPageShell } from "../../../components/auth/auth-page-shell";
import { ForgetPasswordForm } from "../../../components/auth/forget-password-form";

export default function ForgetPasswordPage() {
  return (
    <AuthPageShell variant="forget-password">
      <ForgetPasswordForm />
    </AuthPageShell>
  );
}
