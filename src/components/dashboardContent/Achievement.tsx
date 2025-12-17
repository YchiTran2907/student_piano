import AchievementClient from "./AchievementClient";
import { getStudentDataByEmail, getAllStudents, Award } from "../../../lib/data";

interface AchievementProps {
    userEmail: string;
}

export default async function Achievement({ userEmail }: AchievementProps) {
    const studentData = await getStudentDataByEmail(userEmail);

    const awards = [...studentData.awards].sort(
        (a, b) => b.year - a.year
    );

    const allStudents = await getAllStudents();
    const classAwards: Award[] = allStudents
        .flatMap((student) => student.awards)
        .sort((a, b) => b.year - a.year);

    const studentNameMap: Record<string, string> = {};
    allStudents.forEach((s) => {
        studentNameMap[s.email] = s.name;
    });

    return (
        <AchievementClient
            awards={awards}
            studentName={studentData.name}
            classAwards={classAwards}
            studentNameMap={studentNameMap}
        />
    );
}
