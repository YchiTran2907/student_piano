"use client";

import React, { useState } from "react";
import { CheckCheck } from "lucide-react";
import { StudentData } from "../../../lib/data";

interface AttendanceClientProps {
    dataAllStudents: StudentData[];
}

export default function AttendanceClient({ dataAllStudents }: AttendanceClientProps) {
    const [loadingIds, setLoadingIds] = useState<number[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const handleAttendance = async (studentId: number) => {
        try {
            setLoadingIds((prev) => [...prev, studentId]);

            const res = await fetch("/api/attendance/checkin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId }),
            });
            const result = await res.json();

            if (!res.ok) {
                console.error("Attendance update failed:", result.error);
                alert("Điểm danh thất bại!");
                return;
            }

            setCheckedIds((prev) => [...prev, studentId]);
        } catch (error) {
            console.error(error);
            alert("Update đã xảy ra lỗi, vui lòng thử lại sau!");
        } finally {
            setLoadingIds((prev) => prev.filter((id) => id !== studentId));
        }
    };

    return (
        <section className="space-y-8 p-6">
            <div className="flex items-center gap-3 text-xl font-semibold text-emerald-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <CheckCheck size={20} />
                </span>
                Điểm danh học sinh
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dataAllStudents.map((s) => {
                    const isLoading = loadingIds.includes(s.id);
                    const isChecked = checkedIds.includes(s.id);

                    return (
                        <div
                            key={s.id}
                            className="group rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1.5"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">

                                {/* Avatar */}
                                <div
                                    className="
                                        h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center
                                        text-emerald-700 text-xl font-bold
                                        transition-all duration-300 ease-out
                                        group-hover:scale-110
                                    "
                                >
                                    {s.name.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="space-y-1">
                                    <p className="text-lg font-semibold text-gray-900">
                                        {s.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {s.grade}
                                    </p>
                                    <p className="text-xs text-emerald-700 font-bold bg-emerald-50 inline-block px-2 py-0.5 rounded">
                                        {s.className}
                                    </p>
                                </div>

                                {/* Button */}
                                <button
                                    disabled={isLoading || isChecked}
                                    onClick={() => handleAttendance(s.id)}
                                    className={`
                                        w-full rounded-xl py-2.5 text-sm font-bold shadow transition-all duration-300 ease-out
                                        ${isChecked
                                            ? "bg-gray-300 text-gray-600 cursor-default"
                                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                                        }
                                        ${isLoading ? "opacity-60" : ""}
                                    `}
                                >
                                    {isLoading ? "Đang xử lý..." : isChecked ? "Đã điểm danh" : "Điểm danh"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
