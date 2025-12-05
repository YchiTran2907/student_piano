"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboardLayout";
import Personal from "@/components/dashboardContent/Personal";
import Schedule from "@/components/dashboardContent/Schedule";
import Progress from "@/components/dashboardContent/Progress";
import { MenuOption } from "@/components/sidebarMenu";

interface DashboardClientProps {
    userEmail: string;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {
    const [activeMenu, setActiveMenu] = useState<MenuOption>("Personal");

    const renderContent = () => {
        switch (activeMenu) {
            case "Personal":
                return <Personal userEmail={userEmail} />;
            case "Schedule":
                return <Schedule userEmail={userEmail} />;
            case "Progress":
                return <Progress userEmail={userEmail} />;
            default:
                return <p>Coming soon...</p>;
        }
    };

    return (
        <DashboardLayout activeMenu={activeMenu} onChangeMenu={setActiveMenu}>
            {renderContent()}
        </DashboardLayout>
    );
}
