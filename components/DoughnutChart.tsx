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
      width={150}
      height={150}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      }}
    />
  )
}

export default DoughnutChart
