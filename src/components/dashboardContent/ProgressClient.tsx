'use client';

import React, { useState } from 'react';
import { BookOpen, Target, Layers, Star, ChevronDown } from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { ProgressAndEvaluation, Scores } from '../../../lib/data';

/* ========= Helpers ========= */

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('vi-VN');
}

function getWeekNumber(baseDate: Date, currentDate: Date) {
    const diffTime = currentDate.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7) + 1;
}

const getProgressIcon = (type: string) => {
    switch (type) {
        case 'Mục tiêu':
            return <Target className="text-violet-600" size={16} />;
        case 'Bài học':
            return <BookOpen className="text-sky-600" size={16} />;
        default:
            return <Layers className="text-slate-500" size={16} />;
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
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
                Không có dữ liệu tiến độ.
            </div>
        );
    }

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

    return (
        <section className="space-y-10 font-sans bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6 rounded-3xl">

            {/* HEADER */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md p-6 shadow-sm">
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-violet-300/30 to-sky-300/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/20 to-violet-200/20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    {/* icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl
                        bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-md">
                        <Layers size={22} />
                    </div>
                    {/* text */}
                    <div className="space-y-1">
                        <p className="uppercase tracking-[0.25em] text-xs text-violet-600 font-semibold">
                            Learning Progress
                        </p>

                        <h1 className="text-xl font-semibold text-slate-900">
                            Tiến độ học tập
                        </h1>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Theo dõi hành trình học tập và đánh giá năng lực theo từng giai đoạn
                        </p>
                    </div>
                </div>
            </div>

            {/* ===================== PROGRESS ===================== */}
            {progress.length > 0 && (
                <div className="space-y-6">
                    {Object.entries(grouped).map(([title, items]) => {

                        const [isOpen, setIsOpen] = useState(false);

                        const objectiveItem = items.find((i: any) => i.type === "Mục tiêu");
                        const baseDate: Date | null = objectiveItem
                            ? new Date(objectiveItem.date)
                            : null;
                        const weeks: Record<number, any[]> = {};
                        const evaluationsInProgress: any[] = [];
                        const others: any[] = [];

                        items.forEach((item: any) => {

                            if (item.type === "Mục tiêu") return;

                            if (item.type === "Đánh giá") {
                                evaluationsInProgress.push(item);
                                return;
                            }

                            if (item.type === "Bài học") {
                                if (!baseDate) {
                                    others.push(item);
                                    return;
                                }
                                const currentDate = new Date(item.date);
                                const diffTime = currentDate.getTime() - baseDate.getTime();
                                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                                const weekNumber = Math.floor(diffDays / 7) + 1;

                                if (!weeks[weekNumber]) weeks[weekNumber] = [];
                                weeks[weekNumber].push(item);
                                return;
                            }

                            others.push(item);
                        });

                        return (
                            <div
                                key={title}
                                className="rounded-2xl border border-violet-100 bg-white shadow-sm overflow-hidden"
                            >
                                {/* HEADER */}
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center justify-between px-6 py-4 cursor-pointer bg-white hover:bg-violet-50/40 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-violet-100">
                                            <Layers size={18} className="text-violet-700" />
                                        </div>

                                        <h3 className="text-sm font-semibold text-slate-800">
                                            {title}
                                        </h3>
                                    </div>

                                    <ChevronDown
                                        size={18}
                                        className={`text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </div>

                                {/* CONTENT */}
                                <div
                                    className={`transition-all duration-500 overflow-hidden ${isOpen ? "opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="bg-gradient-to-b from-violet-50/40 via-white to-sky-50/30 px-6 py-6 space-y-8 border-t border-violet-100">

                                        {/* MỤC TIÊU */}
                                        {objectiveItem && (
                                            <div className="rounded-xl bg-violet-50 border border-violet-100 p-5">
                                                <p className="text-xs font-semibold uppercase text-violet-600 mb-2">
                                                    Mục tiêu
                                                </p>
                                                <p className="text-xs text-slate-500 mb-2">
                                                    {formatDate(objectiveItem.date)}
                                                </p>
                                                <p className="text-slate-800 whitespace-pre-line">
                                                    {objectiveItem.description}
                                                </p>
                                            </div>
                                        )}

                                        {/* WEEK */}
                                        {Object.entries(weeks)
                                            .sort((a, b) => Number(b[0]) - Number(a[0]))
                                            .map(([week, weekItems], idx, arr) => (
                                                <div key={week} className="space-y-3">

                                                    <div className="flex items-center gap-2">
                                                        <div className="h-6 w-6 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-bold">
                                                            {arr.length - idx}
                                                        </div>
                                                        <h4 className="text-sm font-semibold text-violet-800">
                                                            Lần {arr.length - idx}
                                                        </h4>
                                                    </div>

                                                    <div className="space-y-3 pl-8 border-l-2 border-violet-200">
                                                        {weekItems.map((item: any, index: number) => (
                                                            <div
                                                                key={index}
                                                                className="bg-white border border-violet-100 rounded-lg p-4"
                                                            >
                                                                <p className="text-slate-700 whitespace-pre-line">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}

                                        {/* ĐÁNH GIÁ (tách rõ màu amber giống Schedule alert style) */}
                                        {evaluationsInProgress.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-amber-700">
                                                    Đánh giá
                                                </h4>

                                                {evaluationsInProgress.map((item: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl bg-amber-50 border border-amber-200 p-4"
                                                    >
                                                        <p className="text-xs text-slate-500 mb-1">
                                                            {formatDate(item.date)}
                                                        </p>
                                                        <p className="text-slate-800 whitespace-pre-line">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* KHÁC */}
                                        {others.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-slate-600">
                                                    Thông tin khác
                                                </h4>

                                                {others.map((item: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl bg-slate-50 border border-slate-100 p-4"
                                                    >
                                                        <p className="text-xs text-slate-500 mb-1">
                                                            {formatDate(item.date)}
                                                        </p>
                                                        <p className="text-slate-700 whitespace-pre-line">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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

                    <h3 className="text-xl font-semibold text-violet-800 flex items-center gap-2">
                        <Star size={20} />
                        Đánh giá năng lực
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {evaluations.map((evaluation, index) => {
                            const radarData = toRadarData(evaluation.scores);

                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm"
                                >
                                    <p className="text-sm font-semibold text-violet-700">
                                        {evaluation.label}
                                    </p>

                                    <p className="text-xs text-slate-500 mb-4">
                                        {formatDate(evaluation.date)}
                                    </p>

                                    <ResponsiveContainer width="100%" height={280}>
                                        <RadarChart data={radarData}>
                                            <PolarGrid stroke="#e9d5ff" />
                                            <PolarAngleAxis dataKey="skill" />
                                            <PolarRadiusAxis domain={[0, 10]} />
                                            <Radar
                                                dataKey="value"
                                                stroke="#7c3aed"
                                                fill="#7c3aed"
                                                fillOpacity={0.35}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
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