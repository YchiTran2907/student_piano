'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { YearlySchedule, ScheduleItem } from '../../../lib/data';

// Constants
const DEFAULT_VISIBLE_MONTHS = 1;

function getMonthName(month: number): string {
    const monthNames = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
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
            <div className="rounded-2xl bg-white p-8 text-center tevxt-gray-500 shadow">
                Không có dữ liệu lịch học / điểm danh.
            </div>
        );
    }

    const years = initialData.map(y => y.year);
    const [selectedYear, setSelectedYear] = useState(years[0]);

    const selectedSchedule = initialData.find(
        y => y.year === selectedYear
    );

    const monthlyData = selectedSchedule?.monthlyData ?? [];

    const studentEmail = selectedSchedule?.studentEmail;
    if (!studentEmail) return null;

    const schedulesOfStudent = initialData.filter(
        y => y.studentEmail === studentEmail
    );

    const yearByScheduleId = new Map<number, number>(
        schedulesOfStudent.map(y => [y.id, y.year])
    );

    const allMonthlyData = schedulesOfStudent.flatMap(
        y => y.monthlyData ?? []
    );

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

            if (
                curYear > latestYear ||
                (curYear === latestYear && cur.month > latest.month)
            ) {
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

    const remaining = Math.max(8 - progress, 0);

    const [showAllMonths, setShowAllMonths] = useState(false);
    const visibleMonths = showAllMonths
        ? monthlyData
        : monthlyData.slice(-DEFAULT_VISIBLE_MONTHS);

    return (
        <section className="space-y-6">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-emerald-800">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Calendar size={20} />
                    </span>
                    Lịch học & Điểm danh
                </h2>

                {/* YEAR FILTER */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Năm</span>
                    <select
                        value={selectedYear}
                        onChange={e => setSelectedYear(Number(e.target.value))}
                        className="rounded-xl border border-emerald-200
                            bg-white px-4 py-2 text-sm font-medium
                            text-emerald-800
                            focus:outline-none focus:ring-2 focus:ring-emerald-300">
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
                <div className="divide-y divide-emerald-100">
                    {visibleMonths.map(month => {
                        const yearOfMonth = yearByScheduleId.get(month.yearlyScheduleId);
                        if (yearOfMonth == null) return null;

                        const monthIndex = month.month - 1;
                        const daysInMonth = getDaysInMonth(yearOfMonth, monthIndex);
                        const firstDayOfWeek = new Date(
                            yearOfMonth,
                            monthIndex,
                            1
                        ).getDay();

                        return (
                            <div key={month.id} className="px-5 py-6">
                                {/* Header */}
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {getMonthName(month.month)} {yearOfMonth}
                                    </h3>
                                </div>

                                {/* Weekdays */}
                                <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-gray-400">
                                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
                                        <div key={d}>{d}</div>
                                    ))}
                                </div>

                                {/* Calendar grid */}
                                <div className="grid grid-cols-7 gap-2 justify-items-center">
                                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}

                                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                        const isAttended = month.days.includes(day);

                                        return (
                                            <div
                                                key={day}
                                                title={
                                                    isAttended
                                                        ? `Ngày ${day}: Đã tham dự`
                                                        : `Ngày ${day}: Vắng`
                                                }
                                                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${isAttended
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-gray-100 text-gray-400'
                                                    }`}
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

                {/* TOGGLE */}
                {monthlyData.length > DEFAULT_VISIBLE_MONTHS && (
                    <div className="flex justify-center border-t border-emerald-100 py-4">
                        <button
                            onClick={() => setShowAllMonths(prev => !prev)}
                            className="text-sm font-semibold text-emerald-600 hover:underline"
                        >
                            {showAllMonths ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>
                )}
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Calendar size={20} />
                    </span>
                    <h3 className="text-lg font-semibold text-emerald-800">
                        Lịch học hàng tuần
                    </h3>
                </div>

                {scheduleItems.length === 0 ? (
                    <p className="text-sm text-gray-500">Chưa có lịch học.</p>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-emerald-100">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-emerald-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-emerald-700">
                                        Thứ
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-emerald-700">
                                        Giờ học
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-emerald-700">
                                        Môn học
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-emerald-700">
                                        Địa điểm
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-emerald-100">
                                {scheduleItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition hover:bg-emerald-50/50"
                                    >
                                        <td className="px-5 py-4 font-medium text-gray-900">
                                            {item.day}
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            {item.time}
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            {item.subject}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">
                                            {item.location}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* ================= END LỊCH HỌC ================= */}

            {/* CHI TIẾT BUỔI HỌC */}
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Calendar size={20} />
                    </span>
                    <h3 className="text-lg font-semibold text-emerald-800">
                        Chi tiết buổi học
                    </h3>
                </div>

                <div className="relative rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                    <div className="absolute left-6 top-6 bottom-6 w-px bg-emerald-300" />

                    <div className="space-y-6">
                        <div className="relative flex items-center gap-4 pl-10">
                            <span className="absolute left-3 h-3 w-3 rounded-full bg-emerald-600" />
                            <div>
                                <p className="text-xs uppercase text-emerald-600 mb-2">
                                    Bắt đầu tính buổi
                                </p>
                                <p className="font-semibold text-gray-900">
                                    {startDateOfMonth.toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>

                        <div className="relative flex items-center gap-4 pl-10">
                            <span className="absolute left-3 h-3 w-3 rounded-full bg-emerald-600" />
                            <div className="w-full">
                                <p className="text-xs uppercase text-emerald-600 mb-2">
                                    Tiến độ buổi học
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-3 rounded-full bg-emerald-200 overflow-hidden">
                                        <div
                                            className={`h-full ${progress >= 8
                                                ? 'bg-red-600'
                                                : 'bg-emerald-600'
                                                }`}
                                            style={{
                                                width: `${Math.min(
                                                    (progress / 8) * 100,
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {progress} / 8
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex items-center gap-4 pl-10">
                            <span className="absolute left-3 h-3 w-3 rounded-full bg-gray-400" />
                            <div>
                                <p className="text-xs uppercase text-gray-600 mb-2">
                                    Buổi còn lại
                                </p>
                                <p className="font-semibold text-gray-900">
                                    {remaining}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
