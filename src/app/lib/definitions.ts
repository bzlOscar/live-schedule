
export type User = {
  id: string;
  name: string;
  role: 'partner' | 'entrepreneur';
};

export type Schedule = {
  id: string;
  partner_id: string;
  partner_name: string;
  entrepreneur_id: string;
  entrepreneur_name: string;
  date: string;
  time: string;
  status: 'accepted' | 'declined';
};
