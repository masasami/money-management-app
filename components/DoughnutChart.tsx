import { Doughnut } from 'react-chartjs-2'

const DoughnutChart = () => {
  return (
    <Doughnut
      data={{
        labels: ['red', 'blue', 'green', 'yellow'],
        datasets: [
          {
            label: 'データ',
            data: [10, 10, 10, 10],
          },
        ],
      }}
      width={200}
      height={200}
      options={{
        maintainAspectRatio: false,
      }}
    />
  )
}

export default DoughnutChart
