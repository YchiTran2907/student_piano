export interface ScheduleItem {
    date: string;
    time: string;
    subject: string;
    teacher: string;
    location: string;
}

export interface Student {
    name: string;
    parentName: string;
    contact: string;
    age: number;
    grade: string;
    className: string;
    teacher: string;
    totalSessions: number;
    attended: number;
    schedule: ScheduleItem[];
}

export const student: Student = {
    name: "Nguyễn Minh Toàn",
    parentName: "John Smith",
    contact: "0123 456 789",
    age: 21,
    grade: "Grade 6 (Intermediate)",
    className: "Piano Class A",
    teacher: "Mr. Ichi",
    totalSessions: 20,
    attended: 12,
    schedule: [
        {
            date: "2025-12-05",
            time: "10:00 - 11:00",
            subject: "Piano",
            teacher: "Mr. Ichi",
            location: "Room A1",
        },
        {
            date: "2025-12-06",
            time: "14:00 - 15:00",
            subject: "Music Theory",
            teacher: "Ms. Lan",
            location: "Room B2",
        },
        {
            date: "2025-12-07",
            time: "09:00 - 10:00",
            subject: "Piano",
            teacher: "Mr. Ichi",
            location: "Room A1",
        },
    ],
};
