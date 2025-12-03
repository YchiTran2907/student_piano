export interface MonthlyAttendance {
    month: string;
    attended: number;
    total: number;
}

export interface YearlySchedule {
    year: number;
    monthlyData: MonthlyAttendance[];
}

export interface Schedule {
    email: string;
    yearlyData: YearlySchedule[];
}

export const schedules: Schedule[] = [
    {
        email: "ychitq@gmail.com",
        yearlyData: [
            {
                year: 2025,
                monthlyData: [
                    { month: "1", attended: 6, total: 8 },
                    { month: "2", attended: 7, total: 8 },
                    { month: "3", attended: 5, total: 8 },
                    { month: "4", attended: 8, total: 8 },
                    { month: "5", attended: 6, total: 8 },
                    { month: "6", attended: 7, total: 8 },
                ],
            },
            {
                year: 2026,
                monthlyData: [
                    { month: "1", attended: 8, total: 8 },
                    { month: "2", attended: 7, total: 8 },
                ],
            },
        ],
    },
    {
        email: "anan@gmail.com",
        yearlyData: [
            {
                year: 2025,
                monthlyData: [
                    { month: "1", attended: 8, total: 8 },
                    { month: "2", attended: 6, total: 8 },
                    { month: "3", attended: 7, total: 8 },
                ],
            },
        ],
    },
];
