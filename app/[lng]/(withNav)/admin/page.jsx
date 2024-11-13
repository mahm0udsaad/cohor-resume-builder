import { getDashboardData } from "@/actions/dashboard";
import AdminDashboard from "@/components/AdminDashboard";

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  return <AdminDashboard initialData={dashboardData} />;
}
