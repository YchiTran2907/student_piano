import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { runDbUpdates, type UpdateOperation } from "../../../../../lib/db/update";

export async function POST(req: Request) {
    try {
        const { studentId } = await req.json();

        if (!studentId) {
            return NextResponse.json(
                { error: "Missing studentId" },
                { status: 400 }
            );
        }

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const yearlySchedule = await prisma.yearlySchedule.findFirst({
            where: { id: studentId },
            orderBy: { year: "desc" },
            include: {
                monthlyData: {
                    orderBy: { month: "desc" },
                },
            },
        });

        if (!yearlySchedule) {
            return NextResponse.json(
                { error: "No yearly schedule found" },
                { status: 404 }
            );
        }

        const currentMonth = yearlySchedule.monthlyData.find(
            (m) => m.month === month
        );

        // Trường hợp có tháng hiện tại
        if (currentMonth) {
            if (currentMonth.days.includes(day)) {
                return NextResponse.json({
                    success: true,
                    skipped: true,
                    message: "Already checked in today",
                });
            }

            const ops: UpdateOperation[] = [
                {
                    model: "monthlyData",
                    type: "update",
                    where: { id: currentMonth.id },
                    data: {
                        days: { push: day },
                    },
                },
            ];

            await runDbUpdates(ops);

            return NextResponse.json({
                success: true,
                action: "updated",
                month,
                day,
            });
        }

        // Trường hợp chưa có tháng hiện tại
        const previousMonth = yearlySchedule.monthlyData[0];

        const startDate = previousMonth?.startDate ?? new Date(year, month - 1, 1);

        const newMonthlyData = await prisma.monthlyData.create({
            data: {
                month,
                days: [day],
                startDate,
                yearlyScheduleId: yearlySchedule.id,
            },
        });

        return NextResponse.json({
            success: true,
            action: "created",
            monthlyDataId: newMonthlyData.id,
            month,
            day,
        });

    } catch (error: any) {
        console.error("Attendance checkin error:", error);
        return NextResponse.json(
            { error: error.message ?? "Internal Server Error" },
            { status: 500 }
        );
    }
}
