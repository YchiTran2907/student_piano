'use client';

import React from 'react';
import { BookOpen, Target, Layers, Star } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ProgressAndEvaluation, Scores } from '../../../lib/data';

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('vi-VN');
}

const getProgressIcon = (type: string) => {
    switch (type) {
        case 'Mục tiêu':
            return <Target className="text-red-500" size={18} />;
        case 'Bài học':
            return <BookOpen className="text-emerald-600" size={18} />;
        default:
            return <Layers className="text-gray-500" size={18} />;
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

    return (
        <section className="space-y-12">

            {/* HEADER */}
            <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <Layers className="text-emerald-700" />
                </span>
                <h2 className="text-2xl font-bold text-emerald-900">
                    Tiến độ học tập
                </h2>
            </div>

            {/* ===================== PROGRESS ===================== */}
            {progress.length > 0 && (
                <div className="relative ml-4 border-l-4 border-emerald-200 pl-8">
                    {progress.map((item, index) => (
                        <div key={index} className="mb-10 relative">

                            {/* DOT */}
                            <div className="absolute -left-12 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white border-4 border-emerald-500 shadow">
                                {getProgressIcon(item.type)}
                            </div>

                            {/* CARD */}
                            <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm hover:shadow-md transition">
                                <span className="inline-block mb-2 text-xs font-semibold uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                                    {item.type}
                                </span>

                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(item.date)}
                                </p>

                                <p className="mt-3 text-gray-700 whitespace-pre-line">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
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
