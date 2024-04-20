
import { getScheduleByDate, getScheduleByPartner, getUser } from '@/app/lib/data';

import EntreTable from '../../ui/entrepreneur-table';
import PartnerTable from '../../ui/partner-table';
import {dates} from '../../lib/utils';

export default async function Page({ params }: { params: { id: string } }) {
    const user = await getUser(params.id);
    
    const remoteData = (user.role === 'partner' ? await getScheduleByPartner(params.id) : await getScheduleByDate(dates[0])) as any
    
    return <>
    {
      user.role === 'partner' ? 
      <>
      <PartnerTable data={remoteData} user={user} />
      </>
      :
      <>
      <EntreTable data={remoteData.data} columns={remoteData.columns} user={user} />
      </>
    }
    </>
}