"use client";

import React, { useState } from "react";
import { CalendarDays, GraduationCap, Clock, Sparkles } from "lucide-react";

// ================= MOCK DATA =================
const students = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        className: "10A1",
        stats: { total: 8, attended: 5 },
        today: [
            { time: "08:00 - 09:30", subject: "Toán", room: "101" },
            { time: "13:30 - 15:00", subject: "Vật Lý", room: "203" },
        ],
    },
    {
        id: 2,
        name: "Trần Thị B",
        className: "10A2",
        stats: { total: 8, attended: 7 },
        today: [{ time: "09:45 - 11:15", subject: "Sinh Học", room: "202" }],
    },
];

export default function StudentScheduleDashboardV2() {
    const [activeId, setActiveId] = useState(students[0].id);
    const active = students.find((s) => s.id === activeId)!;

    return (
        <section className="space-y-10">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Schedule Overview
                    </h2>
                    <p className="text-sm text-gray-500">Tổng quan nhanh lịch học</p>
                </div>
                <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <Sparkles size={16} /> Live
                </span>
            </div>

            {/* STUDENT SELECTOR */}
            <div className="flex flex-wrap gap-3">
                {students.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveId(s.id)}
                        className={`rounded-full px-6 py-3 text-sm font-semibold transition ${activeId === s.id
                                ? "bg-emerald-600 text-white shadow"
                                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        {s.name}
                        <span className="ml-2 text-xs opacity-70">{s.className}</span>
                    </button>
                ))}
            </div>

            {/* STATS */}
            <div className="grid sm:grid-cols-3 gap-6">
                {[{
                    label: "Tổng buổi",
                    value: active.stats.total,
                    icon: GraduationCap,
                },
                {
                    label: "Đã học",
                    value: active.stats.attended,
                    icon: Clock,
                },
                {
                    label: "Còn lại",
                    value: active.stats.total - active.stats.attended,
                    icon: CalendarDays,
                }].map((item, idx) => (
                    <div key={idx} className="relative rounded-3xl bg-white p-6 shadow">
                        <div className="absolute -top-4 right-6 rounded-2xl bg-emerald-600 p-3 text-white shadow-lg">
                            <item.icon size={18} />
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{item.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* TODAY – TIMELINE */}
            <div className="rounded-3xl bg-white p-6 shadow">
                <h3 className="mb-6 text-lg font-semibold text-gray-900">Hôm nay</h3>

                {active.today.length === 0 ? (
                    <p className="text-sm text-gray-500">Không có lịch học hôm nay</p>
                ) : (
                    <div className="relative">
                        {/* LINE */}
                        <div className="absolute left-3 top-0 bottom-0 w-px bg-emerald-200" />

                        <div className="space-y-6">
                            {active.today.map((item, idx) => (
                                <div key={idx} className="relative pl-10">
                                    {/* DOT */}
                                    <span
                                        className="absolute left-3 top-6 -translate-x-1/2 h-3 w-3 rounded-full bg-emerald-600"
                                    />

                                    {/* CARD */}
                                    <div className="rounded-2xl border border-gray-200 p-4">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-gray-900">{item.subject}</p>
                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                Phòng {item.room}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
