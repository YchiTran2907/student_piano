"use client";

import React, { JSX } from "react";
import { Trophy, Crown, Medal, Star, User, Sparkles, Scroll } from "lucide-react";
import { Award } from '../../../lib/data';

const levelStyle: Record<string, { badge: string; ring: string; icon: JSX.Element }> = {
    gold: {
        badge: "from-yellow-400 via-yellow-500 to-yellow-600",
        ring: "ring-yellow-400",
        icon: <Crown size={18} />,
    },
    silver: {
        badge: "from-gray-300 to-gray-400",
        ring: "ring-gray-300",
        icon: <Medal size={18} />,
    },
    bronze: {
        badge: "from-orange-300 to-orange-400",
        ring: "ring-orange-300",
        icon: <Medal size={18} />,
    },
    potential: {
        badge: "from-emerald-400 to-teal-500",
        ring: "ring-emerald-300",
        icon: <Sparkles size={18} />,
    },
    certificate: {
        badge: "from-indigo-400 to-violet-500",
        ring: "ring-indigo-300",
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
            className={`relative rounded-3xl bg-white p-6 shadow ring-1 ${style.ring} 
                ${highlight ? "scale-105 shadow-2xl transition-transform" : "hover:shadow-lg transition"}`}>
            <div
                className={`absolute -top-3 right-4 flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${style.badge}`}>
                {style.icon} {award.prize}
            </div>
            <h4 className="font-semibold text-gray-900">{award.title}</h4>
            <div className="mt-2 text-sm text-gray-600">
                🎹 Học sinh: <span className="font-medium">{studentName}</span>
            </div>
        </div>
    );
}

export default function AchievementClient({ awards, studentName, classAwards, studentNameMap }: AchievementClientProps) {
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
        <section className="space-y-20">

            {/* ================= Header ================= */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-[#fdfcf9] via-[#f7f3eb] to-[#eef7f3] p-6 sm:p-10 md:p-6 shadow-sm">
                <div className="absolute -top-20 -right-20 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-yellow-200/20 blur-3xl" />

                <div className="relative flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
                    <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-2xl sm:rounded-3xl bg-white shadow ring-1 ring-emerald-200">
                        <Trophy size={28} className="text-emerald-600 sm:hidden" />
                        <Trophy size={32} className="hidden sm:block md:hidden text-emerald-600" />
                        <Trophy size={36} className="hidden md:block text-emerald-600" />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-emerald-600 font-semibold">
                            Piano Achievements
                        </p>
                        <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900">
                            Giải thưởng & Thành tích
                        </h1>
                        <p className="max-w-xl text-sm sm:text-base text-gray-600 leading-relaxed">
                            Những dấu ấn đáng tự hào được ghi nhận qua từng cuộc thi và từng nỗ lực của các em
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 p-10 space-y-8">
                <div className="absolute -top-5 right-8 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-white text-sm font-semibold shadow">
                    <Sparkles size={16} />
                    Thành tích cá nhân
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow">
                        <User size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-emerald-800">
                            Giải thưởng của học sinh
                        </h2>
                        <p className="text-sm text-gray-600">
                            Học sinh: <span className="font-medium">{studentName}</span>
                        </p>
                    </div>
                </div>

                {sortedAwards.length === 0 ? (
                    <p className="text-gray-500 italic">
                        Con hãy tiếp tục nỗ lực và giữ vững tinh thần học tập để chinh phục những giải thưởng trong thời gian tới nhé ^^
                    </p>
                ) : (
                    awardYears.map(year => (
                        <div key={year} className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-700">{year}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {awardsByYear[year].map(a => (
                                    <AwardCard key={a.id} award={a} studentName={studentName} />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ================= CLASS AWARDS (TIMELINE) ================= */}
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-10 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center shadow">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Thành tích chung của lớp
                        </h2>
                    </div>
                </div>

                {sortedClassAwards.length === 0 ? (
                    <p className="text-gray-500 italic">
                        Hiện chưa có thành tích chung nào được ghi nhận.
                    </p>
                ) : (
                    classAwardYears.map(year => (
                        <div key={year} className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-700">{year}</h3>
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
            <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-8">
                <div className="flex gap-4 text-emerald-700">
                    <Star size={20} className="mt-0.5" />
                    <p className="text-sm leading-relaxed">
                        Mỗi giải thưởng là một dấu mốc nhỏ trên hành trình học tập,
                        là những cố gắng thầm lặng, sự kiên trì và niềm đam mê âm nhạc được nuôi dưỡng theo thời gian.
                    </p>
                </div>
            </div>
        </section>
    );
}
