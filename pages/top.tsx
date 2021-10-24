import { RiCheckboxBlankFill } from 'react-icons/ri'
import type { NextPage } from 'next'

import Layout from 'components/Layout'
import BigCalendar from 'components/BigCalendar'
import DoughnutChart from 'components/DoughnutChart'

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
    {
      id: 3,
      debit: 3000,
      credit: null,
      dt_start: '2021-10-25',
      dt_end: '2021-10-25',
    },
    {
      id: 4,
      debit: null,
      credit: 3000,
      dt_start: '2021-10-25',
      dt_end: '2021-10-25',
    },
  ]

  const balance = 200000

  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-2">
        <BigCalendar records={records} />
        <div className="w-full pt-2 flex items-center flex-wrap mb-2">
          <div>
            <DoughnutChart />
          </div>

          <ul className="h-[150px] p-3 overflow-y-scroll flex-1 scrollbar-y">
            {[
              '食費',
              '娯楽費',
              '水道・光熱費',
              '特別費',
              '習い事費',
              '趣味',
              '長い名前長い名前長い名前',
            ].map((tag, i) => (
              <li key={i} className="mb-2 flex items-center">
                <RiCheckboxBlankFill />
                <span className="flex-1 ellipsis">{tag}</span>
              </li>
            ))}
          </ul>

          <div className="w-full">
            <div className="text-right border rounded border-gray-500 ml-auto text-5xl p-2 w-full scrollbar-x">
              {balance === null ? null : `￥${balance.toLocaleString()}`}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Top
