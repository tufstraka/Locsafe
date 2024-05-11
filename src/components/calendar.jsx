import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from './sidebar';
import EventEditForm from './event'

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);


  const handleSelect = ({ start, end }) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  const handleRegisterEvent = (eventData) => {
    // Handle registration of event with eventData
    console.log('Registered event:', eventData);
  };


  return (
    <div className='flex'>
    <Sidebar/>
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelect}
          style={{ height: 500 }}
        />
         {isEditFormOpen && (
        <EventEditForm
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          onClose={handleCloseEditForm}
          onRegister={handleRegisterEvent}
        />
      )}
      </div>
    </div>
    </div>
  );
};

export default MyCalendar;
