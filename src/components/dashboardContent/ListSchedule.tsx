import React from 'react';
import ListScheduleClient from './ListScheduleClient';
import { getGroupedStudentSchedules } from "../../../lib/data";

export default async function ListSchedule() {
    const delFlg = 0;
    const groupedStudents = await getGroupedStudentSchedules(delFlg);

    return (
        <ListScheduleClient groupedStudents={groupedStudents} />
    );
}