"use client";

import React, { useState } from "react";
import { CheckCheck, User } from "lucide-react";
import { StudentData } from "../../../lib/data";

interface AttendanceClientProps {
    dataAllStudents: StudentData[];
}

export default function AttendanceClient({ dataAllStudents }: AttendanceClientProps) {
    const [loadingIds, setLoadingIds] = useState<number[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const handleAttendance = async (studentData: StudentData) => {
        try {
            setLoadingIds((prev) => [...prev, studentData.id]);
            const studentId = studentData.yearlySchedules[0].id;
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

            setCheckedIds((prev) => [...prev, studentData.id]);
        } catch (error) {
            console.error(error);
            alert("Update đã xảy ra lỗi, vui lòng thử lại sau!");
        } finally {
            setLoadingIds((prev) =>
                prev.filter((id) => id !== studentData.id)
            );
        }
    };

    return (
        <section className="w-full rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">

            {/* HEADER */}
            <div className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-3 text-xl font-semibold text-slate-800">

                    {/* ICON - đồng bộ ProgressClient */}
                    <div className="
                        flex h-10 w-10 items-center justify-center
                        rounded-2xl
                        bg-gradient-to-br from-violet-500 to-sky-500
                        text-white shadow-md
                    ">
                        <CheckCheck size={18} />
                    </div>

                    Điểm danh học sinh
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dataAllStudents.map((s) => {
                    const isLoading = loadingIds.includes(s.id);
                    const isChecked = checkedIds.includes(s.id);

                    return (
                        <div
                            key={s.id}
                            className="
                                group rounded-3xl border border-violet-100
                                bg-white/90 backdrop-blur-md
                                p-6 shadow-sm
                                transition-all duration-300 ease-out
                                hover:-translate-y-1 hover:shadow-xl
                            "
                        >

                            {/* AVATAR - FIX màu tím chuẩn system */}
                            <div className="
                                mx-auto mb-4 flex h-16 w-16 items-center justify-center
                                rounded-2xl
                                bg-gradient-to-br from-violet-600 to-indigo-500
                                text-white text-lg font-bold shadow-sm
                                group-hover:scale-105 transition
                            ">
                                {s.name.charAt(0)}
                            </div>

                            {/* INFO */}
                            <div className="text-center space-y-1 mb-5">
                                <p className="text-sm font-semibold text-slate-900">
                                    {s.name}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {s.grade}
                                </p>

                                <span className="
                                    inline-block px-2 py-0.5 mt-1
                                    text-xs font-semibold rounded-xl
                                    bg-violet-50 text-violet-700
                                    border border-violet-100
                                ">
                                    {s.className}
                                </span>
                            </div>

                            {/* BUTTON */}
                            <button
                                disabled={isLoading || isChecked}
                                onClick={() => handleAttendance(s)}
                                className={`
                                    w-full rounded-2xl py-2.5 text-sm font-semibold
                                    shadow-sm transition-all duration-300

                                    ${isChecked
                                        ? "bg-slate-200 text-slate-500 cursor-default"
                                        : "bg-gradient-to-r from-violet-600 to-sky-500 text-white hover:opacity-90"
                                    }

                                    ${isLoading ? "opacity-60" : ""}
                                `}
                            >
                                {isLoading
                                    ? "Đang xử lý..."
                                    : isChecked
                                        ? "Đã điểm danh"
                                        : "Điểm danh"
                                }
                            </button>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}