import React from 'react';
import ProgressClient from './ProgressClient';
import { getProgressDataByEmail } from '../../../lib/data';

interface ProgressProps {
    userEmail: string;
}

export default async function Progress({ userEmail }: ProgressProps) {
    const progressData = await getProgressDataByEmail(userEmail);

    return (
        <ProgressClient initialData={progressData} />
    );
}