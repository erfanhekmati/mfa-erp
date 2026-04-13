import { OverviewDashboard } from "../../components/dashboard/overview-dashboard";
import { getOverviewStats } from "../../lib/overview-stats";

export default function HomePage() {
  const stats = getOverviewStats();
  return <OverviewDashboard stats={stats} />;
}
