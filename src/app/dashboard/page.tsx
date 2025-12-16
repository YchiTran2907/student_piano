import DashboardLayout from "@/components/dashboardClient";
import Personal from "@/components/dashboardContent/Personal";
import Progress from "@/components/dashboardContent/Progress";
import Schedule from "@/components/dashboardContent/Schedule";
import Attendance from "@/components/dashboardContent/Attendance";
import Achievement from "@/components/dashboardContent/Achievement";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAccountDataByEmail } from "../../../lib/data";

const ComingSoonContent = (title: string) => (
    <div className="p-8 bg-white rounded-xl shadow-lg h-[50vh] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">{title}</h2>
        <p className="text-gray-500">Tính năng {title} sẽ được cập nhật sớm. Vui lòng quay lại sau!</p>
    </div>
);

export default async function StudentsDashboard() {
    const cookieStore = cookies();
    const loggedIn = (await cookieStore).get("loggedIn");
    const userEmailCookie = (await cookieStore).get("userEmail");

    if (!loggedIn || loggedIn.value !== "true" || !userEmailCookie || !userEmailCookie.value) {
        redirect("/login");
    }

    const userEmail = userEmailCookie.value;

    // Kiểm tra quyền người dùng
    const accountData = await getAccountDataByEmail(userEmail);
    const roleUser = accountData.role;

    const personalContent = <Personal userEmail={userEmail} roleUser={roleUser} />;
    const scheduleContent = <Schedule userEmail={userEmail} />;
    const progressContent = <Progress userEmail={userEmail} />;

    const achievementContent = <Achievement userEmail={userEmail} />;
    const contestContent = ComingSoonContent("Cuộc thi");
    const feeContent = ComingSoonContent("Học phí");
    const attendanceContent = <Attendance />

    return (
        <DashboardLayout
            roleUser={roleUser}
            personalContent={personalContent}
            scheduleContent={scheduleContent}
            progressContent={progressContent}
            achievementContent={achievementContent}
            contestContent={contestContent}
            feeContent={feeContent}
            attendanceContent={attendanceContent}
        />
    );
}