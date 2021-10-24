import { useCallback, useMemo, useState } from 'react'
import Modal from 'components/Modal'
import { Account } from 'interfaces/account'

type Props = {
  accounts: Account[]
}

const BigCalendar = (props: Props) => {
  const [isShow, setIsShow] = useState(false)
  const showModal = useCallback((today: string) => {
    console.log(today)
    setIsShow(true)
  }, [])

  const hideModal = useCallback(() => {
    setIsShow(false)
  }, [])

  const weeks = ['日', '月', '火', '水', '木', '金', '土']
  const date = new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)

  // 前の月へ移動
  const movePrev = () => {
    console.log('前の月')
    const prevMonth = month - 1
    if (prevMonth < 1) {
      setYear((year) => year - 1)
      setMonth(12)
    } else {
      setMonth(prevMonth)
    }
  }
  // 次の月へ移動
  const moveNext = () => {
    console.log('次の月')
    const nextMonth = month + 1
    if (nextMonth > 12) {
      setYear((year) => year + 1)
      setMonth(1)
    } else {
      setMonth(nextMonth)
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
            ←
          </button>
          {/* 次の月へ */}
          <button className="ml-2" onClick={moveNext}>
            →
          </button>
        </h1>

        <div className="w-full flex-1 border flex flex-col">
          {/* カレンダーの曜日 */}
          <div className="flex h-8">
            {weeks.map((week, i) => (
              <div
                key={i}
                className="w-[calc(1/7*100%)] border flex items-center justify-center"
              >
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
                      <div
                        key={j}
                        className="text-gray-500 relative border w-[calc(1/7*100%)]"
                      >
                        {/* 日付 */}
                        <span className="text-xs md:text-2xl absolute top-0 left-0">
                          {day}
                        </span>
                      </div>
                    )
                  } else if (dayCount > endDayCount) {
                    const day = dayCount - endDayCount
                    dayCount++
                    return (
                      <div
                        key={j}
                        className="text-gray-500 relative border w-[calc(1/7*100%)]"
                      >
                        {/* 日付 */}
                        <span className="text-xs md:text-2xl absolute top-0 left-0">
                          {day}
                        </span>
                      </div>
                    )
                  } else {
                    const day = dayCount
                    dayCount++
                    return (
                      <div
                        key={j}
                        className="relative border w-[calc(1/7*100%)] flex flex-col"
                        onClick={() => {
                          const ymd = [
                            year,
                            `0${month}`.slice(-2),
                            `0${day}`.slice(-2),
                          ].join('-')
                          showModal(ymd)
                        }}
                      >
                        {/* 日付 */}
                        <span className="text-xs md:text-2xl absolute top-0 left-0">
                          {day}
                        </span>

                        <div className="w-full md:pr-2 text-right text-xs md:text-2xl text-blue-500 ellipsis mt-auto">
                          {(5000).toLocaleString()}
                        </div>
                        <div className="w-full md:pr-2 text-right text-xs md:text-2xl text-red-500 ellipsis">
                          {(5000 * -1).toLocaleString()}
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
  }, [year, month])

  return (
    <div className="w-full h-full">
      {renderCalendar}
      {isShow && <Modal onHide={() => hideModal()} />}
    </div>
  )
}

export default BigCalendar
