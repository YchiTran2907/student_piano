export interface ScheduleItem {
    day: string;
    time: string;
    subject: string;
    location: string;
}

export interface Student {
    name: string;
    email: string;
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

export const students = [
    {
        name: "Nguyễn Minh Toàn",
        email: "ychitq@gmail.com",
        parentName: "John Smith",
        contact: "0123 456 789",
        age: 21,
        grade: "Grade 6 (Intermediate)",
        className: "Piano Class A",
        teacher: "Mr. Ichi",
        totalSessions: 20,
        attended: 12,
        schedule: [
            { day: "Thứ hai", time: "15:00 - 16:00", subject: "Piano", location: "Room A2" },
            { day: "Thứ tư", time: "15:00 - 16:00", subject: "Piano", location: "Room A2" },
            { day: "Thứ sáu", time: "15:00 - 16:00", subject: "Piano", location: "Room A2" },
        ]
    },
    {
        name: "Nguyễn Minh An",
        email: "anan@gmail.com",
        parentName: "Mary Smith",
        contact: "0123 555 888",
        age: 19,
        grade: "Grade 5 (Beginner)",
        className: "Piano Class B",
        teacher: "Ms. Hana",
        totalSessions: 18,
        attended: 10,
        schedule: [
            { day: "Chủ nhật", time: "15:00 - 16:00", subject: "Piano", location: "Room A2" },
            { day: "Thứ hai", time: "15:00 - 16:00", subject: "Piano", location: "Room A2" },
            { day: "Thứ ba", time: "15:00 - 16:00", subject: "Piano", location: "Room A2" },
        ]
    },
];


