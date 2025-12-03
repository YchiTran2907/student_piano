"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-md w-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-3xl p-10 text-center transition-all duration-500 hover:shadow-2xl">
        <div className="mb-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-white/70 border border-gray-200 shadow-sm flex items-center justify-center text-2xl">
            🎹
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
          Ichi's Piano
        </h1>

        <p className="text-gray-500 text-base leading-relaxed mb-10">
          Quản lý, báo cáo tiến độ học tập, danh sách các cuộc thi, giải thưởng của học viên.
        </p>

        <Link
          href="/login"
          className="inline-block px-8 py-3 rounded-xl font-medium text-gray-700 bg-white/80 border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-300"
        >
          Đăng nhập
        </Link>

        <p className="mt-8 text-gray-400 text-xs tracking-wide">
          Designed by YChiTQ SSV 🎵
        </p>
      </div>
    </div>
  );
}
