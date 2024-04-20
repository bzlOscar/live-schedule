'use server';
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

    const timeSchedule = times.map((time) => {
      const list = schedules.rows.filter((item) => item.duration === time);
      const obj: Record<string, string> = {
        duration: time,
      }
      list.forEach((item) => {
        obj[item.date] = item.status
      })
      return obj
    })

    return timeSchedule;

  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getScheduleByDate(date: string) {
  noStore()
  try {
    const schedules = await sql<Schedule>`SELECT * FROM schedule WHERE date=${date}`;

    const list = schedules.rows.map((row) => row.partner_name);
    const parentList = Array.from(new Set(list));
    const columns = [{
        title: '时间',
        dataIndex: 'duration',
        key: 'duration',
    },
    ...parentList.map((item) => ({
        title: item,
        dataIndex: item,
        key: item,
    }))
  ]

  const data = times.map((time) => {
    const list = schedules.rows.filter((item) => item.duration === time);
    const obj: Record<string, string> = {
      duration: time,
    }
    list.forEach((item) => {
      obj[item.partner_name] = item.entrepreneur_name
      obj[`${item.partner_name}_status`] = item.status
    })
    return obj
  })

    return {
      data,
      columns
    };
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
