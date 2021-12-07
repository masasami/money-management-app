import { useCallback, useMemo, useState } from 'react'
import ModalDebitCredit from 'components/ModalDebitCredit'
import { Account } from 'interfaces/account'
import moment from 'moment'

type Props = {
  accounts: Account[]
  movePrev: (date: Date) => void
  moveNext: (date: Date) => void
}

const BigCalendar = (props: Props) => {
  const [filteredAccounts, setFilteredAccounts] = useState<Account[] | null>(null)
  const [datetimeAccount, setDatetimeAccount] = useState('')
  const showModal = useCallback((datetimeAccount: string, filteredAccounts: Account[]) => {
    setDatetimeAccount(datetimeAccount)
    setFilteredAccounts(filteredAccounts)
  }, [])

  const hideModal = useCallback(() => {
    setDatetimeAccount('')
    setFilteredAccounts(null)
  }, [])

  const weeks = ['日', '月', '火', '水', '木', '金', '土']
  const date = new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)

  // 前の月へ移動
  const movePrev = () => {
    if (month - 1 < 1) {
      // 年を1つ戻し、12月にする
      const prevYear = year - 1
      const prevMonth = 12
      setYear(prevYear)
      setMonth(prevMonth)
      props.movePrev(new Date(prevYear, prevMonth - 1, 1))
    } else {
      // 年はそのままで月を1つ戻す
      const prevMonth = month - 1
      setMonth(prevMonth)
      props.movePrev(new Date(year, prevMonth - 1, 1))
    }
  }
  // 次の月へ移動
  const moveNext = () => {
    if (month + 1 > 12) {
      // 年を1つ進め、1月にする
      const nextYear = year + 1
      const nextMonth = 1
      setYear(nextYear)
      setMonth(nextMonth)
      props.moveNext(new Date(nextYear, nextMonth - 1, 1))
    } else {
      // 年はそのままで月を1つ進める
      const nextMonth = month + 1
      setMonth(nextMonth)
      props.moveNext(new Date(year, nextMonth - 1, 1))
    }
  }

  const renderCalendar = useMemo(() => {
    const startDate = new Date(year, month - 1, 1) // 月の最初の日
    const endDate = new Date(year, month, 0) // 月の最後の日
    const endDayCount = endDate.getDate() // 月の末日
    const lastMonthEndDate = new Date(year, month - 2, 0) // 前月の最後の日
    const lastMonthEndDayCount = lastMonthEndDate.getDate() // 前月の末日
    const startDay = startDate.getDay() // 月の最初の日の曜日

    let dayCount = 1 // 日にちのカウント

    return (
      <div className="w-full h-full flex flex-col">
        <h1 className="w-full flex items-center md:text-2xl">
          {year}/{month}
          {/* 前の月へ */}
          <button className="ml-auto" onClick={movePrev}>
            ←前の月へ
          </button>
          {/* 次の月へ */}
          <button className="ml-2" onClick={moveNext}>
            次の月へ→
          </button>
        </h1>

        <div className="w-full flex-1 border flex flex-col">
          {/* カレンダーの曜日 */}
          <div className="flex h-8">
            {weeks.map((week, i) => (
              <div key={i} className="w-[calc(1/7*100%)] border flex items-center justify-center">
                {week}
              </div>
            ))}
          </div>

          {/* カレンダーの日付 */}
          <div className="flex-1">
            {Array.from(Array(6).keys()).map((week, i) => (
              // カレンダーの行
              <div key={i} className="flex h-[calc(1/6*100%)]">
                {Array.from(Array(7).keys()).map((dayNum, j) => {
                  // カレンダーの列
                  if (week == 0 && dayNum < startDay) {
                    const day = lastMonthEndDayCount - startDay + dayNum + 1
                    return (
                      <div key={j} className="text-gray-500 relative border w-[calc(1/7*100%)]">
                        {/* 日付 */}
                        <span className="text-xs md:text-2xl absolute top-0 left-0">{day}</span>
                      </div>
                    )
                  } else if (dayCount > endDayCount) {
                    const day = dayCount - endDayCount
                    dayCount++
                    return (
                      <div key={j} className="text-gray-500 relative border w-[calc(1/7*100%)]">
                        {/* 日付 */}
                        <span className="text-xs md:text-2xl absolute top-0 left-0">{day}</span>
                      </div>
                    )
                  } else {
                    const day = dayCount
                    dayCount++
                    // カレンダーの日付のものだけ抽出
                    const filteredAccounts = props.accounts.filter((account) => {
                      const yyyymmdd = moment(new Date(`${year}-${month}-${day}`)).format('YYYY-MM-DD')
                      const date = new Date(account.dt_account).getTime()
                      const start = new Date(`${yyyymmdd} 00:00:00`).getTime()
                      const end = new Date(`${yyyymmdd} 23:59:59`).getTime()
                      return start <= date && date <= end
                    })
                    const totalDebit = filteredAccounts.reduce((prev, account) => {
                      return prev + (account.debit ? account.debit : 0)
                    }, 0)
                    const totalCredit = filteredAccounts.reduce((prev, account) => {
                      return prev + (account.credit ? account.credit : 0)
                    }, 0)

                    return (
                      <div
                        key={j}
                        className="relative border w-[calc(1/7*100%)] flex flex-col"
                        onClick={() => {
                          const datetimeAccount = moment(new Date(`${year}-${month}-${day}`)).format('YYYY-MM-DD')
                          showModal(datetimeAccount, filteredAccounts)
                        }}
                      >
                        {/* 日付 */}
                        <span className="text-xs md:text-2xl absolute top-0 left-0">{day}</span>

                        <div className="w-full md:pr-2 text-right text-xs md:text-2xl text-blue-500 ellipsis mt-auto">
                          {totalDebit ? totalDebit.toLocaleString() : <span>&nbsp;</span>}
                        </div>
                        <div className="w-full md:pr-2 text-right text-xs md:text-2xl text-red-500 ellipsis">
                          {totalCredit ? (totalCredit * -1).toLocaleString() : <span>&nbsp;</span>}
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }, [props.accounts])

  return (
    <div className="w-full h-full">
      {renderCalendar}
      {filteredAccounts && (
        <ModalDebitCredit accounts={filteredAccounts} datetimeAccount={datetimeAccount} onHide={() => hideModal()} />
      )}
    </div>
  )
}

export default BigCalendar
