"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboardLayout";
import { MenuOption } from "@/components/sidebarMenu";
import Personal from "@/components/dashboardContent/Personal";
import Schedule from "@/components/dashboardContent/Schedule";

export default function StudentsDashboard() {
    const [activeMenu, setActiveMenu] = useState<MenuOption>("Personal");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        if (loggedIn === "true") setIsLoggedIn(true);
        else window.location.href = "/login";
    }, []);

    if (!isLoggedIn) return null;

    // Render content dựa vào activeMenu
    const renderContent = () => {
        switch (activeMenu) {
            case "Personal":
                return <Personal />;
            case "Schedule":
                return <Schedule />;
            default:
                return <p>Content for {activeMenu} coming soon...</p>;
        }
    };

    return (
        <DashboardLayout activeMenu={activeMenu} onChangeMenu={setActiveMenu}>
            {renderContent()}
        </DashboardLayout>
    );
}
