'use client';

import React, { useState } from 'react';
import { BookOpen, Target, Layers, Star, ChevronDown } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ProgressAndEvaluation, Scores } from '../../../lib/data';

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('vi-VN');
}

const getProgressIcon = (type: string) => {
    switch (type) {
        case 'Mục tiêu':
            return <Target className="text-red-500" size={16} />;
        case 'Bài học':
            return <BookOpen className="text-emerald-600" size={16} />;
        default:
            return <Layers className="text-gray-500" size={16} />;
    }
};

/* ========= Component ========= */

interface ProgressClientProps {
    initialData: ProgressAndEvaluation;
}

export default function ProgressClient({ initialData }: ProgressClientProps) {
    const { progress, evaluations } = initialData;

    if (progress.length === 0 && evaluations.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow">
                Không có dữ liệu tiến độ.
            </div>
        );
    }

    // Gom progress theo title
    const grouped = progress.reduce((acc: Record<string, any[]>, item) => {
        if (!acc[item.title]) acc[item.title] = [];
        acc[item.title].push(item);
        return acc;
    }, {});

    const priority: Record<'Bài học' | 'Mục tiêu', number> = {
        "Bài học": 2,
        "Mục tiêu": 1
    };

    Object.keys(grouped).forEach(title => {
        const key = title as keyof typeof grouped;
        grouped[key].sort((a: any, b: any) => {
            const typeA = a.type as keyof typeof priority;
            const typeB = b.type as keyof typeof priority;
            return priority[typeA] - priority[typeB];
        });
    });

    const colorMap: Record<string, string> = {
        'Bài học': 'emerald',
        'Mục tiêu': 'red',
        'Đánh giá': 'yellow',
        'default': 'gray'
    };

    return (
        <section className="space-y-12">

            {/* HEADER */}
            <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-[#fffdf8] via-[#f7f3ea] to-[#f1ede4] p-6 sm:p-10 md:p-6 shadow-sm">
                <div className="absolute -top-20 -right-20 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-amber-200/25 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-rose-200/20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
                    <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-2xl sm:rounded-3xl bg-white shadow ring-1 ring-stone-200">
                        <Layers size={28} className="text-stone-700 sm:hidden" />
                        <Layers size={32} className="hidden sm:block md:hidden text-stone-700" />
                        <Layers size={36} className="hidden md:block text-stone-700" />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-stone-600 font-semibold">
                            Learning Progress
                        </p>

                        <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-stone-900">
                            Tiến độ học tập
                        </h1>
                        <p className="max-w-xl text-sm sm:text-base text-stone-600 leading-relaxed">
                            Ghi lại quá trình rèn luyện, mục tiêu học tập và đánh giá năng lực
                            của học sinh theo từng giai đoạn.
                        </p>
                    </div>
                </div>
            </div>

            {/* ===================== PROGRESS ===================== */}
            {progress.length > 0 && (
                <div className="space-y-4">
                    {Object.entries(grouped).map(([title, items]) => {
                        const firstItemType = items.length > 0 ? items[0].type : "default";
                        const headerIcon = getProgressIcon(firstItemType);
                        const borderColor = colorMap[firstItemType] || colorMap["default"];

                        const [isOpen, setIsOpen] = useState(false);

                        return (
                            <div key={title} className="relative ml-4 border-l-4 border-emerald-200">
                                <div
                                    className="flex items-center cursor-pointer gap-4 p-4 bg-white rounded-xl shadow-sm hover:bg-emerald-50 transition"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <div
                                        className={`flex items-center justify-center rounded-full bg-white border-4 h-10 w-10 border-${borderColor}-500 shadow-lg flex-shrink-0`}
                                    >
                                        {headerIcon}
                                    </div>
                                    <h3 className="text-md font-bold text-emerald-800">{title}</h3>
                                    <ChevronDown
                                        size={20}
                                        className={`flex-shrink-0 text-emerald-500 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </div>

                                {/* CONTENT */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px] mt-2" : "max-h-0"
                                        }`}
                                >
                                    <div className="rounded-2xl bg-white border border-emerald-200 p-6 shadow-sm flex flex-col gap-4">
                                        {items.map((item: any, index: number) => {
                                            const isEvaluation = item.type === "Đánh giá";
                                            const isObjective = item.type === "Mục tiêu";
                                            return (
                                                <div key={index} className="flex items-start gap-4">
                                                    <div
                                                        className={`flex-1 rounded-xl p-4 shadow-sm w-full
                                                            ${isEvaluation ? "bg-yellow-50 border border-yellow-200 text-yellow-900" : isObjective ? "bg-blue-50 border border-blue-200 text-blue-900" : "bg-emerald-50 border border-emerald-100 text-gray-700"}`}>
                                                        <span
                                                            className={`inline-block mb-1 text-xs font-semibold uppercase px-2 py-1 rounded-full
                                                            ${isEvaluation ? "bg-yellow-200 text-yellow-800" : "bg-emerald-100 text-emerald-700"}`}>
                                                            {item.type}
                                                        </span>
                                                        <p className="text-xs mt-1 text-gray-500">{formatDate(item.date)}</p>
                                                        <p className="mt-1 whitespace-pre-line">{item.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ===================== EVALUATION ===================== */}
            {evaluations.length > 0 && (
                <div className="space-y-6">

                    <h3 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                        <Star size={20} />
                        Đánh giá năng lực
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {evaluations.map((evaluation, index) => {
                            const radarData = toRadarData(evaluation.scores);

                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm"
                                >
                                    <p className="text-sm font-semibold text-emerald-700 mb-1">
                                        {evaluation.label}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-4">
                                        {formatDate(evaluation.date)}
                                    </p>

                                    <div className="h-[280px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart data={radarData}>
                                                <PolarGrid stroke="#d1fae5" />
                                                <PolarAngleAxis
                                                    dataKey="skill"
                                                    tick={{ fill: '#065f46', fontSize: 12 }}
                                                />
                                                <PolarRadiusAxis
                                                    domain={[0, 10]}
                                                    tick={{ fontSize: 10 }}
                                                />
                                                <Radar
                                                    dataKey="value"
                                                    stroke="#10b981"
                                                    fill="#10b981"
                                                    fillOpacity={0.4}
                                                />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}

/* ========= helpers ========= */

function toRadarData(scores: Scores) {
    return [
        { skill: 'Kỹ thuật', value: scores.Technique },
        { skill: 'Đọc nhạc', value: scores.SightReading },
        { skill: 'Cảm nhạc', value: scores.Musicality },
        { skill: 'Lý thuyết', value: scores.Theory },
    ];
}
