"use client";

import { students } from "@/data/student";
import { useState, useEffect } from "react";

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
        <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <p className="text-base font-bold text-gray-900 mb-1">{day}</p>
            <div className="space-y-0.5 text-gray-700 text-sm">
                <p>⏰ **Thời gian:** {time}</p>
                <p>🎵 **Môn học:** {subject}</p>
                <p>🏫 **Địa điểm:** {location}</p>
            </div>
        </div>
    );
}

export default function Schedule({ userEmail }: ScheduleProps) {
    const [student, setStudent] = useState<typeof students[0] | null>(null);
    const [filterDay, setFilterDay] = useState<string>("All");

    useEffect(() => {
        if (userEmail) {
            const s = students.find((st) => st.email === userEmail);
            if (s) setStudent(s);
        }
    }, [userEmail]);

    if (!student) return <p className="text-center mt-10 text-gray-600">Đang tải dữ liệu học viên...</p>;

    const days = ["All", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];

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

            <div className="flex flex-wrap gap-2 mb-6 justify-center w-full px-2 max-w-4xl">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => setFilterDay(day)}
                        className={`
                            px-3 py-1.5 rounded-lg border border-gray-300 font-medium transition-all text-sm sm:px-4 sm:py-2 sm:rounded-xl sm:text-base
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