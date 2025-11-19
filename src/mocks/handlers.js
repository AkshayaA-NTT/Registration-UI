import { http, HttpResponse } from "msw";

// ===============================
// SIMULATED DATA
// ===============================
let fakeUser = {
  id: 1,
  first_name: "Admin",
  last_name: "One",
  email: "admin@demo.com",
  roles: [{ name: "USER" }],
};

let fakeClients = [];
let fakeBookings = [];

// ===============================
// HANDLERS
// ===============================
export const handlers = [

  // -------------------------------------------------------
  // LOGIN ENDPOINT
  // -------------------------------------------------------
  http.post("/api/v1/auth/login", async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "admin" && password === "admin123") {
      return HttpResponse.json({
        access_token: "mock-token",
        token_type: "bearer",
      });
    }

    return HttpResponse.json(
      { detail: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // -------------------------------------------------------
  // GET CURRENT USER
  // -------------------------------------------------------
  http.get("/api/v1/auth/me", () => {
    return HttpResponse.json(fakeUser);
  }),

  // -------------------------------------------------------
  // CREATE CLIENT / DEAL
  // -------------------------------------------------------
  http.post("/api/v1/clients", async ({ request }) => {
    const data = await request.json();
    const newClient = {
      client_id: fakeClients.length + 1,
      ...data,
    };
    fakeClients.push(newClient);

    return HttpResponse.json(newClient, { status: 201 });
  }),

  // -------------------------------------------------------
  // GET SPOCS (FILTER BY solution_type)
  // -------------------------------------------------------
  http.get("/api/v1/spocs", async ({ request }) => {
    const url = new URL(request.url);
    const solutionType = url.searchParams.get("solution_type")?.toLowerCase();

    // Fake SPOC data
    const spocs = [
      { spoc_id: 1, name: "Riya Sharma", expertise: "cloud" },
      { spoc_id: 2, name: "Arjun Patel", expertise: "security" },
      { spoc_id: 3, name: "Sanya Mehta", expertise: "data" },
      { spoc_id: 4, name: "Mehul Jain", expertise: "automation" },
      { spoc_id: 5, name: "Nisha Rao", expertise: "general" },
    ];

    // Mapping solution_type → expertise required
    const mapSolutionToSkill = {
      "cloud infrastructure": "cloud",
      "security solutions": "security",
      "data analytics": "data",
      "automation": "automation",
      "custom solutions": "general",
    };

    const requiredSkill = mapSolutionToSkill[solutionType];

    const filtered = spocs.filter(
      (s) =>
        !requiredSkill ||
        s.expertise === requiredSkill ||
        s.expertise === "general"
    );

    return HttpResponse.json(filtered);
  }),

  http.get('/spoc-selection', ({ request }) => {
  // passthrough to let the browser handle navigation/static file
  return HttpResponse.passthrough?.() ?? new Response(null, { status: 204 });
}),
  // -------------------------------------------------------
  // GET SPOC AVAILABILITY
  // -------------------------------------------------------
  http.get("/api/v1/spocs/:spocId/availability", () => {
    return HttpResponse.json([
      {
        slot_id: 101,
        start_time: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        slot_id: 102,
        start_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      },
    ]);
  }),

  // -------------------------------------------------------
  // CREATE BOOKING
  // -------------------------------------------------------
  http.post("/api/v1/bookings", async ({ request }) => {
    const data = await request.json();

    const newBooking = {
      booking_id: fakeBookings.length + 1,
      meeting_link: "https://meet.demo.com/12345",
      ...data,
    };

    fakeBookings.push(newBooking);

    return HttpResponse.json(newBooking, { status: 201 });
  }),

  // -------------------------------------------------------
  // GET BOOKING DETAILS
  // -------------------------------------------------------
  http.get("/api/v1/bookings/:id", ({ params }) => {
    const booking = fakeBookings.find(
      (b) => b.booking_id === Number(params.id)
    );

    if (!booking) {
      return HttpResponse.json(
        { detail: "Booking not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(booking);
  }),
];
