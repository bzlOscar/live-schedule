'use client';

import { Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { dates } from '../lib/utils';
import { updateScheduleStatus } from '../lib/action';
import { User } from '../lib/definitions';
import { getScheduleByPartner } from '../lib/data';
import { useState } from 'react';

export default  function Page({ data, user }: { data: Array< Record<string, string>>, user: User }) {

  const [currentData, setData] = useState(data);
  const onClick = async (date: string, record: Record<string, string>) => {
    const status = record[date] === 'declined' ? 'accepted' : 'declined';
    await updateScheduleStatus(record.duration, date, status, user.id);
    const remote =  await getScheduleByPartner(user.id);
    setData(remote);
  }
      const columns: TableProps['columns'] = [
        {
          title: '时间',
          dataIndex: 'duration',
          key: 'duration',
        },
        ...dates.map((date) => ({
          title: date,
          dataIndex: date,
          key: date,
          render: (text: string, record: Record<string, string>) => <Button onClick={() => onClick(date, record)} >{text === 'declined' ? '忙' : '空闲'}</Button>,
        }))
      ];
      
    return <>
      <Table columns={columns} dataSource={currentData} />
      </>
}