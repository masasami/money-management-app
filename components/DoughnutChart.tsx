import { Doughnut } from 'react-chartjs-2'
import { Account } from 'interfaces/account'
import { useEffect, useState } from 'react'

type Props = {
  accounts: Account[]
}

const DoughnutChart = (props: Props) => {
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([])
  const [countList, setCountList] = useState<number[]>([])

  useEffect(() => {
    // タグIDの重複を排除
    const map = new Map(props.accounts.map((account) => [account.id_tag, account]))
    const array = Array.from(map.values())
    setFilteredAccounts(array)

    // タグごとに件数をカウント
    const obj: { [id_tag: string]: number } = {}
    for (const account of props.accounts) {
      const key = String(account.id_tag)
      obj[key] = (obj[key] || 0) + 1
    }
    const count = Object.values(obj)
    setCountList(count)
  }, [props.accounts])

  return (
    <Doughnut
      data={{
        labels: filteredAccounts.map((account) => account.title),
        datasets: [
          {
            label: 'データ',
            data: countList,
            backgroundColor: filteredAccounts.map((account) => '#' + account.color_code),
          },
        ],
      }}
      width={150}
      height={150}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
      }}
    />
  )
}

export default DoughnutChart
