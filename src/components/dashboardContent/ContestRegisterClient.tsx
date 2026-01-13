"use client";

import React from "react";
import { Music, Trophy } from "lucide-react";
import { ContestRegister } from "../../../lib/data";

interface ContestRegisterClientProps {
    contestRegisters: ContestRegister[];
}

export default function ContestRegisterClient({ contestRegisters }: ContestRegisterClientProps) {
    return (
        <section className="space-y-10">

            {/* ===== HEADER ===== */}
            <div className="space-y-3">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-1.5 rounded-full bg-indigo-500" />
                    <h2 className="text-xl font-bold text-gray-900">
                        Danh sách thí sinh tham dự cuộc thi
                    </h2>
                </div>
            </div>

            {/* ===== LIST ===== */}
            <div className="space-y-4">
                {contestRegisters.map((c) => {

                    return (
                        <div
                            key={c.id}
                            className="rounded-xl border border-slate-200 bg-white px-6 py-5 hover:border-indigo-300 transition"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {c.student.name}
                                    </h3>
                                </div>
                            </div>

                            <div className="my-4 h-px bg-slate-100" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                                <div className="flex items-start gap-2">
                                    <Trophy size={16} className="mt-0.5 text-slate-400" />
                                    <span>{c.contest.title}</span>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Music size={16} className="mt-1 text-slate-400" />
                                    <ul className="space-y-1">
                                        {c.pieces.map((piece, idx) => (
                                            <li key={idx}>• {piece}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="rounded-3xl bg-indigo-50 border border-indigo-200 p-8">
                <p className="text-sm leading-relaxed text-indigo-700">
                    Các cuộc thi được lựa chọn phù hợp với độ tuổi và năng lực của học sinh, nhằm tạo điều kiện cho các con được trải nghiệm, học hỏi và rèn luyện sự tự tin khi biểu diễn trên sân khấu. Đồng thời, đây cũng là bước đệm quan trọng giúp các con từng bước hướng tới những mục tiêu lớn hơn trong tương lai.
                </p>
            </div>
        </section>
    );
}
