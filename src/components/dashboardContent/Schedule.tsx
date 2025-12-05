"use client";

import studentsData from "@/data/student.json";
import schedulesData from "@/data/schedule.json";

import { useState, useMemo, useEffect } from "react";

export interface ScheduleItem {
    day: string;
    time: string;
    subject: string;
    location: string;
}

interface Student {
    name: string;
    email: string;
    className: string;
    schedule: ScheduleItem[];
}

interface MonthlyAttendance {
    month: string;
    attended: number;
    days: number[];
}

interface YearlySchedule {
    year: number;
    monthlyData: MonthlyAttendance[];
}

interface ScheduleData {
    email: string;
    yearlyData: YearlySchedule[];
}

interface ScheduleProps {
    userEmail: string;
}

export interface ScheduleCardProps {
    day: string;
    time: string;
    subject: string;
    location: string;
}

function ScheduleCard({ day, time, subject, location }: ScheduleCardProps) {
    return (
        <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <p className="text-base font-bold text-gray-900 mb-1">{day}</p>
            <div className="space-y-0.5 text-gray-700 text-sm">
                <p>Thời gian: {time}</p>
                <p>Môn học: {subject}</p>
                <p>Địa điểm: {location}</p>
            </div>
        </div>
    );
}

interface AttendanceSummaryProps {
    month: number;
    year: number;
    attended: number;
    days: number[];
}

function AttendanceSummaryCard({ month, year, attended, days }: AttendanceSummaryProps) {
    const percentage = days.length > 0 ? Math.round((days.length / attended ) * 100) : 0;
    const remaining = attended - days.length;

    return (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-md w-full max-w-4xl mx-auto mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
                Thống kê tháng {month}/{year}
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center border-b border-gray-200 pb-4 mb-4">

                {/* Buổi đã học */}
                <div className="border-r border-gray-200 pr-2 sm:pr-4">
                    <p className="text-3xl font-extrabold text-blue-600">{days.length}</p>
                    <p className="text-sm text-gray-500 mt-0.5">Đã học</p>
                </div>

                {/* Buổi còn lại */}
                <div className="border-r border-gray-200 pr-2 sm:pr-4">
                    <p className="text-3xl font-extrabold text-yellow-600">{remaining}</p>
                    <p className="text-sm text-gray-500 mt-0.5">Còn lại</p>
                </div>

                {/* Phần trăm hoàn thành */}
                <div>
                    <p className={`text-3xl font-extrabold ${percentage >= 80 ? 'text-green-600' : percentage >= 50 ? 'text-blue-600' : 'text-red-600'}`}>
                        {percentage}%
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">Hoàn thành</p>
                </div>
            </div>

            {/* Chi tiết Ngày học */}
            <div className="mt-2">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                    🗓️ Ngày đã học ({days.length} ngày):
                </p>
                {days.length > 0 ? (
                    <div className="flex flex-wrap gap-2 text-sm text-gray-900">
                        {days.map(day => (
                            <span key={day} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                {day}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Chưa có ngày học nào được ghi nhận trong tháng này.</p>
                )}
            </div>
        </div>
    );
}


export default function Schedule({ userEmail }: ScheduleProps) {
    const students = studentsData as Student[];
    const schedules = schedulesData as ScheduleData[];

    const student = students.find((st) => st.email === userEmail) || null;

    // Lấy danh sách các năm và tháng có sẵn
    const availableYears = useMemo(() => {
        const studentSchedule = schedules.find(s => s.email === userEmail);
        return studentSchedule?.yearlyData.map(y => y.year) || [];
    }, [userEmail, schedules]);

    const [selectedYear, setSelectedYear] = useState<number>(availableYears.length > 0 ? availableYears[0] : new Date().getFullYear());
    const [availableMonths, setAvailableMonths] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [filterDay, setFilterDay] = useState<string>("All");

    // Cập nhật các tháng có sẵn khi năm thay đổi
    useEffect(() => {
        const studentSchedule = schedules.find(s => s.email === userEmail);
        const monthlyData = studentSchedule?.yearlyData.find(y => y.year === selectedYear)?.monthlyData || [];

        const months = monthlyData.map(m => m.month);
        setAvailableMonths(months);

        // Đặt tháng mặc định là tháng đầu tiên có dữ liệu
        if (months.length > 0) {
            setSelectedMonth(months[0]);
        } else {
            setSelectedMonth("");
        }

    }, [selectedYear, userEmail, schedules]);

    // 1. Logic tính toán dữ liệu thống kê dựa trên Năm và Tháng được chọn
    const attendanceSummary = useMemo(() => {
        if (!student || !selectedMonth) return null;

        const studentSchedule = schedules.find(s => s.email === student.email);

        const monthlyData = studentSchedule?.yearlyData
            .find(y => y.year === selectedYear)?.monthlyData
            .find(m => m.month === selectedMonth);

        if (!monthlyData) return null;

        return {
            month: Number(monthlyData.month),
            year: selectedYear,
            attended: monthlyData.attended,
            days: monthlyData.days,
        };
    }, [student, selectedYear, selectedMonth, schedules]);


    if (!student) return <p className="text-center mt-10 text-gray-600">Không tìm thấy dữ liệu học viên.</p>;

    const days = ["All", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];

    // Lọc dữ liệu lịch học
    const scheduleData =
        filterDay === "All"
            ? student.schedule
            : student.schedule.filter((s) => s.day === filterDay);

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

            {/* Year & Month Selector */}
            <div className="flex gap-4 mb-6 justify-center w-full max-w-4xl">
                {/* Chọn Năm */}
                <div className="flex items-center">
                    <label className="mr-2 font-semibold text-sm text-gray-700">Năm:</label>
                    <select
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white shadow-sm"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {availableYears.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* Chọn Tháng */}
                <div className="flex items-center">
                    <label className="mr-2 font-semibold text-sm text-gray-700">Tháng:</label>
                    <select
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white shadow-sm"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        disabled={availableMonths.length === 0}
                    >
                        {availableMonths.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                        {availableMonths.length === 0 && <option value="">Không có dữ liệu</option>}
                    </select>
                </div>
            </div>

            {/* Attendance Summary Card */}
            {attendanceSummary ? (
                <AttendanceSummaryCard
                    month={attendanceSummary.month}
                    year={attendanceSummary.year}
                    attended={attendanceSummary.attended}
                    days={attendanceSummary.days}
                />
            ) : (
                <div className="w-full max-w-4xl mx-auto mb-6 text-center py-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-md text-gray-500">Không tìm thấy dữ liệu điểm danh cho tháng/năm đã chọn.</p>
                </div>
            )}

            <hr className="w-full max-w-4xl border-gray-100 mb-6" />

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center w-full px-2 max-w-4xl">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => setFilterDay(day)}
                        className={`
                            px-3 py-1.5 rounded-lg border border-gray-300 font-medium transition-all duration-400 text-sm sm:px-4 sm:py-2 sm:rounded-xl sm:text-base
                            ${filterDay === day
                                ? "bg-gray-900 text-white shadow-md"
                                : "bg-white text-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-sm"
                            }
                        `}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Schedule Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto px-4">
                {scheduleData.map((s, i) => (
                    <ScheduleCard
                        key={i}
                        day={s.day}
                        time={s.time}
                        subject={s.subject}
                        location={s.location}
                    />
                ))}
            </div>

            {scheduleData.length === 0 && (
                <div className="w-full text-center mt-6">
                    <p className="text-lg text-gray-500 font-medium">Không có buổi học nào cho ngày đã chọn.</p>
                </div>
            )}
        </div>
    );
}