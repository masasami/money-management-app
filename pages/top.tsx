import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import type { NextPage } from 'next'

import Layout from 'components/Layout'
import Debit from 'components/Debit'
import Credit from 'components/Credit'

const Top: NextPage = () => {
  const records = [
    {
      id: 1,
      debit: 5000,
      credit: null,
      dt_start: '2021-10-23',
      dt_end: '2021-10-23',
    },
    {
      id: 2,
      debit: null,
      credit: 3000,
      dt_start: '2021-10-24',
      dt_end: '2021-10-24',
    },
  ]
  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-2">
        <Calendar
          localizer={momentLocalizer(moment)}
          formats={{
            monthHeaderFormat: 'YYYY年MM月',
          }}
          events={records.map((record, i) => {
            return {
              ...record,
              dt_start: moment(record.dt_start).toDate(),
              dt_end: moment(record.dt_end).toDate(),
            }
          })}
          components={{
            event: (e) => {
              const record = e.event
              if (record.debit) return <Debit debit={record.debit} />
              if (record.credit) return <Credit credit={record.credit} />
              return null
            },
          }}
          startAccessor="dt_start"
          endAccessor="dt_end"
        />

        <div className="max-w-min max-h-min"></div>
      </div>
    </Layout>
  )
}

export default Top
