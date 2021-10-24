import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import Debit from 'components/Debit'
import Credit from 'components/Credit'
import Modal from 'components/Modal'
import { useCallback, useState } from 'react'

type Props = {
  records: any[]
}

const BigCalendar = (props: Props) => {
  const [isShow, setIsShow] = useState(false)
  const showModal = useCallback((e) => {
    console.log(e)
    setIsShow(true)
  }, [])

  const hideModal = useCallback(() => {
    setIsShow(false)
  }, [])
  return (
    <>
      <Calendar
        localizer={momentLocalizer(moment)}
        selectable
        onSelectSlot={(e) => {
          showModal(e)
        }}
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
      {isShow && <Modal onHide={() => hideModal()} />}
    </>
  )
}

export default BigCalendar
