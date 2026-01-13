import React from 'react';
import ContestClient from './ContestClient';
import ContestRegisterClient from './ContestRegisterClient';
import { getAllContestRegisters, getAllContests } from '../../../lib/data';

export default async function Contest() {
    const contestData = await getAllContests();
    const contestRegisters = await getAllContestRegisters();

    return (
        <main className="space-y-12">
            <ContestClient contestData={contestData} />
            <ContestRegisterClient contestRegisters={contestRegisters} />
        </main>
    );
}