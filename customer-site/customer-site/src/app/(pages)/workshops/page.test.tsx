import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkshopsPage from './page'; // The server component page
import { AuthProvider, useAuth } from '@/app/context/AuthContext'; // The real provider
import * as customerApi from '@/app/api/customerApi';
import { Workshop } from '@/types';

// ---- Mocks ----
// Mock the API module
vi.mock('@/app/api/customerApi');

// Mock the Next.js router
const mockRouter = { push: vi.fn() };
vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// Mock the useAuth hook for authenticated user tests
vi.mock('@/app/context/AuthContext', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/app/context/AuthContext')>();
  return {
    ...mod,
    useAuth: vi.fn(), // We will define its return value in each test
  };
});


// ---- Test Data ----
const mockWorkshops: Workshop[] = [
  { id: 'w1', title: 'Live Test Workshop', description: 'Test Desc', date: new Date().toISOString(), maxCapacity: 10, timeSlots: [{ id: 's1', startTime: '10am', endTime: '11am', availableSpots: 5 }] },
  { id: 'w2', title: 'Another Live Workshop', description: 'Another Desc', date: new Date().toISOString(), maxCapacity: 15, timeSlots: [{ id: 's2', startTime: '1pm', endTime: '2pm', availableSpots: 8 }] },
];


describe('Workshops Page and Booking Flow', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockRouter.push.mockClear();
    // Mock the API for the server component part
    (customerApi.getPublicWorkshops as vi.Mock).mockResolvedValue(mockWorkshops);
  });

  // Test 1: Public Viewing Functionality
  it('should render a list of workshops fetched from the API', async () => {
    // Since WorkshopsPage is a Server Component, we need to resolve its promise
    const PageComponent = await WorkshopsPage({});
    render(<AuthProvider>{PageComponent}</AuthProvider>);

    // Assert that the workshop titles are on the page
    expect(await screen.findByText('Live Test Workshop')).toBeInTheDocument();
    expect(await screen.findByText('Another Live Workshop')).toBeInTheDocument();
  });


  // Test 2: Unauthenticated User Experience
  it('should show an error message when an unauthenticated user tries to book', async () => {
    // Arrange: Mock useAuth to return no token
    (useAuth as vi.Mock).mockReturnValue({ token: null });

    const PageComponent = await WorkshopsPage({});
    render(<AuthProvider>{PageComponent}</AuthProvider>);
    
    // Act: Find the first "Book Now" button and click it
    const bookButtons = await screen.findAllByRole('button', { name: /book now/i });
    await userEvent.click(bookButtons[0]);

    // Assert: An error message should appear
    expect(await screen.findByText(/please log in to book a workshop/i)).toBeInTheDocument();
  });


  // Test 3: Authenticated User Booking Flow
  it('should call createBooking and redirect when an authenticated user books', async () => {
    // Arrange: Mock useAuth to return a fake token
    (useAuth as vi.Mock).mockReturnValue({ token: 'fake-jwt-token' });

    // Mock the createBooking API call to simulate success
    const createBookingMock = (customerApi.createBooking as vi.Mock).mockResolvedValue({ bookingId: 'booking-xyz-123' });

    const PageComponent = await WorkshopsPage({});
    render(<AuthProvider>{PageComponent}</AuthProvider>);

    // Act
    const bookButtons = await screen.findAllByRole('button', { name: /book now/i });
    await userEvent.click(bookButtons[0]);

    // Assert
    // 1. The API should have been called
    await waitFor(() => {
        expect(createBookingMock).toHaveBeenCalledTimes(1);
        // Check if it was called with the correct workshop and time slot IDs
        expect(createBookingMock).toHaveBeenCalledWith(
            { workshopId: 'w1', timeSlotId: 's1' },
            'fake-jwt-token'
        );
    });

    // 2. The user should be redirected to the confirmation page
    await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith('/booking-confirmation/booking-xyz-123');
    });
  });
});