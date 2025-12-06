"use client";

// JSON
import studentsData from "@/data/student.json";
import schedulesData from "@/data/schedule.json";
import progressData from "@/data/progress.json";

import { useMemo } from "react";
import { ScheduleData, Student } from "./Personal";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressItem {
    date: string;
    type: "Mục tiêu" | "Bài học" | "Đánh giá";
    title: string;
    description: string;
}

interface Score {
    Technique: number;
    SightReading: number;
    Musicality: number;
    Theory: number;
}

interface Evaluation {
    date: string;
    label: string;
    scores: Score;
}

interface ProgressData {
    email: string;
    progressData: ProgressItem[];
    evaluationData: Evaluation[];
}

interface ProgressProps {
    userEmail: string;
}

const getTypeIcon = (type: ProgressItem['type']) => {
    switch (type) {
        case "Mục tiêu": return "🎯";
        case "Bài học": return "🎹";
        case "Đánh giá": return "⭐";
        default: return "📌";
    }
};

interface TimelineCardProps extends ProgressItem { }

function TimelineCard({ date, type, title, description }: TimelineCardProps) {
    const formattedDate = new Date(date).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <div className="flex relative pb-8">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-6 h-6 rounded-full mt-1.5 flex items-center justify-center relative z-10 bg-blue-500 text-white shadow-md">
                {getTypeIcon(type)}
            </div>
            <div className="flex-grow pl-4">
                <time className="font-medium text-xs text-gray-500">{formattedDate}</time>
                <h3 className="font-semibold text-lg text-gray-900 mt-0.5">{title}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${type === 'Đánh giá' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {type}
                </span>
                <p className="mt-2 text-sm text-gray-700">{description}</p>
            </div>
        </div>
    );
}

interface SkillRadarChartProps {
    evaluations: Evaluation[];
}

const MAX_SCORE = 10;
const SKILL_AXIS = [
    { key: 'Technique', fullMark: MAX_SCORE, name: 'Kỹ thuật ngón' },
    { key: 'SightReading', fullMark: MAX_SCORE, name: 'Thị tấu' },
    { key: 'Musicality', fullMark: MAX_SCORE, name: 'Cảm thụ' },
    { key: 'Theory', fullMark: MAX_SCORE, name: 'Lý thuyết' },
];

function SkillRadarChart({ evaluations }: SkillRadarChartProps) {
    if (evaluations.length === 0) {
        return <p className="text-center text-gray-500 py-4">Chưa có dữ liệu đánh giá kỹ năng.</p>;
    }

    // Chuyển đổi dữ liệu đánh giá thành định dạng Recharts cần
    const chartData = SKILL_AXIS.map(axis => {
        const item: Record<string, any> = { skill: axis.name, fullMark: axis.fullMark };

        evaluations.forEach(evalItem => {
            const dataKey = evalItem.label;
            item[dataKey] = evalItem.scores[axis.key as keyof Score];
        });
        return item;
    });

    // Tạo danh sách các đợt đánh giá (labels) cho Recharts <Radar>
    const radarLines = evaluations.map((evalItem, index) => ({
        key: evalItem.label,
        color: index === 0 ? '#3b82f6' : (index === 1 ? '#ef4444' : '#10b981'),
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={chartData}
            >
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                    dataKey="skill"
                    stroke="#4b5563"
                    tick={{ fontSize: 12, fontWeight: 500 }}
                />
                <PolarRadiusAxis
                    domain={[0, MAX_SCORE]}
                    angle={90}
                    stroke="#9ca3af"
                />

                {radarLines.map((line, index) => (
                    <Radar
                        key={line.key}
                        name={line.key}
                        dataKey={line.key}
                        stroke={line.color}
                        fill={line.color}
                        fillOpacity={0.4}
                        opacity={0.8}
                    />
                ))}

                <Tooltip />
                <Legend />
            </RadarChart>
        </ResponsiveContainer>
    );
}

export default function Progress({ userEmail }: ProgressProps) {
    const students = studentsData as Student[];
    const schedules = schedulesData as ScheduleData[];
    const progress = progressData as ProgressData[];

    const student = students.find((st) => st.email === userEmail) || null;

    const summary = useMemo(() => {
        const studentSchedule = schedules.find(s => s.email === userEmail);
        if (!studentSchedule) return { totalAttended: 0, totalSessions: 0, attendanceRate: 0 };

        let totalAttended = 0;
        let totalSessions = 0;

        studentSchedule.yearlyData.forEach(yearData => {
            yearData.monthlyData.forEach(monthData => {
                totalAttended += monthData.attended;
                totalSessions += monthData.days.length;
            });
        });

        const attendanceRate = totalSessions > 0 ? Math.round((totalSessions / totalAttended) * 100) : 0;

        return { totalAttended, totalSessions, attendanceRate };
    }, [userEmail, schedules]);


    // Lấy dữ liệu Timeline
    const timelineData = useMemo(() => {
        const studentProgress = progress.find(p => p.email === userEmail);
        if (!studentProgress) return [];

        // Sắp xếp theo ngày mới nhất trước
        return studentProgress.progressData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [userEmail, progress]);

    // Lấy dữ liệu Đánh giá Kỹ năng (cho Biểu đồ Radar)
    const evaluations = useMemo(() => {
        const studentProgress = progress.find(p => p.email === userEmail);
        return studentProgress?.evaluationData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];
    }, [userEmail, progress]);

    if (!student) return <p className="text-center mt-10 text-gray-600">Không tìm thấy dữ liệu học viên.</p>;

    return (
        <div className="flex flex-col items-center w-full px-2 sm:px-4">
            <h1 className="text-2xl font-bold mt-4 mb-8 text-gray-900">
                Quá trình học tập của {student.name}
            </h1>

            <div className="w-full max-w-4xl mx-auto mb-10">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Thống kê tổng quát</h2>
                <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-xl shadow-lg border border-gray-100">

                    <div>
                        <p className="text-4xl font-extrabold text-blue-600">{summary.totalSessions}</p>
                        <p className="text-sm text-gray-500">Buổi đã học</p>
                    </div>

                    <div>
                        <p className="text-4xl font-extrabold text-gray-800">{summary.totalAttended}</p>
                        <p className="text-sm text-gray-500">Tổng số buổi</p>
                    </div>

                    <div>
                        <p className={`text-4xl font-extrabold ${summary.attendanceRate >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.round(summary.attendanceRate)}%
                        </p>
                        <p className="text-sm text-gray-500">Tỷ lệ Chuyên cần</p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-4xl mx-auto mb-10">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                    🕸️ Tiến Độ Kỹ Năng (Thang điểm 1 - 10)
                </h2>
                <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
                    <SkillRadarChart evaluations={evaluations} />
                </div>
            </div>

            <hr className="w-full max-w-4xl border-gray-100 mb-8" />

            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">🗺️ Các Mốc Tiến Bộ</h2>

                {timelineData.length > 0 ? (
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        {timelineData.map((item, index) => (
                            <TimelineCard key={index} {...item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 bg-white rounded-xl shadow-sm">
                        <p>Chưa có mốc tiến bộ nào được ghi nhận.</p>
                    </div>
                )}
            </div>

        </div>
    );
}