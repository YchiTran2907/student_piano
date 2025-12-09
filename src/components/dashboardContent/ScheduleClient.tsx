'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { YearlySchedule } from '../../../lib/data';

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
}

export default function ScheduleClient({ initialData }: ScheduleClientProps) {
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
                                            ${month.attended > 0
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-red-100 text-red-600'
                                            }
                                        `}
                                    >
                                        {month.attended}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-wrap gap-2 max-w-[520px]">
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                                            (day) => {
                                                const isAttended =
                                                    month.days.includes(day);

                                                return (
                                                    <span
                                                        key={day}
                                                        title={
                                                            isAttended
                                                                ? `Ngày ${day}: Đã tham dự`
                                                                : `Ngày ${day}: Vắng`
                                                        }
                                                        className={`
                                                            flex h-8 w-8 items-center justify-center
                                                            rounded-full text-xs font-semibold
                                                            transition
                                                            ${isAttended
                                                                ? 'bg-emerald-600 text-white'
                                                                : 'bg-gray-100 text-gray-400'
                                                            }
                                                        `}
                                                    >
                                                        {day}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
