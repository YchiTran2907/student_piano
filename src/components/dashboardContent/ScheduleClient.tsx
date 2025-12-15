'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { YearlySchedule, ScheduleItem } from '../../../lib/data';

function getMonthName(month: string): string {
    const monthNames: Record<string, string> = {
        Jan: 'Tháng 1',
        Feb: 'Tháng 2',
        Mar: 'Tháng 3',
        Apr: 'Tháng 4',
        May: 'Tháng 5',
        Jun: 'Tháng 6',
        Jul: 'Tháng 7',
        Aug: 'Tháng 8',
        Sep: 'Tháng 9',
        Oct: 'Tháng 10',
        Nov: 'Tháng 11',
        Dec: 'Tháng 12',
    };
    return monthNames[month] || month;
}

interface ScheduleClientProps {
    initialData: YearlySchedule[];
    scheduleItems: ScheduleItem[];
}

export default function ScheduleClient({ initialData, scheduleItems }: ScheduleClientProps) {
    if (initialData.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow">
                Không có dữ liệu lịch học / điểm danh.
            </div>
        );
    }

    const years = initialData.map((y) => y.year);
    const [selectedYear, setSelectedYear] = useState(years[0]);

    const selectedSchedule = initialData.find(
        (y) => y.year === selectedYear
    );
    const monthlyData = selectedSchedule?.monthlyData || [];

    // Hàm lấy số ngày của một tháng
    const getDaysInMonth = (year: number, monthIndex: number) => {
        return new Date(year, monthIndex + 1, 0).getDate();
    };

    // Xử lý tiến độ buổi học
    const dataLatestYear = initialData.reduce(
        (latest, cur) => (cur.year > latest.year ? cur : latest),
        initialData[0]
    );

    const monthlyOfLatestYear = monthlyData.filter(
        m => m.yearlyScheduleId === dataLatestYear.id
    );

    const { latestMonth } = monthlyOfLatestYear.reduce(
        (acc, cur) => {
            if (!acc.latestMonth || Number(cur.month) > Number(acc.latestMonth.month)) {
                acc.latestMonth = cur;
            }
            return acc;
        },
        {
            latestMonth: null as typeof monthlyOfLatestYear[number] | null
        }
    );

    const normalizeDate = (d: Date) =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const startDateOfMonth = (() => {
        if (latestMonth?.startDate) {
            return normalizeDate(new Date(latestMonth.startDate));
        }

        if (latestMonth) {
            const year = dataLatestYear.year;
            const monthIndex = Number(latestMonth.month) - 1;
            return new Date(year, monthIndex, 1);
        }
        return normalizeDate(new Date());
    })();

    const progress = Math.min(
        monthlyOfLatestYear.reduce((sum, m) => {
            const year = dataLatestYear.year;
            const monthIndex = Number(m.month) - 1;
            const maxDays = getDaysInMonth(year, monthIndex);

            const validDays = m.days.filter((day) => {
                if (day > maxDays) return false;
                const lessonDate = normalizeDate(new Date(year, monthIndex, day));
                return lessonDate >= startDateOfMonth;
            });

            return sum + validDays.length;
        }, 0), 8
    );

    const remaining = Math.max(8 - progress, 0);


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
                        onChange={(e) =>
                            setSelectedYear(Number(e.target.value))
                        }
                        className="
                            rounded-xl border border-emerald-200
                            bg-white px-4 py-2 text-sm font-medium
                            text-emerald-800
                            focus:outline-none focus:ring-2 focus:ring-emerald-300
                        "
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
                <table className="min-w-full border-collapse">
                    <thead className="bg-emerald-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                Tháng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                Tổng số buổi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                Chi tiết ngày
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-emerald-100">
                        {monthlyData.map((month) => (
                            <tr key={month.id} className="hover:bg-emerald-50/50 transition">
                                <td className="px-6 py-5 font-medium text-gray-900 text-center">
                                    {getMonthName(month.month)}
                                </td>

                                <td className="px-6 py-5 text-center">
                                    <span
                                        className={`
                                            inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold
                                            ${(month.days).length > 0
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-red-100 text-red-600'
                                            }
                                        `}
                                    >
                                        {(month.days).length}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-wrap gap-2 max-w-[520px]">

                                        {(() => {
                                            const year = dataLatestYear.year;
                                            const monthIndex = Number(month.month) - 1;
                                            const daysInMonth = getDaysInMonth(year, monthIndex);

                                            return Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                                                const isAttended = month.days.includes(day);

                                                return (
                                                    <span
                                                        key={day}
                                                        title={
                                                            isAttended
                                                                ? `Ngày ${day}: Đã tham dự`
                                                                : `Ngày ${day}: Vắng`
                                                        }
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition
                                                            ${isAttended
                                                                ? 'bg-emerald-600 text-white'
                                                                : 'bg-gray-100 text-gray-400'
                                                            }`}>
                                                        {day}
                                                    </span>
                                                );
                                            });
                                        })()}

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= LỊCH HỌC CỐ ĐỊNH ================= */}
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

            {/* ================= CHI TIẾT BUỔI HỌC ================= */}
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
                    {/* Timeline line */}
                    <div className="absolute left-6 top-6 bottom-6 w-px bg-emerald-300"></div>

                    <div className="space-y-6">
                        {/* Start date */}
                        <div className="relative flex items-center gap-4 pl-10 mb-10">
                            <span className="absolute left-3 h-3 w-3 rounded-full bg-emerald-600"></span>
                            <div>
                                <p className="text-xs uppercase text-emerald-600 mb-2">
                                    Bắt đầu tính buổi
                                </p>
                                <p className="font-semibold text-gray-900">
                                    {new Date(startDateOfMonth).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="relative flex items-center gap-4 pl-10 mb-10">
                            <span className="absolute left-3 h-3 w-3 rounded-full bg-emerald-600"></span>
                            <div className="w-full">
                                <p className="text-xs uppercase text-emerald-600 mb-2">
                                    Tiến độ buổi học
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-3 rounded-full bg-emerald-200 overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-600"
                                            style={{ width: `${Math.min((progress / 8) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {progress} / 8
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Remaining */}
                        <div className="relative flex items-center gap-4 pl-10">
                            <span className="absolute left-3 h-3 w-3 rounded-full bg-gray-400"></span>
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
            {/* ================= END ================= */}
        </section>
    );
}
