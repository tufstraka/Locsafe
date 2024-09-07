import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [user, setUser] = useState({
      name: 'Peter',
      img: '/userImg.jpg'
    })


    const [toggleModal, setToggleModal] = useState(false)

    const [navIsOpen, setNavIsOpen] = useState(false)

    const [searching, setSearching] = useState(true)

    const [activeShipmentsMenu, setActiveShipmentsMenu] = useState('3')

    const [trackedVehicle, setTrackedVehicle] = useState([])

    // modal function
    const openModal = (value) => {
      ModalData(value)
      setToggleModal(true)
      setSearching(true)
    }

    const ModalData = (id) => {
      setTrackedVehicle(() => {
        console.log(id);
        return id;
      });
    };

    const [logData, setLogData] = useState([
      {
      id: '01',
      transporter: 'Johnson C',
      location: 'Lagos',
      currentLocation: 'Ikorodu',
      logStatus: 'In Transit',
      vehicleNumber: 'ET-272-KJA',
      vehicleName: 'Toyota Highlander 2004',
      destination: 'Ikeja',
      img: '/transporter-1.jpg'
      },
      {
      id: '02',
      transporter: 'Jeremy Lopez',
      location: 'Lagos',
      currentLocation: '',
      logStatus: 'Cancelled',
      vehicleNumber: 'LG-272-KJA',
      vehicleName: 'Lexus 350 2000',
      destination: 'Ikeja',
      img: '/transporter-2.jpg'
      },
      {
      id: '03',
      transporter: 'Indiana Jones',
      location: 'Abuja',
      currentLocation: '',
      logStatus: 'Completed',
      vehicleNumber: 'AJ-111-KVF',
      vehicleName: 'Toyota Highlander 2004',
      destination: 'Lokoja',
      img: '/transporter-3.jpg'
      },
      {
      id: '04',
      transporter: 'Pietro J',
      location: 'Port Harcourt',
      currentLocation: 'Yenegoa',
      logStatus: 'In Transit',
      vehicleNumber: 'PH-144-KSJ',
      vehicleName: 'Ford F150',
      destination: 'Abuja',
      img: '/transporter-4.jpg'
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

  return (
    <DataContext.Provider
      value={{
        openModal,
        navIsOpen,
        setNavIsOpen,
        isSearching:[
          searching,
          setSearching
        ],
        modal:[
          toggleModal,
          setToggleModal
        ],
        trackedVehicle,
        userData:[
          user,
          setUser
        ],
        logData,
        setLogData,
        daily:[
          dailyShipments,
          setDailyShipments
        ],
        shipmentsMenu:[
          activeShipmentsMenu, setActiveShipmentsMenu
        ],
        monthly:[
          monthlyShipments,
          setMonthlyShipments
        ],
        yearly:[
          yearlyShipments,
          setYearlyShipments
        ]
        }}
    >
      {props.children}
    </DataContext.Provider>
  );
};