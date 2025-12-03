"use client";

import SidebarMenu, { MenuOption } from "./sidebarMenu";
import { ReactNode } from "react";

interface DashboardLayoutProps {
    activeMenu: MenuOption;
    onChangeMenu: (menu: MenuOption) => void;
    children: ReactNode;
}

export default function DashboardLayout({
    activeMenu,
    onChangeMenu,
    children,
}: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-gray-50 relative">
            {/* Sidebar */}
            <div className="hidden lg:block">
                <SidebarMenu activeMenu={activeMenu} onChange={onChangeMenu} />
            </div>

            {/* Mobile Sidebar Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => {
                        const el = document.getElementById("mobileMenu");
                        el?.classList.toggle("translate-x-0");
                    }}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-xl shadow cursor-pointer"
                >
                    ☰ Menu
                </button>
            </div>

            {/* Mobile Sidebar */}
            <div
                id="mobileMenu"
                className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transform -translate-x-full transition-transform duration-300 lg:hidden"
            >
                <SidebarMenu activeMenu={activeMenu} onChange={onChangeMenu} />
            </div>

            {/* Logout button */}
            <div className="absolute top-6 right-6">
                <button
                    onClick={() => {
                        localStorage.removeItem("loggedIn");
                        localStorage.removeItem("userEmail");
                        window.location.href = "/login";
                    }}
                    className="px-4 py-2 bg-white text-gray-900 rounded-xl shadow border border-gray-300
                        hover:bg-gray-900 hover:text-white transition-colors duration-300 ease-in-out
                        font-medium cursor-pointer"
                >
                    Log out
                </button>
            </div>

            {/* Main content */}
            <main className="flex-1 p-6 lg:p-10">{children}</main>
        </div>
    );
}
