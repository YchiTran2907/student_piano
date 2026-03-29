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
                                className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden"
                            >
                                {/* HEADER */}
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-stone-50 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-100">
                                            <Layers size={20} className="text-emerald-700" />
                                        </div>
                                        <h3 className="text-md font-semibold text-stone-800">
                                            {title}
                                        </h3>
                                    </div>

                                    <ChevronDown
                                        size={20}
                                        className={`text-stone-500 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </div>

                                {/* CONTENT ANIMATION */}
                                <div
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="bg-stone-50 px-6 py-6 space-y-8 border-t border-stone-200">

                                        {/* 🎯 MỤC TIÊU */}
                                        {objectiveItem && (
                                            <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
                                                <p className="text-xs font-semibold uppercase text-blue-600 mb-1">
                                                    Mục tiêu
                                                </p>
                                                <p className="text-xs text-gray-500 mb-2">
                                                    {formatDate(objectiveItem.date)}
                                                </p>
                                                <p className="text-blue-900 whitespace-pre-line">
                                                    {objectiveItem.description}
                                                </p>
                                            </div>
                                        )}

                                        {Object.entries(weeks)
                                        .sort((a, b) => Number(b[0]) - Number(a[0])) // đảo: mới nhất lên trên
                                        .map(([week, weekItems], idx, arr) => (
                                            <div key={week} className="space-y-3">

                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                                                        {arr.length - idx}
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-emerald-800">
                                                        Lần {arr.length - idx}
                                                    </h4>
                                                </div>

                                                <div className="space-y-3 pl-8 border-l-2 border-emerald-200">
                                                    {weekItems.map((item: any, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="bg-white border border-emerald-100 rounded-lg p-4 shadow-sm"
                                                        >
                                                            <p className="text-gray-800 whitespace-pre-line">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        {/* ⭐ ĐÁNH GIÁ */}
                                        {evaluationsInProgress.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-yellow-700">
                                                    Đánh giá
                                                </h4>
                                                {evaluationsInProgress.map((item: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl bg-yellow-50 border border-yellow-200 p-4"
                                                    >
                                                        <p className="text-xs text-gray-500 mb-1">
                                                            {formatDate(item.date)}
                                                        </p>
                                                        <p className="text-yellow-900 whitespace-pre-line">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {/* 📌 MỤC KHÁC */}
                                        {others.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-stone-700">
                                                    Thông tin khác
                                                </h4>
                                                {others.map((item: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl bg-stone-100 border border-stone-200 p-4"
                                                    >
                                                        <p className="text-xs text-gray-500 mb-1">
                                                            {formatDate(item.date)}
                                                        </p>
                                                        <p className="text-stone-800 whitespace-pre-line">
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
