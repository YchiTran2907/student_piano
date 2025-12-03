"use client";

import { useState } from "react";
import SidebarMenu, { MenuOption } from "@/components/sidebarMenu";
import { student as studentData } from "@/data/student";

interface InfoCardProps {
    label: string;
    value: string | number;
}

function InfoCard({ label, value }: InfoCardProps) {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-base font-semibold text-gray-900 mt-1">{value}</div>
        </div>
    );
}

export default function StudentsDashboard() {
    const [activeMenu, setActiveMenu] = useState<MenuOption>("Personal");

    const student = studentData;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <SidebarMenu activeMenu={activeMenu} onChange={setActiveMenu} />

            {/* Main Content */}
            <main className="flex-1 p-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 rounded-full bg-gray-200 text-3xl flex items-center justify-center text-gray-500">
                        {student.name.split(" ").map((n) => n[0]).join("")}
                    </div>

                    <h1 className="text-2xl font-semibold mt-3">{student.name}</h1>
                    <p className="text-gray-500">{student.className}</p>
                </div>

                {/* Content by Menu */}
                <div>
                    {activeMenu === "Personal" && (
                        <div className="grid grid-cols-3 gap-4">
                            <InfoCard label="Grade" value={student.grade} />
                            <InfoCard label="Teacher" value={student.teacher} />
                            <InfoCard label="Class" value={student.className} />
                            <InfoCard label="Parent Name" value={student.parentName} />
                            <InfoCard label="Contact" value={student.contact} />
                            <InfoCard label="Age" value={student.age} />
                        </div>
                    )}

                    {activeMenu === "Schedule" && <p>Schedule content here</p>}
                    {activeMenu === "Progress" && <p>Progress content here</p>}
                    {activeMenu === "Performance" && <p>Performance content here</p>}
                    {activeMenu === "Attendance" && <p>Attendance content here</p>}
                    {activeMenu === "Notes" && <p>Notes content here</p>}
                </div>
            </main>
        </div>
    );
}
