import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import {
  Schedule,
  User,
} from './definitions';
import {times} from './utils';


export async function getScheduleByPartner(id: string) {
  noStore()
  try {
    const schedules = await sql<Schedule>`SELECT * FROM schedule WHERE partner_id=${id}`;
    return schedules.rows;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getScheduleByDate(date: string) {
  noStore()
  try {
    const schedules = await sql<Schedule>`SELECT * FROM schedule WHERE date=${date}`;
    return schedules.rows;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export async function getUser(id: string) {
  noStore()
  try {
    const user = await sql`SELECT * FROM users WHERE id=${id}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
