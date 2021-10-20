import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import type { NextPage } from 'next'

import Layout from 'components/Layout'

const Top: NextPage = () => {
  return (
    <Layout>
      <div className="w-full h-full p-2">
        <Calendar
          localizer={momentLocalizer(moment)}
          formats={{
            monthHeaderFormat: 'YYYY年MM月',
          }}
        />
      </div>
    </Layout>
  )
}

export default Top
