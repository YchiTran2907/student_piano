import React from 'react';
import PersonalClient from './PersonalClient';
import { getStudentDataByEmail, getScheduleDataByEmail } from '../../../lib/data';

interface PersonalProps {
    userEmail: string;
    roleUser: string
}

export default async function Personal({ userEmail, roleUser }: PersonalProps) {
    const scheduleData = await getScheduleDataByEmail(userEmail);
    const studentData = await getStudentDataByEmail(userEmail);
    return (
        <PersonalClient
            initialData={studentData}
            yearlySchedule={scheduleData}
            roleUser={roleUser}
        />
    );
}