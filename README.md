Workshop Booking System - Project Details
Overview
A system to manage workshop bookings where admins create workshops with detailed information and associated time slots, and customers can register, view available workshops, select a specific time slot, and submit a booking. Admins manage bookings and monitor stats via a dashboard. Workshops represent real-life sessions (e.g., "Python 101" or "Yoga Basics") held on specific dates with multiple time options.
Tech Stack
Frontend:
Admin Panel: React with Material-UI (MUI) for the dashboard and components.
Customer Site: React or Next.js with Tailwind CSS for styling.
State Management: Redux Toolkit.
Charts: Recharts for data visualization on the admin dashboard.
Backend:
Runtime/Framework: Node.js with Express.js.
Architecture: Clean Architecture principles should be applied.
Database: PostgreSQL with Prisma for data modeling and queries.
Authentication: JWT for secure login for both customers and admins.
Validation: Zod for form and input validation.
Testing: Jest & Supertest (at least two endpoints must be tested).
Deployment: Containerized with Docker and deployed on a public server (e.g. Vercel).
Admin Panel Pages
Login: Secure login page for admins using JWT authentication.
Dashboard: Displays stats like total bookings, slots filled, and popular workshops (e.g., most booked workshop title), using Recharts for visualizations.
Workshops: Create and manage workshops with fields: title (e.g., "Python 101"), description (e.g., "Learn Python basics"), date (e.g., "2025-07-10"), and max capacity (e.g., 15).
Time Slots: Add and manage time slots for each workshop with start time (e.g., "10:00 AM"), end time (e.g., "12:00 PM"), and available spots (which decrements with bookings).
Bookings: View and update bookings with customer name, email, booked workshop title, time slot, and status (e.g., pending, confirmed, canceled).
Customer Site Pages
Register: Registration page for customers to create an account with name, email, and password.
Workshops: List of available workshops with details and a time slot selection form.
Booking Confirmation: Display booking confirmation with a unique ID after submission.
Endpoints
Customer Site (2)
GET /api/workshops: Retrieve all active workshops with title, description, date, max capacity, and associated time slots (start time, end time, available spots).
POST /api/bookings: Submit a booking with customer name, email, workshop ID, and time slot ID; returns a confirmation ID and updates available spots.
Admin Panel (4)
GET /api/bookings: Fetch all bookings with workshop title, time slot (start/end time), customer name, email, and status.
PUT /api/bookings/:id: Update a booking’s status (e.g., from pending to confirmed).
POST /api/workshops: Create a workshop with title, description, date, max capacity, and initial time slots.
GET /api/stats: Retrieve stats for the dashboard (e.g., total bookings, slots filled percentage).
Features & Requirements
Authentication: Secure JWT-based login for admins and customer registration.
CRUD Operations: Full CRUD for workshops (including creating them with time slots) and bookings (view, update status).
Soft Deletion: Implement soft deletion for workshops and bookings in the database.
Security:
Rate Limiting: Apply rate limiting to endpoints (e.g., 100 requests/hour per IP).
Input Validation: Use Zod for validating all incoming data (e.g., required fields, correct date/time formats).
Database:
Pagination and Filtering: Implement pagination and filtering on API endpoints that return lists of data (e.g., GET /api/bookings).
Seeding: Create a script to seed the database with initial data for development and testing.
UI/UX:
Customer Site: A clean and responsive interface using Tailwind CSS.
Admin Panel: A functional and data-rich dashboard using MUI.
Documentation: Provide separate READMEs for the admin panel, customer site, and backend, including setup instructions (e.g., Docker commands, environment variables).
Testing: Write a test for at least one endpoint using Jest or Supertest to ensure correct data retrieval.
Extras (Not Mandatory)
RBAC: Role-Based Access Control for different admin roles (e.g., a basic admin vs. a super admin with full control).
CI/CD: Set up a continuous integration and deployment pipeline using GitHub Actions.
Deliverables
Live URL for the admin panel.
Live URL for the customer site.
GitHub repo for the admin panel.
GitHub repo for the customer site.
GitHub repo for the backend.
A README file for each repository.

