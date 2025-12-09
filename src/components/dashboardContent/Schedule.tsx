import React from 'react';
import ScheduleClient from './ScheduleClient';
import { getScheduleDataByEmail } from '../../../lib/data';

interface ScheduleProps {
    userEmail: string;
}

export default async function Schedule({ userEmail }: ScheduleProps) {
    const scheduleData = await getScheduleDataByEmail(userEmail);

    return (
        <ScheduleClient initialData={scheduleData} />
    );
}