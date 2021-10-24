import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import Debit from 'components/Debit'
import Credit from 'components/Credit'

type Props = {
  records: any[]
}

const BigCalendar = (props: Props) => {
  return (
    <Calendar
      localizer={momentLocalizer(moment)}
      formats={{
        monthHeaderFormat: 'YYYY年MM月',
      }}
      events={props.records.map((record, i) => {
        return {
          ...record,
          dt_start: moment(record.dt_start).toDate(),
          dt_end: moment(record.dt_end).toDate(),
        }
      })}
      components={{
        event: (e) => {
          const record = e.event
          return (
            <div>
              {record.debit && <Debit debit={record.debit} />}
              {record.credit && <Credit credit={record.credit} />}
            </div>
          )
        },
      }}
      startAccessor="dt_start"
      endAccessor="dt_end"
    />
  )
}

export default BigCalendar
