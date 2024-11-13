import { getDashboardData } from "@/actions/dashboard";
import AdminDashboard from "@/components/AdminDashboard";

export default async function DashboardPage({ params: { lng } }) {
  const dashboardData = await getDashboardData();

  return <AdminDashboard initialData={dashboardData} lng={lng} />;
}
