'use server';
import { sql } from "@vercel/postgres";

export async function updateScheduleStatus(duration: string, date: string, status: 'accepted' | 'declined', partnerId: string) {

    try {
        await sql`
            UPDATE schedule
            SET status = ${status}, entrepreneur_name = NULL
            WHERE duration = ${duration} AND date = ${date} AND partner_id = ${partnerId}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }
}

export async function updateScheduleEntry(duration: string, date: string, partnerName: string, name: string) {
    console.log(duration, date, partnerName, name)
    try {
        await sql`
            UPDATE schedule
            SET  entrepreneur_name = ${name}
            WHERE duration = ${duration} AND date = ${date} AND partner_name = ${partnerName}
        `;
        console.log('success');
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }
}