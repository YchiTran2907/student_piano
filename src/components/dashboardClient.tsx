// app/components/DashboardLayout.tsx
'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import SidebarMenu, { MenuOption } from './sidebarMenu';

interface DashboardLayoutProps {
    personalContent: React.ReactNode;
    scheduleContent: React.ReactNode;
    progressContent: React.ReactNode;
    performanceContent: React.ReactNode;
    attendanceContent: React.ReactNode;
    notesContent: React.ReactNode;
}

export default function DashboardLayout({
    personalContent,
    scheduleContent,
    progressContent,
    performanceContent,
    attendanceContent,
    notesContent,
}: DashboardLayoutProps) {
    const [activeMenu, setActiveMenu] = useState<MenuOption>("Personal");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const renderContent = () => {
        switch (activeMenu) {
            case "Personal":
                return personalContent;
            case "Schedule":
                return scheduleContent;
            case "Progress":
                return progressContent;
            case "Performance":
                return performanceContent;
            case "Attendance":
                return attendanceContent;
            case "Notes":
                return notesContent;
            default:
                return <div className="p-8 text-center text-gray-500">Nội dung không xác định.</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidebarMenu
                activeMenu={activeMenu}
                onChange={setActiveMenu}
                isMenuOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20 sm:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            <main className="flex-1 sm:ml-64 overflow-y-auto">

                <div className="sticky top-0 bg-white p-4 border-b border-gray-200 sm:hidden flex justify-between items-center z-10">
                    <h1 className="text-xl font-bold text-gray-800">{activeMenu.toUpperCase()}</h1>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="p-2 rounded-lg bg-gray-100 text-gray-700"
                        aria-label="Mở menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="p-4 md:p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}