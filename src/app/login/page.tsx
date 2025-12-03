"use client";

import { useState, useEffect } from "react";

export default function LoginPage() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timeout);
    }, []);

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
                    <h1 className="text-2xl font-semibold text-gray-900 mt-4">
                        Welcome
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Sign in to continue managing your students.
                    </p>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    If you don’t have an account. Please contact with teacher
                </div>
            </div>
        </div>
    );
}
