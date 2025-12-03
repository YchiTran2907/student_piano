"use client";

import { User, Calendar, BarChart3, FileText, BookOpen, ClipboardList } from "lucide-react";

export type MenuOption =
    | "Personal"
    | "Schedule"
    | "Progress"
    | "Performance"
    | "Attendance"
    | "Notes";

interface SidebarMenuProps {
    activeMenu: MenuOption;
    onChange: (menu: MenuOption) => void;
}

export default function SidebarMenu({ activeMenu, onChange }: SidebarMenuProps) {
    const menuItems = [
        { key: "Personal", label: "Personal Info", icon: User },
        { key: "Schedule", label: "Schedule", icon: Calendar },
        { key: "Progress", label: "Progress", icon: BarChart3 },
        { key: "Performance", label: "Performance", icon: ClipboardList },
        { key: "Attendance", label: "Attendance", icon: FileText },
        { key: "Notes", label: "Notes", icon: BookOpen },
    ];

    return (
        <aside className="w-60 bg-white shadow-sm p-6 border-r border-gray-200 flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-2">Menu</h2>

            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.key;

                return (
                    <button
                        key={item.key}
                        onClick={() => onChange(item.key as MenuOption)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                    >
                        <Icon size={18} />
                        {item.label}
                    </button>
                );
            })}
        </aside>
    );
}
