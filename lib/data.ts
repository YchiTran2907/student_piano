import prisma from './prisma';
import { notFound } from 'next/navigation';

export interface ScheduleItem {
    id: number;
    day: string;
    time: string;
    subject: string;
    location: string;
}

export interface MonthlyAttendance {
    id: number;
    month: string;
    days: number[];
    startDate: Date;
    yearlyScheduleId: number;
}

export interface YearlySchedule {
    id: number;
    year: number;
    monthlyData: MonthlyAttendance[];
}

export interface ProgressItem {
    id: number;
    date: Date;
    type: "Mục tiêu" | "Bài học" | "Đánh giá";
    title: string;
    description: string;
}

export interface Scores {
    Technique: number;
    SightReading: number;
    Musicality: number;
    Theory: number;
}

export interface Evaluation {
    id: number;
    date: Date;
    label: string;
    scores: Scores;
}

export interface StudentData {
    id: number;
    email: string;
    name: string;
    parentName: string;
    contact: string;
    age: number;
    grade: string;
    className: string;
    teacher: string;
    totalSessions: number;
    attended: number;
    fee: string;
    scheduleItems: ScheduleItem[];
}

export async function getStudentDataByEmail(email: string): Promise<StudentData> {
    try {
        const student = await prisma.student.findUnique({
            where: { email },
            include: {
                scheduleItems: true,
            },
        });

        if (!student) {
            notFound();
        }

        return student as StudentData;

    } catch (error) {
        console.error('DATABASE ERROR: Failed to fetch student data.', error);
        throw new Error('Failed to fetch student data.');
    }
}

export async function getScheduleDataByEmail(email: string): Promise<YearlySchedule[]> {
    try {
        const yearlySchedules = await prisma.yearlySchedule.findMany({
            where: { studentEmail: email },
            include: {
                monthlyData: true,
            },
            orderBy: { year: 'desc' },
        });

        return yearlySchedules as YearlySchedule[];

    } catch (error) {
        console.error('DATABASE ERROR: Failed to fetch schedule data.', error);
        throw new Error('Failed to fetch schedule data.');
    }
}

export interface ProgressAndEvaluation {
    progress: ProgressItem[];
    evaluations: Evaluation[];
}

export async function getProgressDataByEmail(email: string): Promise<ProgressAndEvaluation> {
    try {
        const progressList = await prisma.progress.findMany({
            where: { studentEmail: email },
            orderBy: { date: 'desc' },
        });

        const evaluationList = await prisma.evaluation.findMany({
            where: { studentEmail: email },
            orderBy: { date: 'desc' },
        });

        const evaluations = evaluationList.map(
            (e: (typeof evaluationList)[number]) => ({
                ...e,
                scores: e.scores as unknown as Scores,
            })
        );

        return {
            progress: progressList as ProgressItem[],
            evaluations: evaluations as Evaluation[],
        };

    } catch (error) {
        console.error('DATABASE ERROR: Failed to fetch progress data.', error);
        throw new Error('Failed to fetch progress data.');
    }
}