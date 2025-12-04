"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import accountsData from "@/data/accounts.json";

export interface Account {
    email: string;
    password: string;
}

const accounts = accountsData as Account[];

export async function loginAction(email: string, password: string) {
    const account = accounts.find(
        (acc) =>
            acc.email.toLowerCase().trim() === email.toLowerCase().trim() &&
            acc.password === password
    );

    if (!account) {
        return { success: false, message: "Email hoặc mật khẩu không đúng" };
    }

    const cookieStore = cookies();

    (await cookieStore).set("loggedIn", "true", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    (await cookieStore).set("userEmail", account.email, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
}

export async function logoutAction() {
    const cookieStore = cookies();

    (await cookieStore).set("userEmail", "", {
        path: "/",
        expires: new Date(0)
    });

    (await cookieStore).set("loggedIn", "", {
        path: "/",
        expires: new Date(0),
    });

    redirect("/login");
}