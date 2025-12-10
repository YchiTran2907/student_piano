import React from 'react';
import ScheduleClient from './ScheduleClient';
import { getScheduleDataByEmail, getStudentDataByEmail } from '../../../lib/data';

interface ScheduleProps {
    userEmail: string;
}

export default async function Schedule({ userEmail }: ScheduleProps) {
    const scheduleData = await getScheduleDataByEmail(userEmail);
    const student = await getStudentDataByEmail(userEmail);

    return (
        <ScheduleClient
            initialData={scheduleData}
            scheduleItems={student.scheduleItems}
        />
    );
}