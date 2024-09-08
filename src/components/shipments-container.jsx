import { useState } from 'react'
import LineChart from "./line-chart.jsx";
import ShipmentsMenuList from './shipments-menu-list';

const ShipmentsContainer = () => {
    const [dailyShipments, setDailyShipments] = useState([
      {
        id: 1,
        time: '5:00am',
        shipments: 5,
        vehicles: 20,
      },
      {
        id: 2,
        time: '7:00am',
        shipments: 10,
        vehicles: 30,
      },
      {
        id: 3,
        time: '9:00am',
        shipments: 8,
        vehicles: 20,
      },
      {
        id: 4,
        time: '11:00pm',
        shipments: 8,
        vehicles: 25,
      },
      {
        id: 5,
        time: '1:00pm',
        shipments: 10,
        vehicles: 15,
      },
      {
        id: 6,
        time: '3:00pm',
        shipments: 5,
        vehicles: 15,
      },
      {
        id: 7,
        time: '5:00pm',
        shipments: 5,
        vehicles: 10,
      },
      {
        id: 8,
        time: '7:00pm',
        shipments: 2,
        vehicles: 5,
      },
    ]);
    const [monthlyShipments, setMonthlyShipments] = useState([
      {
        id: 1,
        date: 'Oct 22',
        shipments: 10000,
        vehicles: 5000,
      },
      {
        id: 2,
        date: 'Oct 23',
        shipments: 15000,
        vehicles: 10000,
      },
      {
        id: 3,
        date: 'Oct 24',
        shipments: 30000,
        vehicles: 10000,
      },
      {
        id: 4,
        date: 'Oct 25',
        shipments: 60000,
        vehicles: 15000,
      },
      {
        id: 5,
        date: 'Oct 26',
        shipments: 50000,
        vehicles: 10000,
      },
      {
        id: 6,
        date: 'Oct 27',
        shipments: 20000,
        vehicles: 10000,
      },
      {
        id: 7,
        date: 'Oct 28',
        shipments: 30000,
        vehicles: 5000,
      },
      {
        id: 8,
        date: 'Oct 29',
        shipments: 50000,
        vehicles: 40000,
      },
    ]);
    const [yearlyShipments, setYearlyShipments] = useState([
      {
        id: 1,
        month: 'Jan',
        shipments: 10000,
        vehicles: 5000,
      },
      {
        id: 2,
        month: 'Feb',
        shipments: 15000,
        vehicles: 10000,
      },
      {
        id: 3,
        month: 'Mar',
        shipments: 15000,
        vehicles: 10000,
      },
      {
        id: 4,
        month: 'Apr',
        shipments: 20000,
        vehicles: 15000,
      },
      {
        id: 5,
        month: 'May',
        shipments: 40000,
        vehicles: 10000,
      },
      {
        id: 6,
        month: 'Jun',
        shipments: 30000,
        vehicles: 15000,
      },
      {
        id: 7,
        month: 'Jul',
        shipments: 40000,
        vehicles: 2000,
      },
      {
        id: 8,
        month: 'Aug',
        shipments: 40000,
        vehicles: 30000,
      },
      {
        id: 9,
        month: 'Sep',
        shipments: 40000,
        vehicles: 30000,
      },
      {
        id: 10,
        month: 'Oct',
        shipments: 40000,
        vehicles: 35000,
      },
      {
        id: 11,
        month: 'Nov',
        shipments: 50000,
        vehicles: 40000,
      },
      {
        id: 12,
        month: 'Dec',
        shipments: 40000,
        vehicles: 30000,
      },
    ]);
    const [activeShipmentsMenu, setActiveShipmentsMenu] = useState('3')

    // console.log(dailyShipments)
    const [dailyData, setDailyData] = useState({
        labels: dailyShipments.map((data) => data.time),
        datasets: [
          {
            label: "Shipments",
            data: dailyShipments.map((data) => data.shipments),
            borderColor: "#14b8a6",
            borderWidth: 2,
          },

          {
            label: "Vehicles",
            data: dailyShipments.map((data) => data.vehicles),
            borderColor: "#8b5cf6",
            borderWidth: 2,
          },
        ],
      });

    const [monthlyData, setMonthlyData] = useState({
        labels: monthlyShipments.map((data) => data.date),
        datasets: [
          {
            label: "Shipments",
            data: monthlyShipments.map((data) => data.shipments),
            borderColor: "#14b8a6",
            borderWidth: 2,
          },

          {
            label: "Vehicles",
            data: monthlyShipments.map((data) => data.vehicles),
            borderColor: "#8b5cf6",
            borderWidth: 2,
          },
        ],
      });

      const [yearlyData, setYearlyData] = useState({
        labels: yearlyShipments.map((data) => data.month),
        datasets: [
          {
            label: "Shipments",
            data: yearlyShipments.map((data) => data.shipments),
            borderColor: "#14b8a6",
            borderWidth: 2,
          },

          {
            label: "Vehicles",
            data: yearlyShipments.map((data) => data.vehicles),
            borderColor: "#8b5cf6",
            borderWidth: 2,
          },
        ],
      });

  return (
    <section>
        <div className="flex justify-between flex-wrap items-center mt-12">
            <div>
                <h2 className="font-bold text-slate-800 dark:text-white"> Shipments </h2>
                <p className="my-1 text-slate-600 dark:text-white text-sm">
                    Shipping is going pretty well today. Here&#39;s what we have
                </p>
            </div>
            <div className="mt-3 bg-white dark:bg-night-blue px-6 py-2 rounded-full">
                <ul className="text-xs flex justify-between">
                    <ShipmentsMenuList
                    index='1'
                    title='1D'
                    activeTab={activeShipmentsMenu}
                    setActiveTab={setActiveShipmentsMenu}/>

                    <ShipmentsMenuList
                    index='2'
                    title='5D'
                    activeTab={activeShipmentsMenu}
                    setActiveTab={setActiveShipmentsMenu}/>

                    <ShipmentsMenuList
                    index='3'
                    title='1M'
                    activeTab={activeShipmentsMenu}
                    setActiveTab={setActiveShipmentsMenu}/>

                    <ShipmentsMenuList
                    index='4'
                    title='1Y'
                    activeTab={activeShipmentsMenu}
                    setActiveTab={setActiveShipmentsMenu}/>

                    <ShipmentsMenuList
                    index='5'
                    title='Max'
                    activeTab={activeShipmentsMenu}
                    setActiveTab={setActiveShipmentsMenu}/>
                </ul>
            </div>
        </div>

        <div className='my-4 bg-white dark:bg-night-blue p-5'>
            <div className='flex justify-between flex-wrap'>
                <div className='mt-2 w-full lg:w-2/6 flex'>
                    <div className='mr-20'>
                        <p className="uppercase font-medium text-xs text-slate-600 dark:text-slate-400"> Shipments </p>
                        <p className='text-2xl font-bold text-slate-800 dark:text-white'> 60,000 </p>
                    </div>
                    <div>
                        <p className="uppercase font-medium text-xs text-slate-600 dark:text-slate-400"> Active vehicles </p>
                        <p className='text-2xl font-bold text-slate-800 dark:text-white'> 237,889 </p>
                    </div>
                </div>

                <div className='mt-2 w-full lg:w-2/6 flex'>
                    <div className='flex items-center mr-14'>
                        <div className="w-5 h-1.5 mr-3 bg-teal-500"></div>
                        <p className="font-medium text-xs text-slate-600 dark:text-white"> Shipments </p>
                    </div>
                    <div className='flex items-center mr-5'>
                        <div className="w-5 h-1.5 mr-3 bg-violet-500"></div>
                        <p className="font-medium text-xs text-slate-600 dark:text-white"> Vehicles </p>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
              {activeShipmentsMenu === '1' ? 
                <LineChart chartData={dailyData} /> :
              activeShipmentsMenu === '2' ? 
              <LineChart chartData={dailyData} /> : 
              activeShipmentsMenu === '4' ? 
              <LineChart chartData={yearlyData} /> : 
              <LineChart chartData={monthlyData} />
              }
                                
            </div>
        </div>
    </section>
  )
}

export default ShipmentsContainer