"use client";

import React from "react";
import {
    UsersRound,
    CalendarDays,
    Clock,
    MapPin,
} from "lucide-react";
import { ScheduleItem } from "../../../lib/data";

interface GroupedStudent {
    id: number;
    name: string;
    studentEmail: string;
    schedules: ScheduleItem[];
}

interface ListScheduleClientProps {
    groupedStudents: GroupedStudent[];
}

export default function ListScheduleClient({
    groupedStudents,
}: ListScheduleClientProps) {

    /* ================= DAY SETUP (GIỮ NGUYÊN LOGIC) ================= */
    const dayMap: Record<number, string> = {
        0: "Chủ nhật",
        1: "Thứ hai",
        2: "Thứ ba",
        3: "Thứ tư",
        4: "Thứ năm",
        5: "Thứ sáu",
        6: "Thứ bảy",
    };

    const weekDays = Object.values(dayMap);
    const todayLabel = dayMap[new Date().getDay()];

    const todaySchedules = groupedStudents
        .map((student) => ({
            ...student,
            today: student.schedules.filter((s) => s.day === todayLabel),
        }))
        .filter((s) => s.today.length > 0);

    const schedulesByDay = weekDays.map((day) => {
        const items = groupedStudents.flatMap((student) =>
            student.schedules
                .filter((s) => s.day === day)
                .map((s) => ({
                    ...s,
                    studentName: student.name,
                }))
        );

        return { day, items };
    });

    return (
        <section className="space-y-16">

            {/* ================= HEADER (đồng bộ violet system) ================= */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md p-10 shadow-sm">

                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-violet-300/30 to-sky-300/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-200/20 to-violet-300/20 blur-3xl" />

                <div className="relative flex items-center gap-6">

                    <div className="
                        flex h-14 w-14 items-center justify-center
                        rounded-2xl
                        bg-gradient-to-br from-violet-500 to-sky-500
                        text-white shadow-md
                    ">
                        <UsersRound size={26} />
                    </div>
                    <div>
                        <p className="uppercase tracking-[0.35em] text-xs font-semibold text-violet-600">
                            STUDENT SCHEDULE
                        </p>
                        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                            Thời khoá biểu
                        </h1>
                    </div>

                </div>
            </div>

            {/* ================= TODAY ================= */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Hôm nay · {todayLabel}
                    </h2>
                    <span className="text-sm text-slate-500">
                        {todaySchedules.length} học sinh
                    </span>
                </div>

                {todaySchedules.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                        Hôm nay không có lịch học 🎉
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {todaySchedules.map((student) => (
                            <div
                                key={student.id}
                                className="
                                    rounded-3xl border border-slate-200
                                    bg-white/90 backdrop-blur-md
                                    p-6 shadow-sm
                                "
                            >
                                <p className="mb-4 font-semibold text-slate-900">
                                    {student.name}
                                </p>

                                <div className="space-y-3">
                                    {student.today.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="
                                                flex items-start gap-3
                                                rounded-2xl
                                                bg-slate-50
                                                p-3
                                            "
                                        >
                                            <Clock size={16} className="mt-0.5 text-violet-600" />

                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {item.time}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {item.subject}
                                                </p>
                                            </div>

                                            <span className="flex items-center gap-1 text-xs font-medium text-violet-600">
                                                <MapPin size={12} />
                                                {item.location}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= WEEK ================= */}
            <div className="space-y-12">
                <div className="flex items-center gap-3">
                    <CalendarDays size={22} className="text-violet-600" />
                    <h2 className="text-xl font-semibold text-slate-900">
                        Lịch học trong tuần
                    </h2>
                </div>

                {schedulesByDay.map((dayBlock) => {
                    const isToday = dayBlock.day === todayLabel;

                    return (
                        <div key={dayBlock.day} className="space-y-5">
                            <div className="flex items-center gap-3">
                                <span
                                    className={`h-3 w-3 rounded-full ${isToday
                                            ? "bg-violet-600 shadow-[0_0_0_6px_rgba(139,92,246,0.15)]"
                                            : "bg-slate-400"
                                        }`}
                                />

                                <h3 className={`text-lg font-semibold ${isToday ? "text-violet-700" : "text-slate-800"}`}>
                                    {dayBlock.day}
                                </h3>

                                <span className="text-sm text-slate-500">
                                    {dayBlock.items.length} buổi
                                </span>
                            </div>

                            {dayBlock.items.length === 0 ? (
                                <p className="ml-8 text-sm italic text-slate-400">
                                    Không có lịch học
                                </p>
                            ) : (
                                <div className="relative ml-4 space-y-6 border-l-2 border-violet-100 pl-8">

                                    {dayBlock.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="
                                                relative rounded-3xl
                                                border border-slate-200
                                                bg-white/90 backdrop-blur-md
                                                p-6 shadow-sm
                                            "
                                        >
                                            <span className="
                                                absolute -left-[42px] top-8
                                                h-4 w-4 rounded-full
                                                bg-violet-500
                                                ring-4 ring-violet-100
                                            " />

                                            <p className="font-semibold text-slate-900">
                                                {item.studentName}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-700">
                                                {item.time}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {item.subject}
                                            </p>

                                            <span className="
                                                mt-4 inline-flex items-center gap-1
                                                rounded-full
                                                bg-violet-50
                                                px-3 py-1
                                                text-xs font-semibold
                                                text-violet-700
                                            ">
                                                <MapPin size={12} />
                                                {item.location}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}