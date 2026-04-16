import { DashboardShell } from "../../components/dashboard/dashboard-shell";
import { NavLayoutProvider } from "../../components/providers/nav-layout-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavLayoutProvider>
      <DashboardShell>{children}</DashboardShell>
    </NavLayoutProvider>
  );
}
