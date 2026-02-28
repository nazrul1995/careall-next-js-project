care-xyz/
│
├── public/
│   ├── images/
│   │   ├── hero.jpg
│   │   ├── baby-care.jpg
│   │   ├── elderly-care.jpg
│   │   └── sick-care.jpg
│   ├── icons/
│   └── logo.svg
│
├── src/
│
│   ├── app/
│   │
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Homepage
│   │   ├── not-found.tsx               # 404 Page
│   │   ├── loading.tsx
│   │
│   │   ├── service/
│   │   │   └── [serviceId]/
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx
│   │   │       └── metadata.ts
│   │
│   │   ├── booking/
│   │   │   └── [serviceId]/
│   │   │       ├── page.tsx            # Private
│   │   │       └── loading.tsx
│   │
│   │   ├── my-bookings/
│   │   │   └── page.tsx                # Private
│   │
│   │   ├── dashboard/                  # USER DASHBOARD
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── my-bookings/
│   │   │   │   └── page.tsx
│   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │
│   │   ├── admin/                      # ADMIN DASHBOARD
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   ├── bookings/
│   │   │   │   └── page.tsx
│   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   └── services/
│   │   │       └── page.tsx
│   │
│   │   ├── login/
│   │   │   └── page.tsx
│   │
│   │   ├── register/
│   │   │   └── page.tsx
│   │
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/route.ts
│   │       │
│   │       ├── bookings/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       │
│   │       ├── payments/
│   │       │   ├── stripe-session/route.ts
│   │       │   └── webhook/route.ts
│   │       │
│   │       ├── services/
│   │       │   └── route.ts
│   │       │
│   │       ├── users/
│   │       │   └── route.ts
│   │       │
│   │       └── send-invoice/
│   │           └── route.ts
│
│   ├── components/
│   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Metrics.tsx
│   │   │
│   │   ├── service/
│   │   │   ├── ServiceCard.tsx
│   │   │   └── ServiceDetails.tsx
│   │   │
│   │   ├── booking/
│   │   │   ├── BookingForm.tsx
│   │   │   ├── DurationSelector.tsx
│   │   │   ├── LocationSelector.tsx
│   │   │   ├── CostSummary.tsx
│   │   │   └── BookingSuccess.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── BookingTable.tsx
│   │   │   └── StatusBadge.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminTopbar.tsx
│   │   │   ├── UserTable.tsx
│   │   │   ├── BookingManagementTable.tsx
│   │   │   └── PaymentHistoryTable.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Modal.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Loader.tsx
│   │       └── Pagination.tsx
│
│   ├── lib/
│   │   ├── db.ts                     # Database connection
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── stripe.ts                 # Stripe config
│   │   ├── email.ts                  # Email logic
│   │   ├── invoice.ts                # Invoice template
│   │   ├── metadata.ts               # Metadata helper
│   │   ├── roles.ts                  # Role-based access
│   │   └── utils.ts
│
│   ├── models/ (if MongoDB)
│   │   ├── User.ts
│   │   ├── Service.ts
│   │   ├── Booking.ts
│   │   ├── Payment.ts
│   │   └── Review.ts
│
│   ├── prisma/ (if PostgreSQL)
│   │   └── schema.prisma
│
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useBooking.ts
│   │   ├── useStripe.ts
│   │   └── useRole.ts
│
│   ├── middleware.ts                 # Protect private routes
│
│   ├── types/
│   │   ├── user.d.ts
│   │   ├── booking.d.ts
│   │   ├── service.d.ts
│   │   └── payment.d.ts
│
│   └── styles/
│       └── globals.css
│
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md