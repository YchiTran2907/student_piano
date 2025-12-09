import React from 'react';
import PersonalClient from './PersonalClient';
import { getStudentDataByEmail } from '../../../lib/data';

interface PersonalProps {
    userEmail: string;
}

export default async function Personal({ userEmail }: PersonalProps) {
    const studentData = await getStudentDataByEmail(userEmail);

    return (
        <PersonalClient initialData={studentData} />
    );
}