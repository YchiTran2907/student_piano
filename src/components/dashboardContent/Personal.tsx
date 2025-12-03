"use client";

import { students, Student } from "@/data/student";
import { schedules, Schedule } from "@/data/schedule";
import { useEffect, useState } from "react";

interface InfoCardProps {
    label: string;
    value: string | number;
}

function InfoCard({ label, value }: InfoCardProps) {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-base font-semibold text-gray-900 mt-1">{value}</div>
        </div>
    );
}

export default function Personal() {
    const [student, setStudent] = useState<Student | null>(null);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [monthlyData, setMonthlyData] = useState<{ month: string; attended: number; total: number }[]>([]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) return;

        const foundStudent = students.find((s) => s.email === email);
        if (foundStudent) setStudent(foundStudent);

        const studentSchedule = schedules.find((s) => s.email === email);
        const data = studentSchedule?.yearlyData.find(y => y.year === year)?.monthlyData || [];
        setMonthlyData(data);
    }, [year]);

    if (!student) return <p>Loading...</p>;

    const availableYears = schedules.find(s => s.email === student.email)?.yearlyData.map(y => y.year) || [year];

    return (
        <div className="flex flex-col items-center w-full px-4">
            {/* Header */}
            <div className="flex flex-col items-center mb-10 mt-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 text-3xl flex items-center justify-center text-gray-500">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h1 className="text-2xl font-semibold mt-3 text-center">{student.name}</h1>
                <p className="text-gray-500 text-center">{student.className}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <InfoCard label="Trình độ" value={student.grade} />
                <InfoCard label="Giáo viên" value={student.teacher} />
                <InfoCard label="Email" value={student.email} />
                <InfoCard label="Lớp" value={student.className} />
                <InfoCard label="Tên phụ huynh/Người đại diện" value={student.parentName} />
                <InfoCard label="Số điện thoại" value={student.contact} />
                <InfoCard label="Tuổi" value={student.age} />
            </div>

            {/* Year Selector */}
            <div className="mt-8 mb-4">
                <label className="mr-2 font-semibold">Chọn năm:</label>
                <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {availableYears.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {/* Attendance Chart */}
            <div className="w-full max-w-5xl mt-6 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Thống kê buổi học theo tháng</h2>

                {/* Legend */}
                <div className="flex gap-6 mb-12">
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gradient-to-t from-blue-400 to-blue-600 rounded-sm"></div>
                        <span className="text-sm text-gray-700">Đã học</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                        <span className="text-sm text-gray-700">Chưa học</span>
                    </div>
                </div>

                {/* Chart wrapper */}
                <div className="w-full overflow-x-auto flex justify-center">
                    <div className="flex items-end gap-10 h-64 px-4">
                        {monthlyData.map((data) => {
                            const attendedPercent = (data.attended / data.total) * 100;

                            return (
                                <div key={data.month} className="flex flex-col items-center h-full group relative">
                                    {/* Cột */}
                                    <div className="w-12 h-56 relative bg-gray-300 rounded-xl overflow-hidden flex items-end shadow-inner transition-all duration-500 hover:scale-105">
                                        <div
                                            className="w-full rounded-t-xl bg-gradient-to-t from-blue-400 to-blue-600 shadow-md"
                                            style={{ height: `${attendedPercent}%` }}
                                        ></div>

                                        {/* Tooltip hover */}
                                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                            {data.attended} / {data.total} buổi
                                        </div>
                                    </div>

                                    {/* Nhãn số buổi */}
                                    <div className="text-sm mt-2 font-medium text-gray-700">{data.attended}/{data.total}</div>

                                    {/* Nhãn tháng */}
                                    <div className="text-xs mt-1 text-gray-500">Tháng {data.month}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>


        </div>
    );
}
