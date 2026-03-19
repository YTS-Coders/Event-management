---

## 🎨 MASTER PROMPT — Sacred Heart College Event Management System (Frontend)

---

```
You are a senior full-stack MERN engineer and UI/UX specialist with 20+ years of experience 
building scalable, visually exceptional production applications.

Your task is to generate a COMPLETE, FULLY FUNCTIONAL React.js frontend for a 
Centralized College Event Registration and Management System.

---

# 🎨 DESIGN SYSTEM — MANDATORY COLOR PALETTE

Use ONLY these exact colors as CSS variables throughout the entire application:

:root {
  --burgundy:     #710927;   /* Primary — buttons, headers, active states */
  --indigo:       #233E65;   /* Secondary — sidebar, nav, card borders */
  --brass:        #C49F6D;   /* Accent — icons, highlights, hover glows */
  --linen:        #DDD1BC;   /* Muted backgrounds, input fills, dividers */
  --plaster:      #F0EFEA;   /* Page background, card backgrounds */
  --white:        #FFFFFF;
  --text-dark:    #1A1A1A;
  --text-mid:     #4A4A4A;
  --text-light:   #8A8A8A;
  --success:      #2D6A4F;
  --error:        #9B1C1C;
  --warning:      #92400E;
}

Typography Rules:
- Display/Headings: 'Playfair Display' (Google Fonts) — serif elegance matching the college identity
- Body/UI: 'DM Sans' (Google Fonts) — clean, modern readability
- Monospace/Codes: 'JetBrains Mono' — for IDs, roll numbers, codes

Visual Language:
- Background: var(--plaster) base with subtle linen texture on cards
- Primary CTA buttons: var(--burgundy) with brass hover glow
- Nav/Sidebar: var(--indigo) with white text, brass active indicator
- Card borders: 1px solid var(--linen), subtle box-shadow in brass tones
- Section headers: var(--burgundy) underline accent
- Input fields: var(--linen) background, var(--indigo) focus ring
- Badges/Tags: var(--brass) background, var(--indigo) text
- Toast success: var(--success), error: var(--error), warning: var(--warning)
- Animations: smooth 200–300ms ease transitions on all interactions
- No Tailwind — plain CSS only with CSS variables

---

# 🏗️ PROJECT SETUP

Framework: React.js with Vite
Dependencies to install:
- axios
- react-router-dom
- react-toastify
- qrcode.react
- react-dropzone (for file uploads)

Folder Structure:
src/
├── api/
│   ├── axiosInstance.js       # Axios with auth interceptor
│   ├── authApi.js
│   ├── eventsApi.js
│   ├── participantsApi.js
│   ├── analyticsApi.js
│   ├── notificationsApi.js
│   ├── certificateApi.js
│   └── sesApi.js
├── context/
│   └── AuthContext.jsx        # Auth + role state via Context API
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── EventCard.jsx
│   ├── GameCard.jsx
│   ├── QRPayment.jsx
│   ├── Loader.jsx
│   ├── Toast.jsx
│   ├── ProtectedRoute.jsx
│   ├── NotificationBell.jsx
│   └── ImageSlider.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── EventDetailsPage.jsx
│   ├── RegistrationPage.jsx
│   ├── LoginPage.jsx
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── PendingEvents.jsx
│   │   └── DepartmentView.jsx
│   ├── hod/
│   │   ├── HODDashboard.jsx
│   │   ├── CreateEvent.jsx
│   │   ├── CreateLeader.jsx
│   │   └── SESReport.jsx
│   └── leader/
│       ├── LeaderDashboard.jsx
│       ├── ManageGames.jsx
│       └── VerifyPayments.jsx
├── utils/
│   ├── debounce.js
│   ├── formatDate.js
│   └── roleGuard.js
├── styles/
│   ├── global.css
│   ├── navbar.css
│   ├── landing.css
│   ├── eventdetails.css
│   ├── registration.css
│   ├── dashboard.css
│   ├── auth.css
│   └── components.css
├── App.jsx
└── main.jsx

---

# 🌐 BACKEND BASE URL

const BASE_URL = "http://localhost:5000";

Configure in axiosInstance.js:
- baseURL: BASE_URL
- Attach Bearer token from localStorage on every request
- 401 interceptor → clear localStorage → redirect to /login

---

# 📄 PAGE-BY-PAGE IMPLEMENTATION

## PAGE 1: Landing Page (/")

Layout:
- Full-width college header bar:
  Background: var(--burgundy)
  Text: "SACRED HEART COLLEGE (AUTONOMOUS)" in Playfair Display, white
  Subtitle: "Tiruchengode — Empowering Excellence Since 1953"
  
- ImageSlider component below header:
  Auto-advancing (4s interval), admin-uploaded images
  Dots navigation, arrow controls styled in var(--brass)
  Fallback: show 3 placeholder gradient slides in indigo/burgundy
  
- Section: "Upcoming Events"
  Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
  Each card: EventCard component
  Fetch from GET /api/events/public
  
- Footer: college name, contact, social icons in var(--indigo)

EventCard Component:
- Image (fallback: gradient with event title initial)
- Event title in Playfair Display
- Date, department badge in var(--brass)
- Short description (truncated to 2 lines)
- "View Details →" button in var(--burgundy)
- Hover: card lifts with brass shadow (box-shadow: 0 8px 32px rgba(196,159,109,0.25))
- Click: navigate to /events/:id

---

## PAGE 2: Event Details Page (/events/:id)

Layout: Two-column on desktop (60% content / 40% sidebar)

Left column:
- Hero image (full width, rounded)
- Event title (Playfair Display, 2.5rem, var(--burgundy))
- Date, time, venue tags
- Description (full)
- Instructions (numbered list, indigo bullet style)

Right column (sticky):
- "Games in This Event" section
  Each game as a GameCard:
  - Name + icon
  - Rules (collapsible accordion)
  - Participant limit badge
  - Current registrations count (if available)
  
- "Register Now" CTA button (full width, var(--burgundy))
  → navigates to /register/:id
  → disabled with tooltip if event is not approved

---

## PAGE 3: Registration Page (/register/:id)

Multi-step form with progress indicator (3 steps):

Step 1 — Participant Details:
Fields:
- Full Name (text, required)
- Roll Number (text, required, uppercase transform)
- Department (select dropdown, populated from event data)
- Email (email, required)
- Phone (tel, required, 10 digits)

Step 2 — Game Selection:
- Display all games as checkbox cards
- Each card shows: game name, rules summary, participant limit
- Max selection limit shown as: "Select up to X games"
- Warning toast if limit exceeded: "You can only select up to X games"
- Real-time remaining slot counter per game

Step 3 — Payment:
- Show event fee amount
- QRPayment component:
  - Generate UPI QR using: upi://pay?pa={upiId}&pn={collegeName}&am={amount}&cu=INR
  - Use qrcode.react library
  - Display UPI ID below QR
  - "QR Valid for This Session Only" warning
- File Upload (react-dropzone):
  - Accept: image/*, .pdf
  - Show preview of uploaded screenshot
  - Upload on submit: POST /api/participants/upload/:participantId

Form Flow:
1. Validate Step 1 → POST /api/participants/register → store returned participantId
2. Validate Step 2 (game limits)
3. Show QR → upload screenshot → POST /api/participants/upload/:id
4. Success screen with:
   - Confirmation message
   - Participant ID display (monospace font)
   - "Download Certificate" button → GET /api/certificate/generate/:id

Debounce submit button: 2000ms to prevent spam
All API errors: show toast with error.response.data.message

---

## PAGE 4: Login Page (/login)

Layout: Centered card on plaster background
- College logo/name at top
- Email + Password fields
- "Login" button (burgundy)
- Role shown after login as badge (ADMIN / HOD / LEADER)

POST /api/auth/login → store token + role in localStorage
AuthContext: { user, role, token, login(), logout() }

After login, redirect by role:
- ADMIN → /admin/dashboard
- HOD → /hod/dashboard
- LEADER → /leader/dashboard

---

## DASHBOARD 1: HOD Dashboard (/hod/dashboard)

Sidebar navigation (var(--indigo)):
- Create Event
- Create Leader
- My Events
- SES Report
- Notifications

Create Event Form (POST /api/events/create):
Fields:
- Event Title
- Description
- Instructions (textarea)
- Event Date + Time (datetime-local)
- Venue
- Department
- Fee Amount
- UPI ID (for payment QR)
- Max Games Per Participant (number, controls game selection limit)
- Games section (dynamic add/remove):
  Each game:
  - Game Name
  - Rules
  - Participant Limit
  - Category (Technical / Non-Technical)
- Event Poster Upload

Create Leader Form (POST /api/auth/register with role: LEADER):
Fields: Name, Email, Password, Department, Assigned Event

My Events: list of HOD's events with status badges:
- Pending: var(--warning)
- Approved: var(--success)
- Rejected: var(--error)
- Completed: var(--indigo)

SES Report (/hod/ses-report):
- Upload section (react-dropzone):
  Accept: .zip, .pdf, .doc, .docx
  Files: Invitation letter, Feedback forms, Resource person details
- "Generate SES Report" button
- POST /api/ses/generate → display formatted report in preview panel

---

## DASHBOARD 2: Leader Dashboard (/leader/dashboard)

Sidebar navigation:
- My Games
- Verify Payments
- Notifications

Manage Games:
- List games assigned to this leader
- Edit participant limits (inline edit)
- Set game status: Open / Closed

Verify Payments (PUT /api/events/verify/:id):
- Table of participants pending verification
- Columns: Name, Roll No, Department, Games, Payment Screenshot
- Screenshot preview (clickable thumbnail)
- Approve / Reject buttons per row
- Bulk approve option

---

## DASHBOARD 3: Admin Dashboard (/admin/dashboard)

Sidebar navigation:
- Pending Events
- All Departments
- Analytics
- Notifications

Pending Events (GET /api/events/pending):
- Card view of events awaiting approval
- Each card: event name, HOD name, department, date, poster thumbnail
- Action buttons:
  Approve: PUT /api/events/approve/:id (green, var(--success))
  Reject: PUT /api/events/reject/:id (red, var(--error))
  Mark Complete: PUT /api/events/complete/:id (indigo)
- Rejection: prompt for reason (modal with textarea)

Analytics (GET /api/analytics):
- Stats cards: Total Events, Total Participants, Pending Approvals
- Styled with brass accent borders
- Simple bar representation using CSS (no chart library)

Notifications (GET /api/notifications):
- List with read/unread states
- PUT /api/notifications/read/:id on click
- NotificationBell in navbar shows unread count badge

---

# 🔐 ROUTE PROTECTION

ProtectedRoute component:
- Reads role from AuthContext
- Redirects unauthorized roles to /unauthorized page
- Unauthenticated → /login

Route map in App.jsx:
/ → LandingPage (public)
/events/:id → EventDetailsPage (public)
/register/:id → RegistrationPage (public)
/login → LoginPage
/admin/* → AdminDashboard (role: ADMIN)
/hod/* → HODDashboard (role: HOD)
/leader/* → LeaderDashboard (role: LEADER)
/unauthorized → Simple 403 page

---

# 🧩 REUSABLE COMPONENTS

Navbar:
- Logo + college name left
- Nav links center (public: Home, Events)
- Right: login button OR user avatar + role badge + notification bell + logout
- Sticky, var(--indigo) background, brass hover underlines
- Mobile: hamburger menu

Loader:
- Full-page overlay during API calls
- Animated: spinning ring in var(--brass) on var(--plaster) backdrop

Toast System (react-toastify):
- Position: top-right
- Success: var(--success) with check icon
- Error: var(--error) with X icon
- Warning: var(--warning) with ! icon
- Auto-close: 4000ms

QRPayment Component:
- Props: upiId, amount, collegeName
- Generates UPI deep link and renders QR via qrcode.react
- Shows UPI ID in monospace below
- Copy UPI ID button
- "Scan & Pay" instruction text

---

# 🛠️ UTILITY FUNCTIONS

debounce.js: standard debounce implementation, use on form submit
formatDate.js: format ISO dates → "19 March 2026, 10:00 AM"
roleGuard.js: helper to check if current user role matches allowed roles

---

# ✅ QUALITY REQUIREMENTS

1. Every API call must have:
   - Loading state (show Loader or skeleton)
   - Error state (show toast with message)
   - Empty state (show styled empty illustration with message)

2. Forms must have:
   - Client-side validation before API call
   - Field-level error messages (red text below field)
   - Disabled submit during loading

3. CSS must:
   - Use ONLY the defined CSS variables
   - Be responsive (mobile-first)
   - Have smooth hover/focus transitions
   - Never use inline styles except for dynamic values (e.g., QR size)

4. Code must:
   - Use functional components + hooks only
   - Separate concerns (API calls in /api/, logic in components)
   - Handle missing APIs gracefully with fallback state
   - Be fully connected end-to-end

---

# 🚀 DELIVERABLE

Generate COMPLETE, COPY-PASTE READY code for every file listed in the folder structure. 
Do not skip any file. Do not use placeholder comments like "// add logic here". 
Every component must be fully implemented and wired to the correct API endpoint.
Start with: main.jsx → App.jsx → axiosInstance.js → AuthContext.jsx → then all pages in order.
```

---

### 🔑 What this rewritten prompt adds over your original:

| Area | Original | Rewritten |
|---|---|---|
| Color system | Not specified | Exact hex variables with usage rules per element |
| Typography | Not specified | Playfair Display + DM Sans + JetBrains Mono |
| CSS variable names | None | Full `:root {}` block ready to paste |
| Component styling | Generic | Per-component color, shadow, hover rules |
| API error handling | Mentioned | Specified per page + per form field |
| Empty states | Not mentioned | Explicitly required |
| Toast specs | "use toasts" | Colors, icons, position, timing defined |
| Folder structure | Listed | Fully mapped with every file named |
| Route map | Partial | Complete with role guards |
| Output format | Vague | Explicit: start order, no placeholders |