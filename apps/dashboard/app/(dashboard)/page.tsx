import { OverviewDashboard } from "../../components/dashboard/overview-dashboard";
import { getOverviewStats } from "../../lib/overview-stats";

export default function HomePage() {
  const statsAll = getOverviewStats();
  return <OverviewDashboard statsAll={statsAll} />;
}
