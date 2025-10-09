import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './sidebar';
import EventEditForm from './event';
import { useNavigation } from '../contexts/navigationContext';
import { IoMenu, IoCalendarOutline, IoAddCircle, IoFilterOutline, IoTodayOutline } from 'react-icons/io5';
import { MdEvent, MdSchedule, MdLocationOn, MdPeople, MdLabel } from 'react-icons/md';
import { FaShippingFast, FaTruck, FaWarehouse, FaExclamationTriangle } from 'react-icons/fa';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const { showNav, toggleNav } = useNavigation();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample supply chain events
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: 'Shipment Arrival - Electronics',
        start: new Date(2025, 9, 10, 9, 0),
        end: new Date(2025, 9, 10, 11, 0),
        category: 'shipment',
        status: 'scheduled',
        location: 'Warehouse A',
        priority: 'high',
        color: '#4CAF50'
      },
      {
        id: 2,
        title: 'Maintenance - Fleet Vehicle',
        start: new Date(2025, 9, 12, 14, 0),
        end: new Date(2025, 9, 12, 16, 0),
        category: 'maintenance',
        status: 'pending',
        location: 'Service Center',
        priority: 'medium',
        color: '#FF9800'
      },
      {
        id: 3,
        title: 'Delivery Deadline - Client XYZ',
        start: new Date(2025, 9, 15, 10, 0),
        end: new Date(2025, 9, 15, 12, 0),
        category: 'delivery',
        status: 'urgent',
        location: 'Client Location',
        priority: 'high',
        color: '#f44336'
      },
      {
        id: 4,
        title: 'Inventory Check',
        start: new Date(2025, 9, 18, 8, 0),
        end: new Date(2025, 9, 18, 17, 0),
        category: 'inventory',
        status: 'scheduled',
        location: 'Main Warehouse',
        priority: 'low',
        color: '#2196F3'
      },
      {
        id: 5,
        title: 'Supply Chain Meeting',
        start: new Date(2025, 9, 20, 15, 0),
        end: new Date(2025, 9, 20, 16, 30),
        category: 'meeting',
        status: 'confirmed',
        location: 'Conference Room',
        priority: 'medium',
        color: '#9C27B0'
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const handleSelect = ({ start, end }) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  const handleRegisterEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: events.length + 1,
      color: getCategoryColor(eventData.category)
    };
    setEvents([...events, newEvent]);
    setIsEditFormOpen(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const getCategoryColor = (category) => {
    const colors = {
      shipment: '#4CAF50',
      delivery: '#f44336',
      maintenance: '#FF9800',
      inventory: '#2196F3',
      meeting: '#9C27B0',
      other: '#607D8B'
    };
    return colors[category] || colors.other;
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '8px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '12px',
        fontWeight: '500'
      }
    };
  };

  const categories = [
    { id: 'all', label: 'All Events', icon: MdEvent, color: '#6366f1' },
    { id: 'shipment', label: 'Shipments', icon: FaShippingFast, color: '#4CAF50' },
    { id: 'delivery', label: 'Deliveries', icon: FaTruck, color: '#f44336' },
    { id: 'maintenance', label: 'Maintenance', icon: FaExclamationTriangle, color: '#FF9800' },
    { id: 'inventory', label: 'Inventory', icon: FaWarehouse, color: '#2196F3' },
    { id: 'meeting', label: 'Meetings', icon: MdPeople, color: '#9C27B0' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const upcomingEvents = events
    .filter(event => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5);

  return (
    <>
      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:relative z-40 h-full"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {showNav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleNav}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <div className="flex flex-col flex-grow">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-gray-900 shadow-elevation-2 sticky top-0 z-20"
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <motion.button
              onClick={toggleNav}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200 flex-shrink-0"
            >
              <IoMenu className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300" />
            </motion.button>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 truncate">
                <IoCalendarOutline className="text-primary-500 flex-shrink-0" />
                <span className="hidden sm:inline">Supply Chain Calendar</span>
                <span className="sm:hidden">Calendar</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                <span className="hidden md:inline">Manage deliveries, shipments, and logistics events</span>
                <span className="md:hidden">Manage logistics events</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('today')}
              className="px-2 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              <IoTodayOutline />
              <span className="hidden sm:inline">Today</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditFormOpen(true)}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg flex items-center gap-1 sm:gap-2 hover:from-primary-600 hover:to-primary-700 transition-all shadow-elevation-1 text-sm"
            >
              <IoAddCircle className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Add Event</span>
              <span className="sm:hidden">Add</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Mobile Category Pills */}
        <div className="lg:hidden px-4 sm:px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all flex-shrink-0 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="text-base" style={{ color: selectedCategory === category.id ? 'white' : category.color }} />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.id === 'all'
                      ? events.length
                      : events.filter(e => e.category === category.id).length}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar with Categories and Upcoming Events */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:block w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
          >
            {/* Categories Filter */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <IoFilterOutline className="text-primary-500" />
                Filter by Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="text-xl" style={{ color: category.color }} />
                      <span className="text-sm font-medium">{category.label}</span>
                      <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        {category.id === 'all'
                          ? events.length
                          : events.filter(e => e.category === category.id).length}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <MdSchedule className="text-primary-500" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-md transition-all"
                    onClick={() => handleEventClick(event)}
                  >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <MdSchedule className="text-gray-400" />
                      <span>{moment(event.start).format('MMM DD, h:mm A')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                      <MdLocationOn className="text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.priority === 'high'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          : event.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {event.priority} priority
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                        {event.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Calendar Container */}
          <div className="flex-1 p-3 sm:p-6 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-3 p-3 sm:p-6 h-full"
            >
              <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelect}
                onSelectEvent={handleEventClick}
                eventPropGetter={eventStyleGetter}
                view={view}
                onView={setView}
                style={{ height: 'calc(100% - 20px)' }}
                className="supply-chain-calendar"
                views={['month', 'week', 'day', 'agenda']}
                popup
                toolbar
                formats={{
                  eventTimeRangeFormat: () => null,
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Event Edit Form Modal */}
        <AnimatePresence>
          {isEditFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              onClick={handleCloseEditForm}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-4 max-w-md w-full mx-4"
              >
                <EventEditForm
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  onClose={handleCloseEditForm}
                  onRegister={handleRegisterEvent}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Details Modal */}
        <AnimatePresence>
          {showEventDetails && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              onClick={() => setShowEventDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-4 max-w-md w-full mx-4 p-4 sm:p-6"
              >
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 truncate">
                  {selectedEvent.title}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MdSchedule className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Schedule</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {moment(selectedEvent.start).format('MMMM DD, YYYY')}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {moment(selectedEvent.start).format('h:mm A')} - {moment(selectedEvent.end).format('h:mm A')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MdLocationOn className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedEvent.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MdLabel className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Details</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedEvent.priority === 'high'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            : selectedEvent.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {selectedEvent.priority} priority
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                          {selectedEvent.category}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                          {selectedEvent.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
                  <button
                    onClick={() => setShowEventDetails(false)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all text-sm"
                  >
                    Edit Event
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </>
  );
};

export default MyCalendar;
