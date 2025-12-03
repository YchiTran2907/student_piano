"use client";

import { students, Student } from "@/data/student";
import { useEffect, useState } from "react";

interface InfoCardProps {
    label: string;
    value: string | number;
}

function InfoCard({ label, value }: InfoCardProps) {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-base font-semibold text-gray-900 mt-1">{value}</div>
        </div>
    );
}

export default function Personal() {
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) return;

        const found = students.find((s) => s.email === email);
        if (found) setStudent(found);
    }, []);

    if (!student) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex flex-col items-center mb-10 mt-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 text-3xl flex items-center justify-center text-gray-500">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h1 className="text-2xl font-semibold mt-3 text-center">{student.name}</h1>
                <p className="text-gray-500 text-center">{student.className}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <InfoCard label="Grade" value={student.grade} />
                <InfoCard label="Teacher" value={student.teacher} />
                <InfoCard label="Class" value={student.className} />
                <InfoCard label="Parent Name" value={student.parentName} />
                <InfoCard label="Contact" value={student.contact} />
                <InfoCard label="Age" value={student.age} />
            </div>
        </div>
    );
}
