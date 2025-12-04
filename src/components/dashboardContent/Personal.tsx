"use client";

import studentsData from "@/data/student.json";
import schedulesData from "@/data/schedule.json";

import { useEffect, useState } from "react";

export interface ScheduleItem {
    day: string;
    time: string;
    subject: string;
    location: string;
}

export interface Student {
    name: string;
    email: string;
    parentName: string;
    contact: string;
    age: number;
    grade: string;
    className: string;
    teacher: string;
    totalSessions: number;
    attended: number;
    fee: string;
    schedule: ScheduleItem[];
}

export interface MonthlyAttendance {
    month: string;
    attended: number;
    total: number;
    days: number[];
}

export interface YearlySchedule {
    year: number;
    monthlyData: MonthlyAttendance[];
}

export interface ScheduleData {
    email: string;
    yearlyData: YearlySchedule[];
}

interface PersonalProps {
    userEmail: string;
}

interface InfoCardProps {
    label: string;
    value: string | number;
}

function InfoCard({ label, value }: InfoCardProps) {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-sm text-gray-500 truncate">{label}</div>
            <div className="text-base font-semibold text-gray-900 mt-1 truncate">{value}</div>
        </div>
    );
}

export default function Personal({ userEmail }: PersonalProps) {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [monthlyData, setMonthlyData] = useState<
        { month: string; attended: number; total: number }[]
    >([]);

    const student = (studentsData as Student[]).find((s) => s.email === userEmail) || null;

    useEffect(() => {
        if (!student) {
            setMonthlyData([]);
            return;
        }

        const studentSchedule = (schedulesData as ScheduleData[]).find((s) => s.email === student.email);

        const data =
            studentSchedule?.yearlyData.find((y) => y.year === year)
                ?.monthlyData || [];

        setMonthlyData(data);

    }, [student, year]);

    if (!student) return <p className="text-center mt-10 text-gray-600">Không tìm thấy dữ liệu học viên.</p>;

    const availableYears = (schedulesData as ScheduleData[]).find(s => s.email === student.email)?.yearlyData.map(y => y.year) || [year];

    return (
        <div className="flex flex-col items-center w-full px-2 sm:px-4">

            {/* Header */}
            <div className="flex flex-col items-center mb-8 mt-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 text-2xl flex items-center justify-center text-gray-500">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h1 className="text-xl font-semibold mt-3 text-center truncate w-full px-2">{student.name}</h1>
                <p className="text-gray-500 text-center text-sm">{student.className}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full max-w-4xl">
                <InfoCard label="Trình độ" value={student.grade} />
                <InfoCard label="Giáo viên" value={student.teacher} />
                <InfoCard label="Email" value={student.email} />
                <InfoCard label="Lớp" value={student.className} />
                <InfoCard label="Tên phụ huynh" value={student.parentName} />
                <InfoCard label="Số điện thoại" value={student.contact} />
                <InfoCard label="Tuổi" value={student.age} />
                <InfoCard label="Học phí" value={student.fee} />
            </div>

            {/* Year Selector */}
            <div className="mt-6 mb-4 flex justify-center items-center">
                <label className="mr-2 font-semibold text-sm">Chọn năm:</label>
                <select
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
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
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                    Thống kê buổi học theo tháng ({year})
                </h2>

                {/* Legend */}
                <div className="flex gap-4 sm:gap-6 mb-12">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gradient-to-t from-blue-400 to-blue-600 rounded-sm"></div>
                        <span className="text-xs text-gray-700">Đã học</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                        <span className="text-xs text-gray-700">Chưa học</span>
                    </div>
                </div>

                {/* Chart wrapper */}
                <div className="w-full overflow-x-auto pb-4">
                    <div className="flex items-end justify-center gap-2 sm:gap-4 px-2 sm:px-4 min-w-full max-w-[1200px] mx-auto">
                        {monthlyData.map((data) => {
                            const attendedPercent = (data.attended / data.total) * 100;

                            return (
                                <div key={data.month} className="flex flex-col items-center group relative flex-shrink-0 min-w-[40px] sm:min-w-[50px] md:min-w-[60px] max-w-[80px]">
                                    {/* Cột */}
                                    <div className="w-full h-40 sm:h-48 relative bg-gray-300 rounded-xl overflow-hidden flex items-end shadow-inner transition-all duration-500 hover:scale-[1.02]">
                                        <div className="w-full rounded-t-xl bg-gradient-to-t from-blue-400 to-blue-600 shadow-md" style={{ height: `${attendedPercent}%` }}></div>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-1 py-0.5 rounded-md whitespace-nowrap z-10">
                                            {data.attended} / {data.total} buổi
                                        </div>
                                    </div>

                                    <div className="text-[10px] sm:text-xs mt-1 font-medium text-gray-700">
                                        {data.attended}/{data.total}
                                    </div>

                                    <div className="text-[9px] sm:text-[10px] mt-0.5 text-gray-500">
                                        Th. {data.month}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}