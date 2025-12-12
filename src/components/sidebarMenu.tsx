'use client';

import { logoutAction } from '@/app/login/actions';
import { User, Calendar, BarChart3, FileText, DollarSign, Trophy, X, LogOut, CalendarCheck } from 'lucide-react';
import React, { useTransition } from 'react';

export type MenuOption =
    | 'Personal'
    | 'Schedule'
    | 'Progress'
    | 'Achievement'
    | 'Contest'
    | 'Fee'
    | 'Attendance';

interface SidebarMenuProps {
    activeMenu: MenuOption;
    onChange: (menu: MenuOption) => void;
    isMenuOpen: boolean;
    onClose: () => void;
}

export default function SidebarMenu({
    activeMenu,
    onChange,
    isMenuOpen,
    onClose,
}: SidebarMenuProps) {
    const menuItems = [
        { key: 'Personal', label: 'Thông tin cá nhân', icon: User },
        { key: 'Schedule', label: 'Thời khoá biểu', icon: Calendar },
        { key: 'Progress', label: 'Tiến độ học tập', icon: BarChart3 },
        { key: 'Achievement', label: 'Giải thưởng', icon: Trophy },
        { key: 'Contest', label: 'Cuộc thi', icon: FileText },
        { key: 'Fee', label: 'Học phí', icon: DollarSign },
        { key: 'Attendance', label: 'Điểm danh', icon: CalendarCheck },
    ];

    const sidebarClasses = `
        fixed top-0 left-0 z-40
        h-screen w-64
        bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700
        text-emerald-100
        shadow-2xl
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0
    `;

    const [isPending, startTransition] = useTransition();
    const handleLogout = () => {
        startTransition(async () => {
            await logoutAction();
        });
    };

    return (
        <aside className={sidebarClasses}>

            {/* HEADER */}
            <div className="relative px-5 py-6 flex-shrink-0">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
                    Student Panel
                </h2>
                <p className="text-xs text-emerald-400 mt-1">
                    Quản lý hồ sơ & học tập
                </p>

                {/* Close button – mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:hidden rounded-full bg-white/10 p-1 text-emerald-100 hover:bg-white/20 transition"
                    aria-label="Đóng menu"
                >
                    <X size={20} />
                </button>
            </div>

            {/* MENU – FULL HEIGHT */}
            <nav className="flex-1 overflow-y-auto px-3 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeMenu === item.key;

                    return (
                        <button
                            key={item.key}
                            onClick={() => {
                                onChange(item.key as MenuOption);
                                onClose();
                            }}
                            className={`group relative flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm transition-all duration-150
                                ${isActive ? 'bg-emerald-600 text-white shadow-lg' : 'hover:bg-white/10'}`}>
                            {isActive && (
                                <span className=" absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r bg-emerald-300" />)}

                            {/* Icon box */}
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 transition">
                                <Icon size={18} />
                            </div>

                            <span className="font-medium whitespace-nowrap">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* FOOTER */}
            <div className="px-4 py-4 border-t border-emerald-700/60 space-y-2">
                <button
                    onClick={handleLogout}
                    disabled={isPending}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm
                    text-emerald-100 hover:bg-red-500/20 transition
                    disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20 text-red-300 group-hover:bg-red-500 group-hover:text-white transition">
                        <LogOut size={18} />
                    </div>

                    <span className="font-medium">
                        {isPending ? 'Đang đăng xuất...' : 'Đăng xuất'}
                    </span>
                </button>

                <div className="text-xs text-emerald-300 text-center pt-2">
                    © {new Date().getFullYear()} Student System
                </div>
            </div>

        </aside>
    );
}
