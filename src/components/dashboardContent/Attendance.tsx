import React from 'react';
import AttendanceClient from './AttendanceClient';
import { getAllStudents } from '../../../lib/data';

export default async function Personal() {
    const delFlg = 0;
    const dataAllStudents = await getAllStudents(delFlg);

    return (
        <AttendanceClient dataAllStudents={dataAllStudents}/>
    );
}