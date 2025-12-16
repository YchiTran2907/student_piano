"use client";

import React from "react";
import { Trophy, Crown, Medal, Star, User, Sparkles } from "lucide-react";

const currentUserEmail = "parent1@gmail.com";

/* ================= MOCK DATA ================= */
const allAwards = [
    {
        id: 1,
        title: "Liên hoan Piano Thiếu Nhi TP.HCM",
        prize: "Giải Nhất",
        student: "Trần Gia Huy",
        email: "parent1@gmail.com",
        year: 2024,
        level: "gold",
    },
    {
        id: 2,
        title: "Vietnam Young Pianist",
        prize: "Giải Nhì",
        student: "Nguyễn Minh Anh",
        email: "parent2@gmail.com",
        year: 2023,
        level: "silver",
    },
    {
        id: 3,
        title: "Cuộc thi Piano Mùa Xuân",
        prize: "Khuyến khích",
        student: "Lê Hoàng Phúc",
        email: "parent3@gmail.com",
        year: 2022,
        level: "bronze",
    },
];

const levelStyle: any = {
    gold: {
        badge: "from-yellow-400 to-yellow-500",
        ring: "ring-yellow-300",
        icon: <Crown size={18} />,
    },
    silver: {
        badge: "from-gray-300 to-gray-400",
        ring: "ring-gray-300",
        icon: <Medal size={18} />,
    },
    bronze: {
        badge: "from-orange-300 to-orange-400",
        ring: "ring-orange-300",
        icon: <Medal size={18} />,
    },
};

export default function AwardsClient() {
    const myAwards = allAwards.filter(
        (a) => a.email === currentUserEmail
    );

    return (
        <section className="space-y-20">

            {/* ================= HERO ================= */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-[#fdfcf9] via-[#f7f3eb] to-[#eef7f3] p-12 shadow-sm">

                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-yellow-200/20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-8">
                    {/* Icon */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow ring-1 ring-emerald-200">
                        <Trophy size={36} className="text-emerald-600" />
                    </div>

                    {/* Text */}
                    <div className="space-y-3">
                        <p className="uppercase tracking-[0.3em] text-sm text-emerald-600 font-semibold">
                            Piano Achievements
                        </p>
                        <h1 className="text-3xl md:text-2xl font-serif font-bold text-gray-900">
                            Giải thưởng & Thành tích
                        </h1>
                        <p className="max-w-xl text-gray-600 leading-relaxed">
                            Những dấu ấn đáng tự hào được ghi nhận qua từng cuộc thi và từng nỗ lực bền bỉ của các em.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 p-10 space-y-8">
                <div className="absolute -top-5 right-8 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-white text-sm font-semibold shadow">
                    <Sparkles size={16} />
                    Thành tích cá nhân
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow">
                        <User size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-emerald-800">
                            Giải thưởng của học sinh
                        </h2>
                        <p className="text-sm text-gray-600">
                            Gắn liền với tài khoản phụ huynh đang đăng nhập
                        </p>
                    </div>
                </div>

                {myAwards.length === 0 ? (
                    <p className="text-gray-500 italic">
                        Hiện chưa có giải thưởng nào được ghi nhận.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {myAwards.map((award) => {
                            const style = levelStyle[award.level];

                            return (
                                <div
                                    key={award.id}
                                    className={`relative rounded-3xl bg-white p-7 shadow-lg ring-2 ${style.ring} hover:shadow-xl transition`}
                                >
                                    <div
                                        className={`absolute -top-4 right-6 flex items-center gap-2 px-4 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${style.badge}`}
                                    >
                                        {style.icon}
                                        {award.prize}
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {award.title}
                                    </h3>

                                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                                        <p>🎹 Học sinh: <span className="font-medium">{award.student}</span></p>
                                        <p>📅 Năm: {award.year}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="space-y-10">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#f8fafc] via-[#eef2f7] to-[#e5eaf0] p-10 shadow-sm">

                    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-slate-300/30 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

                    <div className="relative flex items-center gap-7">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow ring-1 ring-slate-200">
                            <Trophy size={28} className="text-slate-700" />
                        </div>

                        <div className="space-y-2">
                            <p className="uppercase tracking-[0.25em] text-xs text-slate-600 font-semibold">
                                Class Achievements
                            </p>

                            <h2 className="text-2xl font-serif font-bold text-slate-900">
                                Thành tích chung của lớp
                            </h2>

                            <p className="max-w-lg text-sm text-slate-600 leading-relaxed">
                                Những khoảnh khắc toả sáng trên sân khấu,
                                đánh dấu hành trình trưởng thành của các em.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {allAwards.map((award) => (
                        <div
                            key={award.id}
                            className="group rounded-3xl bg-white border border-emerald-100 p-8 hover:border-emerald-300 hover:shadow-xl transition"
                        >
                            <div className="flex gap-5">
                                <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100">
                                    <Medal size={22} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {award.title}
                                    </h3>

                                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                                        <p>🏅 Giải: <span className="font-medium">{award.prize}</span></p>
                                        <p>🎹 Học sinh: {award.student}</p>
                                        <p>📅 Năm: {award.year}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-8">
                <div className="flex gap-4 text-emerald-700">
                    <Star size={20} className="mt-0.5" />
                    <p className="text-sm leading-relaxed">
                        Mỗi giải thưởng không chỉ là kết quả của tài năng,
                        mà còn là minh chứng cho sự kiên trì, kỷ luật
                        và sự đồng hành bền bỉ từ Quý Phụ huynh cùng lớp đàn.
                    </p>
                </div>
            </div>
        </section>
    );
}
