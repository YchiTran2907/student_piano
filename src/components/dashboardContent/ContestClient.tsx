"use client";

import React from "react";
import { MapPin, ExternalLink, FileText } from "lucide-react";
import { Contest } from "../../../lib/data";

interface ContestClientProps {
    contestData: Contest[];
}

export default function ContestClient({ contestData }: ContestClientProps) {
    return (
        <section className="space-y-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6 rounded-3xl font-sans">

            {/* ================= HERO ================= */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md p-6 shadow-sm">

                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-200/20 blur-3xl" />

                <div className="relative flex flex-col md:flex-row md:items-center gap-6">

                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl
                        bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-md">
                        <FileText size={24} />
                    </div>
                    <div className="space-y-2">
                        <p className="uppercase tracking-[0.25em] text-xs text-slate-500 font-semibold">
                            Piano Competitions
                        </p>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Các cuộc thi âm nhạc
                        </h1>
                        <p className="text-sm text-slate-500 max-w-xl">
                            Tổng hợp các cuộc thi piano uy tín trong nước và quốc tế,
                            nơi học sinh có cơ hội thử sức và ghi dấu hành trình học tập.
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= TIMELINE ================= */}
            <div className="relative space-y-10">

                {/* line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />

                {contestData.map((c) => (
                    <div key={c.id} className="relative pl-16">

                        {/* dot */}
                        <div
                            className={`
                                absolute left-3 top-2 h-5 w-5 rounded-full border-2 bg-white shadow-sm
                                ${c.highlight
                                    ? "border-violet-500"
                                    : "border-slate-300"
                                }
                            `}
                        />

                        {/* card */}
                        <div className="rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 p-6 shadow-sm hover:shadow-md transition">

                            <div className="flex items-center justify-between gap-4">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {c.title}
                                </h3>

                                <span className="text-sm font-medium text-slate-500">
                                    {c.year}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                {c.description}
                            </p>

                            <div className="mt-4 space-y-1 text-sm text-slate-500">

                                <p className="flex items-center gap-2">
                                    <MapPin size={14} />
                                    {c.location}
                                </p>

                                <p className="text-xs text-slate-400">
                                    Đơn vị tổ chức: {c.organizer}
                                </p>
                            </div>

                            <a
                                href={c.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-800 transition"
                            >
                                Xem chi tiết
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}