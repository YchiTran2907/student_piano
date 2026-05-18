"use client";

import React, { JSX } from "react";
import { Trophy, Crown, Medal, Star, User, Sparkles, Scroll } from "lucide-react";
import { Award } from '../../../lib/data';

const levelStyle: Record<string, { badge: string; ring: string; icon: JSX.Element }> = {
    gold: {
        badge: "from-violet-500 via-indigo-500 to-sky-500",
        ring: "ring-violet-200",
        icon: <Crown size={18} />,
    },
    silver: {
        badge: "from-slate-300 to-slate-400",
        ring: "ring-slate-200",
        icon: <Medal size={18} />,
    },
    bronze: {
        badge: "from-indigo-300 to-violet-400",
        ring: "ring-indigo-200",
        icon: <Medal size={18} />,
    },
    potential: {
        badge: "from-sky-400 to-violet-400",
        ring: "ring-sky-200",
        icon: <Sparkles size={18} />,
    },
    certificate: {
        badge: "from-violet-400 to-sky-500",
        ring: "ring-violet-200",
        icon: <Scroll size={18} />,
    },
};

interface AchievementClientProps {
    awards: Award[];
    studentName: string;
    classAwards: Award[];
    studentNameMap: Record<string, string>;
}

interface AwardCardProps {
    award: Award;
    studentName: string;
    highlight?: boolean;
}

function AwardCard({ award, studentName, highlight = false }: AwardCardProps) {
    const style = levelStyle[award.level.toLowerCase()] || levelStyle.bronze;

    return (
        <div
            className={`relative rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-slate-200 ring-1 ${style.ring}
            transition hover:shadow-md ${highlight ? "scale-[1.02]" : ""}`}
        >
            <div
                className={`absolute -top-3 right-4 flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${style.badge}`}
            >
                {style.icon} {award.prize}
            </div>

            <h4 className="font-semibold text-slate-900">{award.title}</h4>

            <div className="mt-2 text-sm text-slate-600 whitespace-pre-line">
                🎹 Học sinh: <span className="font-medium text-slate-800">{studentName}</span>
            </div>
        </div>
    );
}

export default function AchievementClient({
    awards,
    studentName,
    classAwards,
    studentNameMap
}: AchievementClientProps) {

    /* ===== LOGIC GIỮ NGUYÊN ===== */

    const sortedAwards = [...awards].sort((a, b) => b.year - a.year);
    const awardsByYear: Record<number, Award[]> = {};
    sortedAwards.forEach(a => {
        if (!awardsByYear[a.year]) awardsByYear[a.year] = [];
        awardsByYear[a.year].push(a);
    });
    const awardYears = Object.keys(awardsByYear).map(Number).sort((a, b) => b - a);

    const sortedClassAwards = [...classAwards].sort((a, b) => b.year - a.year);
    const classAwardsByYear: Record<number, Award[]> = {};
    sortedClassAwards.forEach(a => {
        if (!classAwardsByYear[a.year]) classAwardsByYear[a.year] = [];
        classAwardsByYear[a.year].push(a);
    });
    const classAwardYears = Object.keys(classAwardsByYear).map(Number).sort((a, b) => b - a);

    return (
        <section className="space-y-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6 rounded-3xl font-sans">

            {/* ================= HEADER ================= */}
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-6">

                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl
                        bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-md">
                        <Trophy size={24} />
                    </div>

                    <div>
                        <p className="uppercase tracking-[0.25em] text-xs text-slate-500 font-semibold">
                            Achievements
                        </p>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Giải thưởng & Thành tích
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Theo dõi toàn bộ thành tích học tập và giải thưởng
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= STUDENT ================= */}
            <div className="relative rounded-3xl bg-white border border-slate-200 p-8 space-y-6 shadow-sm">

                <div className="absolute -top-4 right-6 flex items-center gap-2 rounded-full
                    bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-1 text-white text-sm font-semibold shadow">
                    <Sparkles size={16} />
                    Thành tích cá nhân
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-white flex items-center justify-center shadow">
                        <User size={20} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Giải thưởng của học sinh
                        </h2>
                        <p className="text-sm text-slate-500">
                            Học sinh: <span className="font-medium text-slate-700">{studentName}</span>
                        </p>
                    </div>
                </div>

                {sortedAwards.length === 0 ? (
                    <p className="text-slate-500 italic">
                        Hãy tiếp tục nỗ lực để đạt thêm nhiều thành tích nhé ✨
                    </p>
                ) : (
                    awardYears.map(year => (
                        <div key={year} className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-700">{year}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {awardsByYear[year].map(a => (
                                    <AwardCard
                                        key={a.id}
                                        award={a}
                                        studentName={studentName}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ================= CLASS ================= */}
            <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-6 shadow-sm">

                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <Trophy size={20} />
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Thành tích chung của lớp
                    </h2>
                </div>

                {sortedClassAwards.length === 0 ? (
                    <p className="text-slate-500 italic">
                        Chưa có dữ liệu thành tích lớp.
                    </p>
                ) : (
                    classAwardYears.map(year => (
                        <div key={year} className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-700">{year}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {classAwardsByYear[year].map(a => (
                                    <AwardCard
                                        key={a.id}
                                        award={a}
                                        studentName={studentNameMap[a.studentEmail]}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ================= FOOTER ================= */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                <div className="flex gap-3 text-slate-600">
                    <Star size={18} />
                    <p className="text-sm leading-relaxed">
                        Mỗi thành tích là một bước tiến nhỏ trên hành trình học tập lâu dài.
                    </p>
                </div>
            </div>
        </section>
    );
}