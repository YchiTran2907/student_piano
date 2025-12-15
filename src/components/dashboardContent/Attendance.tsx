import React from 'react';
import AttendanceClient from './AttendanceClient';
import { getAllStudents } from '../../../lib/data';

// interface AttendanceProps {
//     userEmail: string;
// }

export default async function Personal() {
    const dataAllStudents = await getAllStudents();

    return (
        <AttendanceClient dataAllStudents={dataAllStudents}/>
    );
}