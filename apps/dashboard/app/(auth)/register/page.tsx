import { RegisterForm } from "../../../components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
      >
        مدیران فولاد آذر
      </Link>
      <RegisterForm />
    </div>
  );
}
