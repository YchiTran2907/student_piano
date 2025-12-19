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

export default function ListScheduleClient({ groupedStudents }: ListScheduleClientProps) {

    const todayIndex = new Date().getDay();
    const dayMap: Record<number, string> = {
        0: "Chủ nhật",
        1: "Thứ hai",
        2: "Thứ ba",
        3: "Thứ tư",
        4: "Thứ năm",
        5: "Thứ sáu",
        6: "Thứ bảy",
    };
    const todayLabel = dayMap[todayIndex];

    const todaySchedules = groupedStudents
        .map((student) => ({
            ...student,
            today: student.schedules.filter(
                (s) => s.day === todayLabel
            ),
        }))
        .filter((s) => s.today.length > 0);

    return (
        <section className="space-y-14">

            {/* ================= HEADER ================= */}
            <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-8 shadow-sm">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

                <div className="relative flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow ring-1 ring-zinc-200 backdrop-blur">
                        <UsersRound size={32} className="text-indigo-600" />
                    </div>
                    <div>
                        <p className="uppercase tracking-[0.3em] text-xs font-semibold text-zinc-500">
                            STUDENT SCHEDULE
                        </p>
                        <h1 className="text-2xl font-bold text-zinc-900">
                            Thời khoá biểu
                        </h1>
                    </div>
                </div>
            </div>

            {/* ================= TODAY ================= */}
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
                                className="group relative rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50/40 to-sky-50/40 opacity-0 transition group-hover:opacity-100" />

                                <div className="relative space-y-4">
                                    <p className="font-semibold text-zinc-900">
                                        {student.name}
                                    </p>

                                    <div className="space-y-3">
                                        {student.today.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-3 rounded-xl bg-zinc-50 p-3"
                                            >
                                                <Clock
                                                    size={16}
                                                    className="mt-0.5 text-indigo-500"
                                                />
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
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= ALL STUDENTS ================= */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <CalendarDays size={20} className="text-indigo-600" />
                    <h2 className="text-xl font-semibold text-zinc-900">
                        Tất cả học sinh
                    </h2>
                </div>

                <div className="space-y-8">
                    {groupedStudents.map((student) => (
                        <div
                            key={student.id}
                            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <p className="font-semibold text-zinc-900">
                                    {student.name}
                                </p>
                                <span className="text-xs text-zinc-500">
                                    {student.schedules.length} buổi / tuần
                                </span>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {student.schedules.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                                    >
                                        <p className="text-sm font-semibold text-zinc-900">
                                            {item.day}
                                        </p>
                                        <p className="mt-1 text-sm text-zinc-700">
                                            {item.time}
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            {item.subject}
                                        </p>

                                        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                            <MapPin size={12} />
                                            {item.location}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
