import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import moment from 'moment'

import Layout from 'layouts/Layout'
import BigCalendar from 'components/BigCalendar'
import DoughnutChart from 'components/DoughnutChart'
import TopTagList from 'components/TopTagList'
import { Account } from 'interfaces/account'
import { apiService } from 'lib/api.service'

// Recoil
import { useRecoilState, useRecoilValue } from 'recoil'
import { accountsState, userState } from 'lib/atoms'

const Top: NextPage = () => {
  const user = useRecoilValue(userState)
  if (!user) return null

  const [globalAccounts, setGlobalAccounts] = useRecoilState(accountsState)
  const date = new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    ;(async () => {
      // カレンダーの月に応じた勘定一覧を取得
      const start = moment(new Date(year, month - 1, 1)).format('YYYY-MM-DD 00:00:00')
      const end = moment(new Date(year, month, 0)).format('YYYY-MM-DD 23:59:59')

      const accounts = await apiService.get<Account[]>(`get_accounts_by_id_user?start=${start}&end=${end}`)
      setGlobalAccounts(accounts)
    })()
  }, [month])

  // 勘定一覧が更新されたら収支を計算
  useEffect(() => {
    setBalance(
      globalAccounts.reduce((prev, account) => {
        const debit = account.debit ? account.debit : 0
        const credit = account.credit ? account.credit : 0
        return prev + debit - credit
      }, 0)
    )
  }, [globalAccounts])

  const movePrev = useCallback(async (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    setYear(year)
    setMonth(month)
  }, [])
  const moveNext = useCallback(async (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    setYear(year)
    setMonth(month)
  }, [])

  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-2">
        {/* カレンダー */}
        <BigCalendar accounts={globalAccounts} movePrev={movePrev} moveNext={moveNext} />
        <div className="w-full pt-2 flex items-center flex-wrap mb-2">
          {/* ドーナツチャート */}
          <div>
            <DoughnutChart accounts={globalAccounts} />
          </div>

          {/* タグ一覧 */}
          <TopTagList accounts={globalAccounts} />

          {/* 収支 */}
          <div className="w-full flex items-center">
            <span className="text-base md:text-5xl">収支合計</span>
            <div
              className={`text-right border rounded border-gray-500 ml-2 text-base md:text-5xl p-2 flex-1 
              ${balance > 0 && 'text-blue-500'} 
              ${balance < 0 && 'text-red-500'}
              `}
            >
              ¥{balance.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Top
