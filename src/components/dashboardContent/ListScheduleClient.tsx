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

    /* ================= DAY SETUP ================= */
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

    /* ================= TODAY ================= */
    const todaySchedules = groupedStudents
        .map((student) => ({
            ...student,
            today: student.schedules.filter(
                (s) => s.day === todayLabel
            ),
        }))
        .filter((s) => s.today.length > 0);

    /* ================= WEEK SCHEDULE ================= */
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

            {/* ================= HEADER ================= */}
            <div className="relative overflow-hidden rounded-[36px] border border-zinc-200 bg-gradient-to-br from-indigo-100/60 via-white to-sky-100/60 p-10 shadow-sm">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

                <div className="relative flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-zinc-200">
                        <UsersRound size={32} className="text-indigo-600" />
                    </div>
                    <div>
                        <p className="uppercase tracking-[0.35em] text-xs font-semibold text-zinc-500">
                            STUDENT SCHEDULE
                        </p>
                        <h1 className="mt-1 text-2xl font-bold text-zinc-900">
                            Thời khoá biểu
                        </h1>
                    </div>
                </div>
            </div>

            {/* ================= TODAY (GIỮ NGUYÊN) ================= */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-zinc-900">
                        Hôm nay · {todayLabel}
                    </h2>
                    <span className="text-sm text-zinc-500">
                        {todaySchedules.length} học sinh
                    </span>
                </div>

                {todaySchedules.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">
                        Hôm nay không có lịch học 🎉
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {todaySchedules.map((student) => (
                            <div
                                key={student.id}
                                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                            >
                                <p className="mb-4 font-semibold text-zinc-900">
                                    {student.name}
                                </p>

                                <div className="space-y-3">
                                    {student.today.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 rounded-xl bg-zinc-50 p-3"
                                        >
                                            <Clock size={16} className="mt-0.5 text-indigo-500" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-zinc-900">
                                                    {item.time}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {item.subject}
                                                </p>
                                            </div>
                                            <span className="flex items-center gap-1 text-xs font-medium text-indigo-600">
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

            {/* ================= WEEKLY TIMELINE ================= */}
            <div className="space-y-12">
                <div className="flex items-center gap-3">
                    <CalendarDays size={22} className="text-indigo-600" />
                    <h2 className="text-xl font-semibold text-zinc-900">
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
                                            ? "bg-indigo-600 shadow-[0_0_0_6px_rgba(79,70,229,0.15)]"
                                            : "bg-zinc-400"
                                        }`}
                                />
                                <h3
                                    className={`text-lg font-semibold ${isToday ? "text-indigo-700" : "text-zinc-800"
                                        }`}
                                >
                                    {dayBlock.day}
                                </h3>
                                <span className="text-sm text-zinc-500">
                                    {dayBlock.items.length} buổi
                                </span>
                            </div>

                            {dayBlock.items.length === 0 ? (
                                <p className="ml-8 text-sm italic text-zinc-400">
                                    Không có lịch học
                                </p>
                            ) : (
                                <div className="relative ml-4 space-y-6 border-l-2 border-indigo-100 pl-8">
                                    {dayBlock.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="relative rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                                        >
                                            <span className="absolute -left-[42px] top-8 h-4 w-4 rounded-full bg-indigo-500 ring-4 ring-indigo-100" />

                                            <p className="font-semibold text-zinc-900">
                                                {item.studentName}
                                            </p>

                                            <p className="mt-1 text-sm text-zinc-700">
                                                {item.time}
                                            </p>

                                            <p className="mt-1 text-xs text-zinc-500">
                                                {item.subject}
                                            </p>

                                            <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
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
