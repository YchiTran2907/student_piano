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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
            <div
                className={`max-w-sm w-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-3xl p-8 transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
            >
                <div className="text-center mb-8">
                    <div className="mx-auto w-14 h-14 rounded-full bg-white/70 border border-gray-200 shadow-sm flex items-center justify-center text-2xl">
                        🎹
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900 mt-4">Welcome</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Vui lòng đăng nhập để tiếp tục sử dụng chức năng quản lý học viên
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
                            required
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Nếu bạn không có tài khoản, vui lòng liên hệ giáo viên của bạn
                </div>
            </div>
        </div>
    );
}
