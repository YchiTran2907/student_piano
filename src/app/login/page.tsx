"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";

export default function LoginPage() {
    const router = useRouter();

    const [animate, setAnimate] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        startTransition(async () => {
            const res = await loginAction(email, password);

            if (res.success) {
                router.push("/dashboard");
            } else {
                setError(res.message ?? "Đăng nhập thất bại");
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 p-6 font-sans">

            {/* background glow */}
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-violet-300/20 to-sky-300/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-sky-200/20 to-violet-200/20 blur-3xl" />

            <div
                className={`relative max-w-sm w-full rounded-3xl border border-slate-200 
                bg-white/80 backdrop-blur-md shadow-sm p-8 transition-all duration-700 
                ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >

                {/* HEADER */}
                <div className="text-center mb-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl 
                        bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-md text-2xl">
                        🎹
                    </div>

                    <h1 className="text-xl font-semibold text-slate-900 mt-4">
                        Welcome back
                    </h1>

                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Đăng nhập để tiếp tục quản lý học viên và tiến độ học tập
                    </p>
                </div>

                {/* FORM */}
                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 
                            bg-white text-slate-700 placeholder-slate-400
                            focus:outline-none focus:ring-2 focus:ring-violet-200 shadow-sm"
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 
                            bg-white text-slate-700 placeholder-slate-400
                            focus:outline-none focus:ring-2 focus:ring-violet-200 shadow-sm"
                            required
                        />
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                            {error}
                        </div>
                    )}

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 rounded-xl font-medium text-white
                        bg-gradient-to-r from-violet-500 to-sky-500
                        shadow-md hover:shadow-lg transition-all duration-300
                        disabled:opacity-60"
                    >
                        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                {/* FOOTER */}
                <div className="mt-6 text-center text-xs text-slate-400">
                    Nếu chưa có tài khoản, vui lòng liên hệ giáo viên
                </div>

            </div>
        </div>
    );
}