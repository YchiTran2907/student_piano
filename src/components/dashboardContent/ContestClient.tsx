"use client";

import React from "react";
import { MapPin, ExternalLink, FileText } from "lucide-react";

interface Competition {
    id: number;
    title: string;
    organizer: string;
    location: string;
    year: number;
    description: string;
    link: string;
    highlight?: boolean;
}

const competitions: Competition[] = [
    {
        id: 1,
        title: "Associated Board of the Royal Schools of Music (APAF)",
        organizer: "Royal Academy of Music, Royal College of Music, Royal Northern College of Music, Royal Conservatoire of Scotland",
        location: "Hà Nội, Sài gòn",
        year: 2025,
        description:
            "ABRSM (Associated Board of the Royal Schools of Music) là hệ thống thi và cấp chứng chỉ âm nhạc uy tín hàng đầu thế giới, được thành lập năm 1889 (Anh Quốc). Là chứng chỉ được công nhận tại hơn 90 quốc gia và có giá trị trong hồ sơ học thuật, du học, xét tuyển / cộng điểm tại một số hệ thống giáo dục...",
        link: "https://www.abrsm.org/en-vn",
        highlight: true,
    },
    {
        id: 2,
        title: "Crescendo International Music Festival & Competition",
        organizer: "APIAF Organization",
        location: "Hà Nội",
        year: 2025,
        description:
            "Cuộc thi Crescendo International Music Festival & Competition 2025 (CIMFC 2025) là một liên hoan và cuộc thi âm nhạc quốc tế chuyên nghiệp, thu hút thí sinh từ Việt Nam và nhiều nước khác như Áo, Pháp, Hàn Quốc, Malaysia, Brunei… với hơn 800 đăng ký tham dự vòng sơ loại. Đây là lần thứ 2 sự kiện được tổ chức tại Việt Nam sau mùa đầu tiên cùng Hitmaker Global Academy ở Singapore...",
        link: "https://cimfc.vn/en/",
        highlight: true,
    },
    {
        id: 3,
        title: "HONG KONG INTERNATIONAL MUSIC FESTIVAL",
        organizer: "HKIMF",
        location: "Hong Kong",
        year: 2025,
        description:
            "HKIMF là một trong những cuộc thi âm nhạc quy mô lớn nhất Hồng Kông, có hình thức thi vô cùng đa dạng, kết hợp giữa các thể loại âm nhạc như: nhạc cổ điển, nhạc Trung Quốc, nhạc POP, nhạc hiện đại và nhiều loại hình âm nhạc khác nhau thông qua hoạt động liên hoan âm nhạc quốc tế, tạo cơ hội để các thí sinh giao lưu học hỏi kết hợp khám phá tham quan du lịch tại nơi tổ chức cuộc thi, tham dự hòa nhạc, Master class và hội thảo âm nhạc...",
        link: "https://hkimfvietnam.com/",
    },
    {
        id: 4,
        title: "Asia Pacific Arts Festival (APAF)",
        organizer: "APAF",
        location: "Đài Bắc, Đài Loan (Taiwan)",
        year: 2025,
        description:
            "Asia Pacific Arts Festival (APAF) là một liên hoan nghệ thuật quốc tế được tổ chức hàng năm, thu hút các thí sinh trẻ ở nhiều lĩnh vực nghệ thuật như âm nhạc, múa, hát, nhạc cụ,… đến từ các quốc gia và vùng lãnh thổ trong khu vực Châu Á – Thái Bình Dương và xa hơn nữa. Mục tiêu của APAF là thúc đẩy giao lưu văn hóa, hòa bình và kết nối giữa các nền nghệ thuật khác nhau...",
        link: "https://apaf.asia/",
        highlight: true
    }
];

export default function ContestClient() {
    return (
        <section className="space-y-20">

            {/* ================= HERO ================= */}
            <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-[#f9fbff] via-[#f2f6ff] to-[#eef2ff] p-6 sm:p-10 md:p-6 shadow-sm">
                <div className="absolute -top-20 -right-20 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-indigo-200/30 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-purple-200/20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
                    <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-2xl sm:rounded-3xl bg-white shadow ring-1 ring-indigo-200">
                        <FileText size={28} className="text-indigo-600 sm:hidden" />
                        <FileText size={32} className="hidden sm:block md:hidden text-indigo-600" />
                        <FileText size={36} className="hidden md:block text-indigo-600" />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-indigo-600 font-semibold">
                            Piano Competitions
                        </p>
                        <h1 className="text-xl sm:text-2xl md:text-xxl font-bold text-gray-900">
                            Các cuộc thi âm nhạc
                        </h1>
                        <p className="max-w-xl text-sm sm:text-base text-gray-600 leading-relaxed">
                            Tổng hợp các cuộc thi piano uy tín trong nước và quốc tế,
                            nơi học sinh có cơ hội thử sức và ghi dấu hành trình học tập.
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= LIST ================= */}
            <div className="relative mt-16 space-y-12">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />

                {competitions.map((c) => (
                    <div key={c.id} className="relative pl-20">
                        {/* DOT */}
                        <div
                            className={`absolute left-3 top-2 h-6 w-6 rounded-full border-4 bg-white
                ${c.highlight ? "border-indigo-500" : "border-slate-300"}`}
                        />

                        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {c.title}
                                </h3>

                                <span className="text-sm font-medium text-slate-500">
                                    {c.year}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                {c.description}
                            </p>

                            <div className="mt-4 text-sm text-slate-600 space-y-1">
                                <p className="flex items-center gap-2">
                                    <MapPin size={14} /> {c.location}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Đơn vị tổ chức: {c.organizer}
                                </p>
                            </div>

                            <a
                                href={c.link} target="_blank" rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline"
                            >
                                Xem chi tiết
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>


            {/* ================= FOOTER NOTE ================= */}
            <div className="rounded-3xl bg-indigo-50 border border-indigo-200 p-8">
                <p className="text-sm leading-relaxed text-indigo-700">
                    Các cuộc thi được lựa chọn phù hợp với độ tuổi và năng lực của học sinh, nhằm tạo điều kiện cho các con được trải nghiệm, học hỏi và rèn luyện sự tự tin khi biểu diễn trên sân khấu. Đồng thời, đây cũng là bước đệm quan trọng giúp các con từng bước hướng tới những mục tiêu lớn hơn trong tương lai.
                </p>
            </div>
        </section>
    );
}
