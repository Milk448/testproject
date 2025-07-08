// types/index.ts

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  maxCapacity: number;
  timeSlots: TimeSlot[];
}

export interface BookingConfirmation {
  bookingId: string;
}

export interface MyBooking {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED';
  workshop: {
    title: string;
    date: string;
  };
  timeSlot: {
    startTime: string;
    endTime: string;
  };
}