import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Bar } from 'react-chartjs-2'
import Layout from 'layouts/Layout'
import { apiService } from 'lib/api.service'
import { Account } from 'interfaces/account'
import moment from 'moment'

const Graph: NextPage = () => {
  const [data, setData] = useState<number[]>([])
  const [label, setLabel] = useState<string>('')
  const [backgroundColor, setBackgroundColor] = useState<string[]>([])
  const [borderColor, setBorderColor] = useState<string[]>([])

  const [year, setYear] = useState(new Date().getFullYear())

  const movePrev = useCallback(() => {
    console.log('前の年へ')
  }, [])
  const moveNext = useCallback(() => {
    console.log('次の年へ')
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        // 1年間のデータ取得
        const start = `${year}-01-01 00:00:00`
        const end = `${year}-12-31 23:59:59`
        const accounts = await apiService.get<Account[]>(`get_accounts_by_id_user?start=${start}&end=${end}`)

        const data = []
        const backgroundColor = []
        const borderColor = []
        for (let i = 0; i < 12; i++) {
          // 1ヶ月ごとにフィルタリング
          const start = moment(new Date(year, i, 1)).format('YYYY-MM-DD 00:00:00')
          const end = moment(new Date(year, i + 1, 0)).format('YYYY-MM-DD 23:59:59')
          const filteredAccounts = accounts.filter(
            (account) => start <= account.dt_account && account.dt_account <= end
          )
          const totalAmount = filteredAccounts.reduce((prev, account) => {
            const debit = account.debit ? account.debit : 0
            const credit = account.credit ? account.credit : 0
            return prev + debit - credit
          }, 0)
          data.push(totalAmount)
          if (totalAmount > 0) {
            backgroundColor.push('rgba(54, 162, 235, 0.2)')
            borderColor.push('rgb(54, 162, 235)')
          }
          if (totalAmount < 0) {
            backgroundColor.push('rgba(255, 99, 132, 0.2)')
            borderColor.push('rgb(255, 99, 132)')
          }
          if (totalAmount === 0) {
            backgroundColor.push('black')
            borderColor.push('black')
          }
        }
        setData(data)
        setBackgroundColor(backgroundColor)
        setBorderColor(borderColor)
        setLabel(String(year))
      } catch (e) {
        console.log(e)
      }
    })()
  }, [year])

  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-2">
        <h1 className="w-full flex items-center md:text-2xl">
          {label}年の収支
          <button className="ml-auto" onClick={movePrev}>
            ←前の年へ
          </button>
          <button className="ml-2" onClick={moveNext}>
            次の年へ→
          </button>
        </h1>

        <div className="flex-1">
          <Bar
            data={{
              labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              datasets: [
                {
                  data,
                  backgroundColor,
                  borderColor,
                  borderWidth: 1,
                },
              ],
            }}
            width={0}
            height={0}
            options={{
              // 凡例(label)の非表示
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Graph
