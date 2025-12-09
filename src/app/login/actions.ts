"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";

export async function loginAction(email: string, password: string) {
    const account = await prisma.account.findUnique({
        where: {
            email: email.toLowerCase().trim(),
        },
        select: {
            email: true,
            password: true,
        },
    });

    if (!account || account.password !== password) {
        return { success: false, message: "Email hoặc mật khẩu không đúng" };
    }

    const cookieStore = cookies();

    (await cookieStore).set("loggedIn", "true", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    (await cookieStore).set("userEmail", account.email, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    return { success: true };
}

export async function logoutAction() {
    const cookieStore = cookies();

    (await cookieStore).set("userEmail", "", {
        path: "/",
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    (await cookieStore).set("loggedIn", "", {
        path: "/",
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    redirect("/login");
}