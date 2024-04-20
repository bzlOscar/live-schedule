// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const { v4: uuidv4 } = require('uuid');
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: '合伙人1',
    role: 'partner',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: '合伙人2',
    role: 'partner',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: '创业者1',
    role: 'entrepreneur',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: '创业者2',
    role: 'entrepreneur',
  },
];

const dates = ['2024-04-20', '2024-04-21', '2024-04-22', '2024-04-23', '2024-04-24', '2024-04-25', '2024-04-26'];

const times = ['09:00~09:15', '09:15~09:30', '09:30~09:45', '09:45~10:00', '10:00~10:15', '10:15~10:30', 
'10:30~10:45', '10:45~11:00', '11:00~11:15', '11:15~11:30', '11:30~11:45', '11:45~12:00', '12:00~12:15',
'12:15~12:30', '12:30~12:45', '12:45~13:00', '13:00~13:15', '13:15~13:30', '13:30~13:45', '13:45~14:00',
'14:00~14:15','14:15~14:30','14:30~14:45','14:45~15:00','15:00~15:15','15:15~15:30','15:30~15:45','15:45~16:00',
'16:00~16:15','16:15~16:30','16:30~16:45','16:45~17:00'];

const getSchedule = (partner_id, partner_name) => {
  const arr = []
  dates.forEach((date) => {
    times.forEach((time) => {
      arr.push({
        id: uuidv4(),
        partner_id: partner_id,
        partner_name: partner_name,
        entrepreneur_id: null,
        entrepreneur_name: null,
        date: date,
        duration: time,
        status:  'declined',
      })
    })
  })
  return arr;
}

const schedules = [
  ...getSchedule('410544b2-4001-4271-9855-fec4b6a6442a', '合伙人1'),
  ...getSchedule('3958dc9e-712f-4377-85e9-fec4b6a6442a', '合伙人2'),
];

module.exports = {
  users,
  schedules
};
