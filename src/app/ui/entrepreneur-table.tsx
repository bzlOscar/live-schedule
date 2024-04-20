'use client';

import { Table, Tag, Button, Select } from 'antd';
import { dates } from "../lib/utils";
import { User } from '../lib/definitions';
import { updateScheduleEntry } from '../lib/action';
import { getScheduleByDate } from '../lib/data';
import { useState } from 'react';

export default  function Page({ data, columns, user }: { data: Array< Record<string, string>>, columns: Array< Record<string, string>>, user: User }) {
      const [currentDate, setDate] = useState(dates[0]);
      const [currentData, setData] = useState(data);

      const getData = async (date: string) => {
        const {data: remote} = await getScheduleByDate(date);
          setData(remote);
      }

      const onClickSchedule = async (key: string, record: Record<string, string>) => {
        await updateScheduleEntry(record.duration, currentDate, key, user.name);
        await getData(currentDate);
      }

      const handleChange = async(e: string) => {
        setDate(e);
        await getData(e);
      }
      const currentColumns = columns.map((column) => {
        if (column.key === 'duration') {
          return column;
        }
        return {
          ...column,
          render: (text: string, record: Record<string, string>) => <div>{
            record[`${column.key}_status`] === 'accepted' ? text ? <>{text}</> : <Button onClick={() =>onClickSchedule(column.key, record)}>预占</Button> : <Tag color="error">未开放</Tag>
            }</div>,
        }
      })
    return <>

    选择日期
    <Select
      defaultValue={currentDate}
      style={{ width: 240, marginLeft: 8 }}
      onChange={handleChange}
      options={dates.map((date) => ({value: date, label: date}))}
    />
    {currentDate}
     <Table columns={currentColumns} dataSource={currentData} />
     </>
}