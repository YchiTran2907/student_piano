'use client';

import React from 'react';
import {
    Mail,
    Phone,
    GraduationCap,
    User,
    DollarSign,
    Calendar
} from 'lucide-react';

import { StudentData, YearlySchedule } from '../../../lib/data';

/* ---------- TIMELINE ITEM ---------- */

const TimelineItem = ({
    title,
    subtitle,
    children,
    Icon,
    accent = 'teal'
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    Icon: React.ElementType;
    accent?: 'sky' | 'teal' | 'orange' | 'fuchsia';
}) => {

    const accentMap = {
        sky: {
            bg: 'bg-sky-100',
            text: 'text-sky-700',
            line: 'from-sky-200 via-sky-100 to-transparent'
        },
        teal: {
            bg: 'bg-teal-100',
            text: 'text-teal-700',
            line: 'from-teal-200 via-teal-100 to-transparent'
        },
        orange: {
            bg: 'bg-orange-100',
            text: 'text-orange-700',
            line: 'from-orange-200 via-orange-100 to-transparent'
        },
        fuchsia: {
            bg: 'bg-fuchsia-100',
            text: 'text-fuchsia-700',
            line: 'from-fuchsia-200 via-fuchsia-100 to-transparent'
        }
    };

    const style = accentMap[accent];

    return (
        <div className="group relative flex gap-5">

            {/* ICON + LINE */}
            <div className="relative flex flex-col items-center">
                <div
                    className={`
                        z-10 flex h-12 w-12 items-center justify-center rounded-2xl
                        ${style.bg} ${style.text}
                        shadow-sm
                        transition-all duration-300
                        group-hover:scale-110 group-hover:rotate-3
                    `}
                >
                    <Icon size={18} />
                </div>

                <div className={`mt-2 w-[2px] flex-1 bg-gradient-to-b ${style.line}`} />
            </div>

            {/* CONTENT */}
            <div className="flex-1 pb-8">
                <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl">

                    <h3 className="text-lg font-bold tracking-tight text-slate-800">
                        {title}
                    </h3>

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}

                    <div className="mt-4">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
};

/* ---------- ROW ---------- */

const DetailRow = ({
    label,
    value
}: {
    label: string;
    value: string | number;
}) => (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-none hover:bg-slate-50/60 transition">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="text-sm font-semibold text-slate-800">{value}</span>
    </div>
);

/* ---------- MAIN ---------- */

interface PersonalClientProps {
    initialData: StudentData;
    yearlySchedule: YearlySchedule[];
    roleUser: string;
}

export default function PersonalClient({
    initialData: student,
    yearlySchedule,
    roleUser
}: PersonalClientProps) {

    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    const minYear = yearlySchedule?.length
        ? Math.min(...yearlySchedule.map(y => y.year))
        : undefined;

    const lastYear = yearlySchedule?.length
        ? Math.max(...yearlySchedule.map(y => y.year))
        : undefined;

    return (
        <div className="w-full rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 font-sans">

           {/* HEADER */}
            <div className="mb-10 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-md">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    {/* AVATAR */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-2xl font-bold text-white shadow-sm">
                        {initials}
                    </div>
                    {/* INFO */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {student.name}
                        </h1>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm text-slate-700">
                                {student.age} tuổi
                            </span>
                            <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm text-slate-700">
                                {minYear ?? '-'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* TWO COLUMN TIMELINE */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

                {/* LEFT */}
                <div className="space-y-6">

                    <TimelineItem
                        title="Thông tin liên hệ"
                        subtitle="Thông tin phụ huynh, học sinh"
                        Icon={Mail}
                        accent="sky"
                    >
                        <DetailRow label="Tài khoản" value={student.email} />
                        <DetailRow label="Số điện thoại" value={student.contact} />
                        <DetailRow label="Phụ huynh" value={student.parentName} />
                        <DetailRow label="Tuổi học viên" value={student.age} />
                    </TimelineItem>

                    <TimelineItem
                        title="Thông tin học tập"
                        subtitle="Trạng thái học hiện tại"
                        Icon={GraduationCap}
                        accent="teal"
                    >
                        <DetailRow label="Lớp học" value={student.className} />
                        <DetailRow label="Trình độ" value={student.grade} />
                        <DetailRow label="Giáo viên" value={student.teacher} />
                    </TimelineItem>

                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                    <TimelineItem
                        title="Học phí"
                        subtitle="Học phí & thanh toán"
                        Icon={DollarSign}
                        accent="orange"
                    >
                        <DetailRow label="Học phí" value={student.fee} />
                    </TimelineItem>

                    <TimelineItem
                        title="Thông tin buổi học"
                        subtitle="Tiến trình học tập"
                        Icon={Calendar}
                        accent="fuchsia"
                    >
                        <DetailRow label="Số buổi đăng ký" value={student.totalSessions} />
                        <DetailRow label="Năm bắt đầu" value={minYear ?? '-'} />
                        <DetailRow label="Năm gần nhất" value={lastYear ?? '-'} />
                    </TimelineItem>

                </div>
            </div>

            {/* SUMMARY STRIP */}
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">Quyền</p>
                    <p className="mt-1 font-semibold text-emerald-600">{roleUser}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">Tổng buổi</p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {student.totalSessions}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">Năm học</p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {minYear} - {lastYear}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">Học phí</p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {student.fee}
                    </p>
                </div>

            </div>

        </div>
    );
}