import { useEffect, useState } from 'react'
import { RiCheckboxBlankFill } from 'react-icons/ri'
import type { NextPage } from 'next'

import Layout from 'components/Layout'
import BigCalendar from 'components/BigCalendar'
import DoughnutChart from 'components/DoughnutChart'
import { Account } from 'interfaces/account'

const Top: NextPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([])

  const balance = 200000

  useEffect(() => {
    ;(async () => {
      const accounts = await (await fetch('/data/accounts.json')).json()
      setAccounts(accounts)
    })()
  }, [])

  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-2">
        {/* カレンダー */}
        <BigCalendar accounts={accounts} />
        <div className="w-full pt-2 flex items-center flex-wrap mb-2">
          {/* ドーナツチャート */}
          <div>
            <DoughnutChart />
          </div>

          {/* タグ一覧 */}
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

          {/* 収支 */}
          <div className="w-full flex items-center">
            <span className="text-base md:text-5xl">収支合計</span>
            <div className="text-right border rounded border-gray-500 ml-2 text-base md:text-5xl p-2 flex-1">
              ¥
              {accounts
                .reduce((prev, account) => {
                  const debit = account.debit ? account.debit : 0
                  const credit = account.credit ? account.credit : 0
                  return prev + debit - credit
                }, 0)
                .toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Top
