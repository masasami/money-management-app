import { Doughnut } from 'react-chartjs-2'
import { Account } from 'interfaces/account'
import { useEffect, useState } from 'react'

type Props = {
  accounts: Account[]
}

const DoughnutChart = (props: Props) => {
  const [titles, setTitles] = useState<string[]>([])
  const [colorCodes, setColorCodes] = useState<string[]>([])
  const [countList, setCountList] = useState<number[]>([])

  useEffect(() => {
    // タグのタイトル、カラーコードの重複を排除
    const titleObject: { [id: string]: string } = {}
    const colorCodeObject: { [id: string]: string } = {}
    const countObject: { [id: string]: number } = {}
    for (const account of props.accounts) {
      const id = account.id_tag
      const key = String(id)
      titleObject[key] = id ? account.title : 'タグ未設定'
      colorCodeObject[key] = id ? account.color_code : '00000050'
      countObject[key] = (countObject[key] || 0) + 1
    }
    // 重複を排除したものを配列化
    const titles = Object.values(titleObject)
    const colorCodes = Object.values(colorCodeObject)
    const countList = Object.values(countObject)
    setTitles(titles)
    setColorCodes(colorCodes)
    setCountList(countList)
  }, [props.accounts])

  return (
    <Doughnut
      data={{
        labels: titles,
        datasets: [
          {
            label: 'データ',
            data: countList,
            backgroundColor: colorCodes.map((colorCode) => '#' + colorCode),
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
