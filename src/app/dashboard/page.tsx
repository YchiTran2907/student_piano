import DashboardClient from "@/components/dashboardClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function StudentsDashboard() {
    const cookieStore = cookies();
    const loggedIn = (await cookieStore).get("loggedIn");
    const userEmail = (await cookieStore).get("userEmail");

    if (!loggedIn || loggedIn.value !== "true") {
        redirect("/login");
    }

    return <DashboardClient userEmail={userEmail?.value || ""} />;
}
