'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../api/customerApi';
import { useRouter } from 'next/navigation';
import { Workshop } from '@/types';
import Image from 'next/image';

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>(workshop.timeSlots[0]?.id || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const handleBooking = async () => {
    if (!token) {
      setError('Please log in to book a workshop.');
      return;
    }
    if (!selectedSlotId) {
      setError('Please select a time slot.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const bookingData = { workshopId: workshop.id, timeSlotId: selectedSlotId };
      const response = await createBooking(bookingData, token);
      router.push(`/booking-confirmation/${response.bookingId}`);
    } catch (err: any) {
      console.error('Error creating booking:', err);
      const errorMessage = err.response?.data?.message || 'Booking failed. Please try again later.';
      setError(errorMessage);
      //set timeout to clear error after 5 seconds
        setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <Image
          width={48}
          height={48}
          src="/images/cover.jpg"
          alt={workshop.title}
          className="h-12 w-12 rounded-full object-cover mr-3"
          onError={() => console.error(`Image failed to load for workshop: ${workshop.title}`)}
        />
        <div>
          <h3 className="text-2xl font-bold text-gray-800 font-poppins sm:text-lg">
            {workshop.title}
          </h3>
          <p className="text-teal-600 text-sm font-poppins">
            {new Date(workshop.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
      <p className="text-gray-600 mb-4 font-poppins text-sm">{workshop.description}</p>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
          Select a Time Slot <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedSlotId}
          onChange={(e) => setSelectedSlotId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-poppins text-sm bg-white transition-all duration-300"
        >
          {workshop.timeSlots.length === 0 ? (
            <option value="" disabled>
              No time slots available
            </option>
          ) : (
            workshop.timeSlots.map((slot) => (
              <option
                key={slot.id}
                value={slot.id}
                className={`py-2 ${selectedSlotId === slot.id ? 'bg-teal-50' : ''}`}
              >
                {slot.startTime} - {slot.endTime}{' '}
                <span className="text-amber-700 bg-amber-100 px-2 py-1 rounded-full text-xs">
                  {slot.availableSpots} spots left
                </span>
              </option>
            ))
          )}
        </select>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm font-poppins mb-4 transition-all duration-300">
          {error}
        </div>
      )}
      <button
        onClick={handleBooking}
        disabled={loading}
        className={`w-full py-2 text-white bg-indigo-600 rounded-lg font-poppins text-sm transition-all duration-300 hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          loading ? 'bg-indigo-300 cursor-not-allowed animate-pulse' : ''
        }`}
      >
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
  );
};

export default WorkshopCard;