"use client";

import React, { JSX } from "react";
import { Trophy, Crown, Medal, Star, User, Sparkles } from "lucide-react";
import { Award } from '../../../lib/data';

const levelStyle: Record<string, { badge: string; ring: string; icon: JSX.Element }> = {
    gold: {
        badge: "from-yellow-400 to-yellow-500",
        ring: "ring-yellow-300",
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
};

interface AchievementClientProps {
    awards: Award[];
    studentName: string;
    classAwards: Award[];
    studentNameMap: Record<string, string>;
}

export default function AchievementClient({ awards, studentName, classAwards, studentNameMap }: AchievementClientProps) {
    return (
        <section className="space-y-20">

            {/* ================= HERO ================= */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-[#fdfcf9] via-[#f7f3eb] to-[#eef7f3] p-12 shadow-sm">

                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-yellow-200/20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-8">
                    {/* Icon */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow ring-1 ring-emerald-200">
                        <Trophy size={36} className="text-emerald-600" />
                    </div>

                    {/* Text */}
                    <div className="space-y-3">
                        <p className="uppercase tracking-[0.3em] text-sm text-emerald-600 font-semibold">
                            Piano Achievements
                        </p>
                        <h1 className="text-3xl md:text-2xl font-serif font-bold text-gray-900">
                            Giải thưởng & Thành tích
                        </h1>
                        <p className="max-w-xl text-gray-600 leading-relaxed">
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

                {awards.length === 0 ? (
                    <p className="text-gray-500 italic"></p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {awards.map((award) => {
                            const style = levelStyle[award.level.toLowerCase()] || levelStyle.bronze;
                            return (
                                <div
                                    key={award.id}
                                    className={`relative rounded-3xl bg-white p-7 shadow-lg ring-2 ${style.ring} hover:shadow-xl transition`}
                                >
                                    <div
                                        className={`absolute -top-4 right-6 flex items-center gap-2 px-4 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${style.badge}`}
                                    >
                                        {style.icon}
                                        {award.prize}
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {award.title}
                                    </h3>

                                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                                        <p>🎹 Học sinh: <span className="font-medium">{studentName}</span></p>
                                        <p>📅 Năm: {award.year}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ================= CLASS AWARDS ================= */}
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

                {classAwards.length === 0 ? (
                    <p className="text-gray-500 italic">
                        Hiện chưa có thành tích chung nào được ghi nhận.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {classAwards.map((award) => {
                            const style = levelStyle[award.level.toLowerCase()] || levelStyle.bronze;

                            return (
                                <div
                                    key={award.id}
                                    className={`relative rounded-3xl bg-white p-7 shadow-md ring-1 ring-slate-200
                hover:ring-2 ${style.ring} hover:shadow-xl transition-all duration-300`}
                                >
                                    {/* Badge */}
                                    <div
                                        className={`absolute -top-4 right-6 flex items-center gap-2
                    px-4 py-1 rounded-full text-white text-sm font-semibold
                    bg-gradient-to-r ${style.badge} shadow`}
                                    >
                                        {style.icon}
                                        {award.prize}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                                        {award.title}
                                    </h3>

                                    {/* Info */}
                                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                                        <p>
                                            🎹 Học sinh:
                                            <span className="font-medium text-gray-800 ml-1">
                                                {studentNameMap[award.studentEmail]}
                                            </span>
                                        </p>
                                        <p>📅 Năm: {award.year}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

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
