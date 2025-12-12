import React from 'react';
import PersonalClient from './PersonalClient';
import { getStudentDataByEmail, getScheduleDataByEmail, getAccountDataByEmail } from '../../../lib/data';

interface PersonalProps {
    userEmail: string;
}

export default async function Personal({ userEmail }: PersonalProps) {
    const scheduleData = await getScheduleDataByEmail(userEmail);
    const accountData = await getAccountDataByEmail(userEmail);
    const studentData = await getStudentDataByEmail(userEmail);
    return (
        <PersonalClient
            initialData={studentData}
            yearlySchedule={scheduleData}
            accountData={accountData}
        />
    );
}