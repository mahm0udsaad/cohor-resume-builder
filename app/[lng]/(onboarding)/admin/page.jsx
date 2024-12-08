import { getDashboardData, getAllTemplates } from "@/actions/dashboard";
import AdminDashboard from "@/components/AdminDashboard";

export default async function DashboardPage({ params: { lng } }) {
  const dashboardData = await getDashboardData();
  const allTemplates = await getAllTemplates();

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminDashboard
        lng={lng}
        initialData={dashboardData}
        allTemplates={allTemplates}
      />
    </div>
  );
}
