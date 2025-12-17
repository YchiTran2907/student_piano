"use client";

import React from "react";
import { Trophy, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";

interface Competition {
    id: number;
    title: string;
    organizer: string;
    location: string;
    year: number;
    description: string;
    link: string;
    highlight?: boolean;
}

const competitions: Competition[] = [
    {
        id: 1,
        title: "Asia Pacific International Arts Festival",
        organizer: "APIAF Organization",
        location: "Singapore",
        year: 2025,
        description:
            "Cuộc thi nghệ thuật quốc tế quy mô lớn dành cho các tài năng trẻ khu vực Châu Á – Thái Bình Dương.",
        link: "#",
        highlight: true,
    },
    {
        id: 2,
        title: "Vietnam Young Pianists Competition",
        organizer: "Vietnam Music Association",
        location: "Hà Nội, Việt Nam",
        year: 2025,
        description:
            "Sân chơi âm nhạc dành cho các bạn nhỏ đam mê piano, tập trung phát triển kỹ năng biểu diễn và bản lĩnh sân khấu.",
        link: "#",
    }
];

export default function ContestClient() {
    return (
        <section className="space-y-20">

            {/* ================= HERO ================= */}
            <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-[#f9fbff] via-[#f2f6ff] to-[#eef2ff] p-12 shadow-sm">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl" />

                <div className="relative flex flex-col md:flex-row md:items-center gap-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow ring-1 ring-indigo-200">
                        <Trophy size={36} className="text-indigo-600" />
                    </div>

                    <div className="space-y-3">
                        <p className="uppercase tracking-[0.3em] text-sm text-indigo-600 font-semibold">
                            Piano Competitions
                        </p>
                        <h1 className="text-3xl md:text-2xl font-bold text-gray-900">
                            Các cuộc thi âm nhạc
                        </h1>
                        <p className="max-w-xl text-gray-600 leading-relaxed">
                            Tổng hợp các cuộc thi piano uy tín trong nước và quốc tế,
                            nơi học sinh có cơ hội thử sức và ghi dấu hành trình học tập.
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= LIST ================= */}
            <div className="relative mt-16 space-y-12">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />

                {competitions.map((c) => (
                    <div key={c.id} className="relative pl-20">
                        {/* DOT */}
                        <div
                            className={`absolute left-3 top-2 h-6 w-6 rounded-full border-4 bg-white
                ${c.highlight ? "border-indigo-500" : "border-slate-300"}`}
                        />

                        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {c.title}
                                </h3>

                                <span className="text-sm font-medium text-slate-500">
                                    {c.year}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                {c.description}
                            </p>

                            <div className="mt-4 text-sm text-slate-600 space-y-1">
                                <p className="flex items-center gap-2">
                                    <MapPin size={14} /> {c.location}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Đơn vị tổ chức: {c.organizer}
                                </p>
                            </div>

                            <a
                                href={c.link}
                                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline"
                            >
                                Xem chi tiết
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>


            {/* ================= FOOTER NOTE ================= */}
            <div className="rounded-3xl bg-indigo-50 border border-indigo-200 p-8">
                <p className="text-sm leading-relaxed text-indigo-700">
                    Các cuộc thi được lựa chọn phù hợp với năng lực và độ tuổi của học sinh,
                    nhằm tạo cơ hội trải nghiệm, học hỏi và phát triển sự tự tin trên sân khấu.
                </p>
            </div>
        </section>
    );
}
