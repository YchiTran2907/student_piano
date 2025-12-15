import prisma from "../prisma";

export type UpdateOperation =
    | {
        model: "account";
        type: "update" | "updateMany";
        where: Parameters<typeof prisma.account.update>[0]["where"];
        data: Parameters<typeof prisma.account.update>[0]["data"];
    }
    | {
        model: "student";
        type: "update" | "updateMany";
        where: Parameters<typeof prisma.student.update>[0]["where"];
        data: Parameters<typeof prisma.student.update>[0]["data"];
    }
    | {
        model: "monthlyData";
        type: "update" | "updateMany";
        where: Parameters<typeof prisma.monthlyData.update>[0]["where"];
        data: Parameters<typeof prisma.monthlyData.update>[0]["data"];
    }
    | {
        model: "yearlySchedule";
        type: "update" | "updateMany";
        where: Parameters<typeof prisma.yearlySchedule.update>[0]["where"];
        data: Parameters<typeof prisma.yearlySchedule.update>[0]["data"];
    }
    | {
        model: "progress";
        type: "update" | "updateMany";
        where: Parameters<typeof prisma.progress.update>[0]["where"];
        data: Parameters<typeof prisma.progress.update>[0]["data"];
    }
    | {
        model: "evaluation";
        type: "update" | "updateMany";
        where: Parameters<typeof prisma.evaluation.update>[0]["where"];
        data: Parameters<typeof prisma.evaluation.update>[0]["data"];
    };

export async function runDbUpdates(operations: UpdateOperation[]) {
    const queries = operations.map((op) => {
        switch (op.model) {
            case "account":
                return op.type === "update"
                    ? prisma.account.update({ where: op.where, data: op.data })
                    : prisma.account.updateMany({ where: op.where, data: op.data });

            case "student":
                return op.type === "update"
                    ? prisma.student.update({ where: op.where, data: op.data })
                    : prisma.student.updateMany({ where: op.where, data: op.data });

            case "monthlyData":
                return op.type === "update"
                    ? prisma.monthlyData.update({ where: op.where, data: op.data })
                    : prisma.monthlyData.updateMany({ where: op.where, data: op.data });

            case "yearlySchedule":
                return op.type === "update"
                    ? prisma.yearlySchedule.update({ where: op.where, data: op.data })
                    : prisma.yearlySchedule.updateMany({ where: op.where, data: op.data });

            case "progress":
                return op.type === "update"
                    ? prisma.progress.update({ where: op.where, data: op.data })
                    : prisma.progress.updateMany({ where: op.where, data: op.data });

            case "evaluation":
                return op.type === "update"
                    ? prisma.evaluation.update({ where: op.where, data: op.data })
                    : prisma.evaluation.updateMany({ where: op.where, data: op.data });
        }
    });

    return prisma.$transaction(queries);
}
