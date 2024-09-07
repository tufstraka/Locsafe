import { Line } from "react-chartjs-2";
//import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({chartData}) => {
  return (
    <Line data={chartData} options={{
      plugins: {
          legend: {
              display: false
          }}
      }
  } />
  )
}

export default LineChart