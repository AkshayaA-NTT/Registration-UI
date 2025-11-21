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

// ===============================
// MOCK SPOCs (MATCH BACKEND EXACTLY)
// ===============================

const MOCK_SPOCS = [
  {
    spoc_id: 1,
    name: "Rajesh Sharma",
    expertise: "Cloud Infrastructure",
    specialization: "Enterprise Cloud Solutions & Migration",
    email: "rajesh.sharma@company.com",
    phone: "+91-9876543210",
  },
  {
    spoc_id: 2,
    name: "Priya Desai",
    expertise: "Security Solutions",
    specialization: "Regulatory & Data Protection",
    email: "priya.desai@company.com",
    phone: "+91-9876543211",
  },
  {
    spoc_id: 3,
    name: "Amit Patel",
    expertise: "Data Analytics",
    specialization: "Predictive Analytics & Business Intelligence",
    email: "amit.patel@company.com",
    phone: "+91-9876543212",
  },
  {
    spoc_id: 4,
    name: "Sanya Mishra",
    expertise: "Automation",
    specialization: "Robotic Process Automation & AI Integration",
    email: "sanya.mishra@company.com",
    phone: "+91-9876543210",
  },
  {
    spoc_id: 5,
    name: "Anil Kumar",
    expertise: "Security Solutions",
    specialization: "Regulatory & Data Protection",
    email: "anil.kumar@company.com",
    phone: "+91-9876543211",
  },
  {
    spoc_id: 6,
    name: "Vaibhav Pandey",
    expertise: "General",
    specialization: "Custom Solutions & Consulting",
    email: "vaibhav.pandey@company.com",
    phone: "+91-9876547212",
  },
  {
    spoc_id: 7,
    name: "Abhinav Rathod",
    expertise: "Cloud Infrastructure",
    specialization: "Enterprise Cloud Solutions & Migration",
    email: "abhinav.rathod@company.com",
    phone: "+91-9874543210",
  },
  {
    spoc_id: 8,
    name: "Ayshman Singh",
    expertise: "Security Solutions",
    specialization: "Regulatory & Data Protection",
    email: "ayushman.singh@company.com",
    phone: "+91-9876543111",
  },
];

function generateAvailability() {
  const slots = [];
  let slotId = 1;

  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 1);

  for (const spoc of MOCK_SPOCS) {
    for (let day = 0; day < 14; day++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + day);

      const slotTimes = [
        { start: 10, end: 11 },
        { start: 14, end: 15 },
        { start: 16, end: 17 },
      ];

      for (const t of slotTimes) {
        const start = new Date(date);
        start.setHours(t.start, 0, 0, 0);

        const end = new Date(date);
        end.setHours(t.end, 0, 0, 0);

        slots.push({
          slot_id: slotId++,
          spoc_id: spoc.spoc_id,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          is_booked: false,
        });
      }
    }
  }
  return slots;
}

let fakeAvailability = generateAvailability();
let fakeClients = [];
let fakeBookings = []

// HANDLERS

export const handlers = [
  // LOGIN
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

  // ME (user profile)
  
  http.get("/api/v1/auth/me", () => {
    return HttpResponse.json(fakeUser);
  }),

  // CREATE CLIENT

  http.post("/api/v1/clients", async ({ request }) => {
    const data = await request.json();
    const newClient = {
      client_id: String(fakeClients.length + 1),
      ...data,
      created_at: new Date().toISOString(),
    };
    fakeClients.push(newClient);

    return HttpResponse.json(newClient, { status: 201 });
  }),

  // GET SPOCS 

  http.get("/api/v1/spocs", async ({ request }) => {
  const url = new URL(request.url);
  const solutionType = url.searchParams.get("solution_type")?.toLowerCase();

  let filtered = [...MOCK_SPOCS];

  if (solutionType) {
    const map = {
      "Cloud Infrastructure": "Cloud Infrastructure",
      "Security Solutions": "Security Solutions",
      "Data Analytics": "Data Analytics",
      "Automation": "Automation",
      "custom solutions": "general",           
    };

    const mappedType = map[solutionType] || solutionType;

    filtered = filtered.filter((s) =>
      s.expertise.toLowerCase().includes(mappedType)
    );
  }

  if (filtered.length === 0) {
    return HttpResponse.json(
      { detail: "No SPOCs found matching criteria" },
      { status: 404 }
    );
  }

  return HttpResponse.json(filtered);
}),

  // SPOC AVAILABILITY (MATCHES BACKEND RESPONSE MODEL)
  http.get("/api/v1/spocs/:spocId/availability", ({ params, request }) => {
    const spocId = Number(params.spocId);

    const spoc = MOCK_SPOCS.find((s) => s.spoc_id === spocId);
    if (!spoc) {
      return HttpResponse.json({ detail: "SPOC not found" }, { status: 404 });
    }

    const url = new URL(request.url);

    const startDate = url.searchParams.get("start_date");
    const endDate = url.searchParams.get("end_date");

    let slots = fakeAvailability.filter(
      (slot) => slot.spoc_id === spocId && !slot.is_booked
    );

    // Match backend filtering
    if (startDate) {
      slots = slots.filter((s) => s.start_time >= startDate);
    }
    if (endDate) {
      slots = slots.filter((s) => s.end_time <= endDate);
    }

    return HttpResponse.json({
      spoc_id: spoc.spoc_id,
      name: spoc.name,
      expertise: spoc.expertise,
      specialization: spoc.specialization,
      email: spoc.email,
      available_slots: slots,
    });
  }),

  // CREATE BOOKING — EXACT BACKEND MATCH
  http.post("/api/v1/bookings", async ({ request }) => {
    const data = await request.json();

    const slot = fakeAvailability.find(
      (s) => s.slot_id === data.slot_id && !s.is_booked
    );

    if (!slot) {
      return HttpResponse.json(
        { detail: "Slot not available or does not exist" },
        { status: 400 }
      );
    }

    const spoc = MOCK_SPOCS.find((s) => s.spoc_id === data.spoc_id);
    if (!spoc) {
      return HttpResponse.json({ detail: "SPOC not found" }, { status: 404 });
    }

    slot.is_booked = true;

    const bookingId = Math.random().toString(36).substring(2, 10);

    const booking = {
      booking_id: bookingId,
      message: "Booking created successfully",
      spoc_name: spoc.name,
      meeting_link: `https://meet.example.com/${bookingId}`,
      start_time: slot.start_time,
    };

    fakeBookings.push(booking);

    return HttpResponse.json(booking, { status: 201 });
  }),

  // GET BOOKING DETAILS
  
  http.get("/api/v1/bookings/:id", ({ params }) => {
    const booking = fakeBookings.find((b) => b.booking_id === params.id);

    if (!booking) {
      return HttpResponse.json({ detail: "Booking not found" }, { status: 404 });
    }

    return HttpResponse.json(booking);
  }),
];
