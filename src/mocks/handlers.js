import { http, HttpResponse } from "msw";

// Simulated in-memory data
let fakeUser = {
  id: 1,
  first_name: "Admin",
  last_name: "1",
  email: "admin@demo.com",
  roles: [{ name: "USER" }],
};

let fakeClients = [];
let fakeBookings = [];

export const handlers = [
  // Login Endpoint
  http.post("/api/v1/auth/login", async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "admin" && password === "admin123") {
      return HttpResponse.json({ access_token: "mock-token", token_type: "bearer" });
    }
    return HttpResponse.json({ detail: "Invalid credentials" }, { status: 401 });
  }),

  // Get current user
  http.get("/api/v1/auth/me", () =>
    HttpResponse.json(fakeUser)
  ),

  // Create client (deal)
  http.post("/api/v1/clients", async ({ request }) => {
    const data = await request.json();
    const newClient = { id: fakeClients.length + 1, ...data };
    fakeClients.push(newClient);
    return HttpResponse.json(newClient, { status: 201 });
  }),

  // Get list of SPOCs
  http.get("/api/v1/spocs", () =>
    HttpResponse.json([
      { id: 1, name: "Riya Sharma", expertise: "Cloud", available: true },
      { id: 2, name: "Arjun Patel", expertise: "AI", available: false },
      { id: 3, name: "Sanya Mehta", expertise: "Data Analytics", available: true },
    ])
  ),

  // Get SPOC availability
  http.get("/api/v1/spocs/:spocId/availability", () =>
    HttpResponse.json([
      {
        id: 101,
        start_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 102,
        start_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      },
    ])
  ),

  // Create booking
  http.post("/api/v1/bookings", async ({ request }) => {
    const booking = await request.json();
    const newBooking = {
      booking_id: fakeBookings.length + 1,
      meeting_link: "https://meet.demo.com/12345",
      ...booking,
    };
    fakeBookings.push(newBooking);
    return HttpResponse.json(newBooking, { status: 201 });
  }),

  // Get booking details
  http.get("/api/v1/bookings/:id", ({ params }) => {
    const booking = fakeBookings.find((b) => b.booking_id === Number(params.id));
    if (booking) return HttpResponse.json(booking);
    return HttpResponse.json({ detail: "Booking not found" }, { status: 404 });
  }),
];
