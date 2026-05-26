'use client';

import { logoutAction } from '@/app/login/actions';
import {
    User,
    Calendar,
    BarChart3,
    FileText,
    Trophy,
    X,
    LogOut,
    CalendarCheck,
    UsersRound
} from 'lucide-react';
import React, { useTransition } from 'react';

export type MenuOption =
    | 'Personal'
    | 'Schedule'
    | 'Progress'
    | 'Achievement'
    | 'Contest'
    | 'Fee'
    | 'Attendance'
    | 'ListSchedule'
    | 'Album';

interface SidebarMenuProps {
    roleUser: string;
    activeMenu: MenuOption;
    onChange: (menu: MenuOption) => void;
    isMenuOpen: boolean;
    onClose: () => void;
}

export default function SidebarMenu({
    roleUser,
    activeMenu,
    onChange,
    isMenuOpen,
    onClose,
}: SidebarMenuProps) {

    const menuItems = [
        { key: 'Personal', label: 'Thông tin cá nhân', icon: User, roles: ['Admin', 'Student'] },
        { key: 'Schedule', label: 'Thời khoá biểu', icon: Calendar, roles: ['Student'] },
        { key: 'Progress', label: 'Tiến độ học tập', icon: BarChart3, roles: ['Admin', 'Student'] },
        { key: 'Achievement', label: 'Giải thưởng', icon: Trophy, roles: ['Admin', 'Student'] },
        { key: 'Contest', label: 'Cuộc thi Piano', icon: FileText, roles: ['Admin', 'Student'] },
        { key: 'Attendance', label: 'Điểm danh', icon: CalendarCheck, roles: ['Admin'] },
        { key: 'ListSchedule', label: 'Thời khoá biểu', icon: UsersRound, roles: ['Admin'] },
        { key: 'Album', label: 'Album', icon: UsersRound, roles: ['Admin', 'Student'] },
    ];

    const filteredMenuItems = menuItems.filter(item =>
        item.roles.includes(roleUser)
    );

    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        startTransition(async () => {
            await logoutAction();
        });
    };

    const sidebarClasses = `
        fixed top-0 left-0 z-40
        h-screen w-64
        bg-gradient-to-b from-slate-50 via-white to-slate-50
        text-slate-700
        shadow-xl
        border-r border-slate-200
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0
    `;

    return (
        <aside className={sidebarClasses}>

            {/* HEADER */}
            <div className="relative px-5 py-6 flex-shrink-0 border-b border-slate-200">

                <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                    Student Panel
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                    Quản lý hồ sơ & học tập
                </p>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:hidden rounded-full bg-slate-100 p-1 text-slate-600 hover:bg-slate-200 transition"
                    aria-label="Đóng menu"
                >
                    <X size={20} />
                </button>

            </div>

            {/* MENU */}
            <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">

                {filteredMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeMenu === item.key;

                    return (
                        <button
                            key={item.key}
                            onClick={() => {
                                onChange(item.key as MenuOption);
                                onClose();
                            }}
                            className={`
                                group relative flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm
                                transition-all duration-200
                                ${isActive
                                    ? 'bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-md'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }
                            `}
                        >

                            {/* ACTIVE BAR */}
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-white/70" />
                            )}

                            {/* ICON */}
                            <div className={`
                                flex h-9 w-9 items-center justify-center rounded-lg transition
                                ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                                }
                            `}>
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
            <div className="px-4 py-4 border-t border-slate-200 space-y-2">

                <button
                    onClick={handleLogout}
                    disabled={isPending}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm
                    text-slate-600 hover:bg-red-50 hover:text-red-600 transition
                    disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg
                        bg-slate-100 text-slate-500 group-hover:bg-red-100 group-hover:text-red-500 transition">
                        <LogOut size={18} />
                    </div>

                    <span className="font-medium">
                        {isPending ? 'Đang đăng xuất...' : 'Đăng xuất'}
                    </span>
                </button>

                <div className="text-xs text-slate-400 text-center pt-2">
                    © {new Date().getFullYear()} Student System
                </div>

            </div>

        </aside>
    );
}