import prisma from './prisma';
import { notFound } from 'next/navigation';

export interface Accounts {
    id: number;
    email: string;
    password: string;
    role: string;
}

export interface ScheduleItem {
    id: number;
    day: string;
    time: string;
    subject: string;
    location: string;
    studentEmail: string;
}

export interface MonthlyAttendance {
    id: number;
    month: number;
    days: number[];
    startDate: Date;
    yearlyScheduleId: number;
}

export interface YearlySchedule {
    id: number;
    year: number;
    monthlyData?: MonthlyAttendance[];
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

export interface Award {
    id: number;
    title: string;
    prize: string;
    level: string;
    year: number;
    studentEmail: string;
    createdAt: Date;
    updatedAt: Date;
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
    del_flg: number;
    scheduleItems: ScheduleItem[];
    yearlySchedules: YearlySchedule[];
    awards: Award[];
}

export interface ProgressAndEvaluation {
    progress: ProgressItem[];
    evaluations: Evaluation[];
}

export type GroupedStudentSchedule = {
    id: number;
    name: string;
    studentEmail: string;
    schedules: ScheduleItem[];
};


export async function getAccountDataByEmail(email: string): Promise<Accounts> {
    try {
        const role = await prisma.account.findUnique({
            where: { email }
        });

        if (!role) {
            notFound();
        }

        return role as Accounts;

    } catch (error) {
        console.error('DATABASE ERROR: Failed to fetch Account data.', error);
        throw new Error('Failed to fetch Account data.');
    }
}

export async function getStudentDataByEmail(email: string): Promise<StudentData> {
    try {
        const student = await prisma.student.findUnique({
            where: { email },
            include: {
                scheduleItems: true,
                awards: true,
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

export async function getAllStudents(delFlg?: number): Promise<StudentData[]> {
    try {
        const adminAccounts = await prisma.account.findMany({
            where: {
                role: "Admin",
            },
            select: {
                email: true,
            },
        });

        const adminEmails = adminAccounts.map((a) => a.email);

        const students = await prisma.student.findMany({
            where: {
                email: {
                    notIn: adminEmails,
                },
                ...(delFlg !== undefined && { del_flg: delFlg }),
            },
            include: {
                scheduleItems: true,
                awards: true,
                yearlySchedules: true
            },
            orderBy: {
                id: "asc",
            },
        });

        return students as StudentData[];
    } catch (error) {
        console.error("DATABASE ERROR: Failed to fetch all students.", error);
        throw new Error("Failed to fetch all students.");
    }
}

export async function getGroupedStudentSchedules(delFlg: number) {
    const students = await getAllStudents(delFlg);

    const schedules = students.flatMap((student) =>
        student.scheduleItems.map((schedule) => ({
            ...schedule,
            id: student.id,
            name: student.name
        }))
    );

    const grouped = Object.values(
        schedules.reduce((acc, cur) => {
            if (!acc[cur.studentEmail]) {
                acc[cur.studentEmail] = {
                    id: cur.id,
                    name: cur.name,
                    studentEmail: cur.studentEmail,
                    schedules: [],
                };
            }

            acc[cur.studentEmail].schedules.push(cur);
            return acc;
        }, {} as Record<string, GroupedStudentSchedule>)
    );

    return grouped;
}

