'use client';
import Link from 'next/link';

interface ConfirmationPageProps {
  params: {
    id: string;
  };
}

// The 'params' object is automatically passed by Next.js
const BookingConfirmationPage = ({ params } : ConfirmationPageProps) => {
  const { id } = params;

  return (
    <div className="text-center py-20">
      <div className="w-full max-w-lg p-8 mx-auto space-y-6 bg-white rounded-lg shadow-md">
        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your booking. Your confirmation ID is:
        </p>
        <p className="py-3 px-4 bg-gray-100 rounded-md text-lg font-mono text-gray-800">
          {id}
        </p>
        <p className="text-gray-600">
          You will receive an email confirmation shortly.
        </p>
        <Link href="/workshops" className="inline-block mt-4 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Browse More Workshops
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;