"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 p-6 font-sans relative overflow-x-hidden">

      {/* BACKGROUND GLOW (FIXED - không gây scroll) */}
      <div className="fixed -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-violet-300/20 to-sky-300/20 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-sky-200/20 to-violet-200/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-md w-full rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm p-10 text-center">

        {/* ICON */}
        <div className="mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl 
            bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-md text-2xl">
            🎹
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">
          Ichi's Piano
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-500 leading-relaxed mb-10">
          Quản lý tiến độ học tập, lịch học, cuộc thi và giải thưởng của học viên
        </p>

        {/* BUTTON */}
        <Link
          href="/login"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl
          font-medium text-white bg-gradient-to-r from-violet-500 to-sky-500
          shadow-md hover:shadow-lg transition-all duration-300"
        >
          Đăng nhập
        </Link>

        {/* FOOTER */}
        <p className="mt-8 text-xs text-slate-400 tracking-wide">
          Designed by YChiTQ 🎵
        </p>

      </div>
    </div>
  );
}