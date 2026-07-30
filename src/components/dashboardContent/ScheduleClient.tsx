'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { YearlySchedule, ScheduleItem } from '../../../lib/data';

const DEFAULT_VISIBLE_MONTHS = 1;

function getMonthName(month: number): string {
    const monthNames = [
        "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
        "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12",
    ];
    return monthNames[month - 1] || `Tháng ${month}`;
}

interface ScheduleClientProps {
    initialData: YearlySchedule[];
    scheduleItems: ScheduleItem[];
}

export default function ScheduleClient({ initialData, scheduleItems }: ScheduleClientProps) {

    if (initialData.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500 border border-slate-200 shadow-sm font-sans">
                Không có dữ liệu lịch học / điểm danh.
            </div>
        );
    }

    const years = initialData.map(y => y.year);
    const [selectedYear, setSelectedYear] = useState(years[0]);

    const selectedSchedule = initialData.find(y => y.year === selectedYear);
    const monthlyData = selectedSchedule?.monthlyData ?? [];

    const studentEmail = selectedSchedule?.studentEmail;
    if (!studentEmail) return null;

    const schedulesOfStudent = initialData.filter(
        y => y.studentEmail === studentEmail
    );

    const yearByScheduleId = new Map<number, number>(
        schedulesOfStudent.map(y => [y.id, y.year])
    );

    const sortedMonthlyData = [...monthlyData].sort((a, b) => {
        const yearA = yearByScheduleId.get(a.yearlyScheduleId) ?? 0;
        const yearB = yearByScheduleId.get(b.yearlyScheduleId) ?? 0;

        if (yearA !== yearB) return yearB - yearA;
        return b.month - a.month;
    });

    const allMonthlyData = schedulesOfStudent.flatMap(y => y.monthlyData ?? []);

    const getDaysInMonth = (year: number, monthIndex: number) =>
        new Date(year, monthIndex + 1, 0).getDate();

    const normalizeDate = (d: Date) =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const latestMonth = allMonthlyData.reduce(
        (latest, cur) => {
            if (!latest) return cur;

            const latestYear = yearByScheduleId.get(latest.yearlyScheduleId);
            const curYear = yearByScheduleId.get(cur.yearlyScheduleId);

            if (latestYear == null || curYear == null) return latest;

            if (curYear > latestYear || (curYear === latestYear && cur.month > latest.month)) {
                return cur;
            }

            return latest;
        },
        null as typeof allMonthlyData[number] | null
    );

    const startDateOfMonth = latestMonth?.startDate
        ? normalizeDate(new Date(latestMonth.startDate))
        : latestMonth
            ? new Date(
                yearByScheduleId.get(latestMonth.yearlyScheduleId)!,
                latestMonth.month - 1,
                1
            )
            : normalizeDate(new Date());

    const progress = Math.min(
        allMonthlyData.reduce((sum, m) => {
            const yearOfMonth = yearByScheduleId.get(m.yearlyScheduleId);
            if (yearOfMonth == null) return sum;

            const monthIndex = m.month - 1;
            const maxDays = getDaysInMonth(yearOfMonth, monthIndex);

            const validDays = m.days.filter(day => {
                if (day > maxDays) return false;

                const lessonDate = normalizeDate(
                    new Date(yearOfMonth, monthIndex, day)
                );

                return lessonDate >= startDateOfMonth;
            });

            return sum + validDays.length;
        }, 0)
    );

    const formattedStartDate = startDateOfMonth.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const remaining = Math.max(8 - progress, 0);

    const [showAllMonths, setShowAllMonths] = useState(false);

    const visibleMonths = showAllMonths
        ? sortedMonthlyData
        : sortedMonthlyData.slice(0, DEFAULT_VISIBLE_MONTHS);

    const today = normalizeDate(new Date()).getTime();

    return (
        <section className="space-y-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6 rounded-3xl font-sans">

            {/* HEADER */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md p-6 shadow-sm">
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-violet-300/30 to-sky-300/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/20 to-violet-200/20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    {/* icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl
                        bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-md">
                        <Calendar size={22} />
                    </div>
                    <div className="space-y-1">
                        <p className="uppercase tracking-[0.25em] text-xs text-violet-600 font-semibold">
                            Lịch học & Điểm danh
                        </p>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Theo dõi lịch học theo tháng và tiến độ
                        </p>
                    </div>
                </div>
            </div>

            {/* CALENDAR */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="divide-y divide-slate-100">

                    {visibleMonths.map(month => {

                        const yearOfMonth = yearByScheduleId.get(month.yearlyScheduleId);
                        if (yearOfMonth == null) return null;

                        const monthIndex = month.month - 1;
                        const daysInMonth = getDaysInMonth(yearOfMonth, monthIndex);
                        const firstDayOfWeek = new Date(yearOfMonth, monthIndex, 1).getDay();

                        return (
                            <div key={month.id} className="px-6 py-6">

                                <h3 className="mb-4 text-base font-semibold text-slate-900">
                                    {getMonthName(month.month)} {yearOfMonth}
                                </h3>

                                <div className="mb-3 grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
                                    {['CN','T2','T3','T4','T5','T6','T7'].map(d => (
                                        <div key={d}>{d}</div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-2 justify-items-center">

                                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                                        <div key={i} />
                                    ))}

                                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {

                                        const isAttended = month.days.includes(day);

                                        const currentDate = normalizeDate(
                                            new Date(yearOfMonth, monthIndex, day)
                                        ).getTime();

                                        const isToday = currentDate === today;

                                        return (
                                            <div
                                                key={day}
                                                className={`
                                                    relative flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium
                                                    transition-all duration-200 hover:scale-110
                                                    ${isToday
                                                        ? 'bg-white text-violet-600 ring-2 ring-violet-300 shadow-md animate-pulse'
                                                        : isAttended
                                                            ? 'bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-sm'
                                                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                                    }
                                                `}
                                            >
                                                {day}
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        );

                    })}

                </div>

                {monthlyData.length > DEFAULT_VISIBLE_MONTHS && (
                    <div className="flex justify-center border-t border-slate-100 py-4">
                        <button
                            onClick={() => setShowAllMonths(prev => !prev)}
                            className="text-sm font-medium text-violet-600 hover:text-violet-800 transition"
                        >
                            {showAllMonths ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>
                )}
            </div>

            {/* WEEK TABLE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <h3 className="mb-4 text-base font-semibold text-slate-900">
                    Lịch học hàng tuần
                </h3>

                {scheduleItems.length === 0 ? (
                    <p className="text-sm text-slate-500">Chưa có lịch học.</p>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-200">

                        <table className="min-w-full">

                            <thead className="bg-slate-50">
                                <tr>
                                    {['Thứ','Giờ học','Môn học','Địa điểm'].map(h => (
                                        <th
                                            key={h}
                                            className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {scheduleItems.map(item => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition">

                                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                                            {item.day}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-700">
                                            {item.time}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-700">
                                            {item.subject}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500">
                                            {item.location}
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}
            </div>

            {/* PROGRESS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <h3 className="mb-4 text-base font-semibold text-slate-900">
                    Tiến độ học tập
                </h3>

                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-violet-500 to-sky-500"
                        style={{ width: `${Math.min((progress / 8) * 100, 100)}%` }}
                    />
                </div>

                <div className="mt-3 flex justify-between text-sm text-slate-600">
                    <span>{progress} / 8 buổi</span>
                    <span>Còn {remaining} buổi</span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-sm text-slate-500">Ngày bắt đầu tính buổi: {formattedStartDate}</span>
                </div>
            </div>

        </section>
    );
}