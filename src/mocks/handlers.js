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

// Auto-generate availability slots for 3 SPOCs × 3 slots each
function generateMockSlots() {
  const spocIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const slots = [];
  let slotId = 1;

  for (const spocId of spocIds) {
    const now = Date.now();
    slots.push({
      slot_id: slotId++,
      spoc_id: spocId,
      start_time: new Date(now + 1 * 3600000).toISOString(),
      end_time: new Date(now + 2 * 3600000).toISOString(),
      is_booked: false,
    });
    slots.push({
      slot_id: slotId++,
      spoc_id: spocId,
      start_time: new Date(now + 3 * 3600000).toISOString(),
      end_time: new Date(now + 4 * 3600000).toISOString(),
      is_booked: false,
    });
    slots.push({
      slot_id: slotId++,
      spoc_id: spocId,
      start_time: new Date(now + 5 * 3600000).toISOString(),
      end_time: new Date(now + 6 * 3600000).toISOString(),
      is_booked: false,
    });
  }

  return slots;
}

let fakeAvailability = generateMockSlots();

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
    expertise: "Cloud Infrastructure",
    specialization: "Enterprise Cloud Solutions & Migration",
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
    expertise: "Data Analytics",
    specialization: "Predictive Analytics & Business Intelligence",
    email: "vaibhav.pandey@company.com",
    phone: "+91-9876543212",
  },
  {
    spoc_id: 7,
    name: "Rajesh Sharma",
    expertise: "Cloud Infrastructure",
    specialization: "Enterprise Cloud Solutions & Migration",
    email: "rajesh.sharma@company.com",
    phone: "+91-9876543210",
  },
  {
    spoc_id: 8,
    name: "Ayshman Singh",
    expertise: "Security Solutions",
    specialization: "Regulatory & Data Protection",
    email: "ayushman.singh@company.com",
    phone: "+91-9876543211",
  },
];

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
      "Custom Solutions": "General",           
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
  http.get("/api/v1/spocs/:spocId/availability", ({ params }) => {
    const spocId = Number(params.spocId);

    const spoc = MOCK_SPOCS.find((s) => s.spoc_id === spocId);
    if (!spoc) {
      return HttpResponse.json({ detail: "SPOC not found" }, { status: 404 });
    }

    const availableSlots = fakeAvailability.filter(
      (s) => s.spoc_id === spocId && !s.is_booked
    );

    return HttpResponse.json({
      spoc_id: spoc.spoc_id,
      name: spoc.name,
      expertise: spoc.expertise,
      specialization: spoc.specialization,
      email: spoc.email,
      available_slots: availableSlots,
    });
  }),


  // CREATE BOOKING (MATCH BACKEND EXACTLY)
 
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

    slot.is_booked = true;

    const spoc = MOCK_SPOCS.find((s) => s.spoc_id === data.spoc_id);

    const bookingId = String(fakeBookings.length + 1);

    const newBooking = {
      booking_id: bookingId,
      message: "Booking created successfully",
      spoc_name: spoc.name,
      meeting_link: `https://meet.demo.com/${bookingId}`,
      start_time: slot.start_time,
    };

    fakeBookings.push(newBooking);

    return HttpResponse.json(newBooking, { status: 201 });
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
