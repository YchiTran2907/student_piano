"use client";

import React from "react";
import { CheckCheck } from "lucide-react";

export default function AttendanceClient() {
    const students = [
        { id: 1, name: "Nguyễn Văn A", class: "Lớp 1" },
        { id: 2, name: "Trần Thị B", class: "Lớp 2" },
        { id: 3, name: "Lê Văn C", class: "Lớp 3" },
        { id: 4, name: "Phạm Thu D", class: "Lớp 4" },
        { id: 5, name: "Phạm Thu E", class: "Lớp 4" },
    ];

    return (
        <section className="space-y-8 p-6">
            {/* Header */}
            <div className="flex items-center gap-3 text-xl font-semibold text-emerald-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <CheckCheck size={20} />
                </span>
                Điểm danh học sinh
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {students.map((s) => (
                    <div
                        key={s.id}
                        className="
                            group
                            rounded-2xl border border-emerald-200 bg-white p-6 
                            shadow-sm 
                            transition-all duration-300 ease-out
                            hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1.5
                        "
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
                                <p className="text-lg font-semibold text-gray-900">{s.name}</p>
                                <p className="text-sm text-gray-600">{s.class}</p>
                            </div>

                            {/* Button */}
                            <button
                                className="
                                    w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white
                                    shadow 
                                    hover:bg-emerald-700
                                    transition-all duration-300 ease-out
                                "
                                onClick={() => alert(`Điểm danh: ${s.name}`)}
                            >
                                Điểm danh
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
