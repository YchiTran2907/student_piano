"use client";

import { students, Student } from "@/data/student";
import { useState, useEffect } from "react";

interface ScheduleCardProps {
    day: string;
    time: string;
    room: string;
}

function ScheduleCard({ day, time, room }: ScheduleCardProps) {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <p className="text-lg font-semibold">{day}</p>
            <p className="text-gray-600 mt-1">⏰ {time}</p>
            <p className="text-gray-600">🏫 {room}</p>
        </div>
    );
}

export default function Schedule() {
    const [student, setStudent] = useState<typeof students[0] | null>(null);
    const [filterDay, setFilterDay] = useState<string>("All");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            const s = students.find((st) => st.email === email);
            if (s) setStudent(s);
        }
    }, []);

    if (!student) return <p className="text-center mt-10">Loading student data...</p>;

    const days = ["All", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];

    const scheduleData =
        filterDay === "All"
            ? student.schedule
            : student.schedule.filter((s) => s.day === filterDay);

    return (
        <div className="flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex flex-col items-center mb-10 mt-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 text-3xl flex items-center justify-center text-gray-500">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h1 className="text-2xl font-semibold mt-3 text-center">{student.name}</h1>
                <p className="text-gray-500 text-center">{student.className}</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center w-full">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => setFilterDay(day)}
                        className={`px-4 py-2 rounded-xl border border-gray-300 font-medium transition-all ${filterDay === day
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Schedule Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {scheduleData.map((s, i) => (
                    <ScheduleCard key={i} day={s.day} time={s.time} room={s.location} />
                ))}
            </div>

            {scheduleData.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No sessions for selected day.</p>
            )}
        </div>
    );
}
