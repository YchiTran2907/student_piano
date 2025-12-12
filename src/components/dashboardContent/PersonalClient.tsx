'use client';

import React from 'react';
import { Mail, Phone, BookOpen, GraduationCap, User, DollarSign, Calendar } from 'lucide-react';
import { StudentData, YearlySchedule } from '../../../lib/data';

const InfoCard = ({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <section className="rounded-2xl border border-emerald-200 bg-white shadow-sm hover:shadow-md transition">
        <header className="flex items-center gap-2 px-6 py-4 border-b border-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
                {title}
            </h2>
        </header>

        <div className="p-6">{children}</div>
    </section>
);

const DetailItem = ({
    label,
    value,
    Icon
}: {
    label: string;
    value: string | number;
    Icon: React.ElementType;
}) => (
    <div className="group flex items-start gap-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 hover:bg-white hover:border-emerald-300 transition">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition">
            <Icon size={18} />
        </div>

        <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-600">
                {label}
            </p>
            <p className="text-sm font-semibold text-gray-900 break-words">
                {value}
            </p>
        </div>
    </div>
);

/* ---------- MAIN ---------- */

interface PersonalClientProps {
    initialData: StudentData;
    yearlySchedule: YearlySchedule[];
    roleUser: string
}

export default function PersonalClient({
    initialData: student, yearlySchedule: yearlySchedule, roleUser: roleUser
}: PersonalClientProps) {
    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    const minYear = yearlySchedule?.length ? Math.min(...yearlySchedule.map(y => y.year)) : undefined;
    const lastYear = yearlySchedule?.length ? Math.max(...yearlySchedule.map(y => y.year)) : undefined;
    return (
        <div className="w-full space-y-6 bg-emerald-50 p-6 rounded-3xl">

            {/* PROFILE SUMMARY */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 p-6 shadow-xl text-white">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-emerald-800">
                    {initials}
                </div>

                <div className="flex-1 space-y-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {student.name}
                    </h1>
                    <p className="text-emerald-100 text-sm">
                        {student.className} · {student.grade}
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 place-items-center sm:place-items-stretch">
                        <div className="rounded-xl bg-white/10 p-3 text-center w-full sm:w-auto">
                            <p className="text-xs uppercase opacity-80">Năm</p>
                            <p className="text-lg font-bold">{lastYear}</p>
                        </div>
                        <div className="rounded-xl bg-white/10 p-3 text-center w-full sm:w-auto">
                            <p className="text-xs uppercase opacity-80">Vai trò</p>
                            <p className="text-lg font-bold">{roleUser}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InfoCard title="Liên hệ">
                    <div className="space-y-3">
                        <DetailItem label="Email" value={student.email} Icon={Mail} />
                        <DetailItem label="Số điện thoại" value={student.contact} Icon={Phone} />
                        <DetailItem label="Phụ huynh" value={student.parentName} Icon={User} />
                        <DetailItem label="Tuổi học viên" value={student.age} Icon={Calendar} />
                    </div>
                </InfoCard>

                <InfoCard title="Học tập">
                    <div className="space-y-3">
                        <DetailItem label="Lớp học" value={student.className} Icon={BookOpen} />
                        <DetailItem label="Trình độ" value={student.grade} Icon={GraduationCap} />
                        <DetailItem label="Giáo viên" value={student.teacher} Icon={User} />
                    </div>
                </InfoCard>

                <InfoCard title="Tài chính">
                    <div className="space-y-3">
                        <DetailItem label="Học phí" value={student.fee} Icon={DollarSign} />
                    </div>
                </InfoCard>

                <InfoCard title="Buổi học (Tổng quan)">
                    <div className="grid grid-cols-2 gap-3">
                        <DetailItem label="Số buổi đăng ký" value={student.totalSessions} Icon={Calendar} />
                        <DetailItem label="Tổng số năm đã học" value={yearlySchedule?.length || 0} Icon={Calendar} />
                        <DetailItem label="Năm bắt đầu học" value={minYear ?? "-"} Icon={Calendar} />
                    </div>
                </InfoCard>
            </div>
        </div>
    );
}
