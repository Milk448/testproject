'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getMyBookings, cancelBooking } from '@/app/api/customerApi';
import { MyBooking } from '@/types';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const BookingStatusChip = ({ status }: { status: MyBooking['status'] }) => {
  const statusStyles = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    CANCELED: 'bg-red-100 text-red-800',
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full font-poppins ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const fetchBookings = async () => {
        try {
          const data = await getMyBookings(token);
          setBookings(data);
        } catch (err) {
          setError('Failed to load your bookings.');
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleCancel = async (bookingId: string) => {
    if (!token || !window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await cancelBooking(bookingId, token);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELED' } : b))
      );
    } catch (err: any) {
      setShowModal(false);
    }
  };

  const openCancelModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBookingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-100">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-2 text-gray-600 font-poppins text-sm">
            Loading your bookings...
          </span>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-100">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md w-full">
          <p className="text-gray-600 font-poppins text-sm">
            Please{' '}
            <Link
              href="/login"
              className="text-amber-400 hover:text-amber-500 hover:underline font-poppins transition-all duration-300"
            >
              login
            </Link>{' '}
            to see your bookings.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-100">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center font-poppins text-sm max-w-md w-full">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Image
          width={32}
          height={32}
            src="/images/cover.jpg"
            alt="My Bookings"
            className="h-8 w-8 rounded-full object-cover mr-2"
            onError={() => console.error('Header image failed to load: /images/workshop.jpg')}
          />
          <h1 className="text-3xl font-bold text-gray-800 font-poppins sm:text-2xl">
            My Bookings
          </h1>
        </div>
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 font-poppins text-sm mb-4">
              You have no bookings yet.
            </p>
            <Link
              href="/workshops"
              className="inline-block px-6 py-2 text-white bg-indigo-600 rounded-lg font-poppins text-sm hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
            >
              Browse Workshops
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 bg-white rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 font-poppins sm:text-lg">
                    {booking.workshop.title}
                  </h2>
                  <p className="text-sm text-teal-600 font-poppins mt-1">
                    {new Date(booking.workshop.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    at {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                  </p>
                  <div className="mt-2">
                    <BookingStatusChip status={booking.status} />
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  {booking.status !== 'CANCELED' && (
                    <button
                      onClick={() => openCancelModal(booking.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg font-poppins hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancellation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md sm:w-11/12 transform transition-all duration-300 scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 font-poppins">
                Confirm Cancellation
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800 transition-all duration-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 font-poppins mb-6">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-lg font-poppins hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleCancel(selectedBookingId!);
                  closeModal();
                }}
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg font-poppins hover:bg-indigo-700 transition-all duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;