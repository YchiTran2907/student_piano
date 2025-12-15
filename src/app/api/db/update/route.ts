// app/api/db/update/route.ts
import { NextResponse } from "next/server";
import { runDbUpdates } from "../../../../../lib/db/update";

export async function POST(req: Request) {
    try {
        const { operations } = await req.json();

        const results = await runDbUpdates(operations);

        return NextResponse.json({
            success: true,
            results,
        });
    } catch (error: any) {
        console.error("DB update error:", error);
        return NextResponse.json(
            { error: error.message ?? "Internal Server Error" },
            { status: 500 }
        );
    }
}
