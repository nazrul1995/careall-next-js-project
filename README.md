# Care.xyz 🏥
### Baby Sitting & Elderly Care Service Platform

Care.xyz is a full-stack caregiving service platform built with Next.js 14.  
It allows users to book trusted caretakers for children, elderly, and sick family members.

The goal of the platform is to make caregiving easy, secure, and accessible for everyone.

---

## 🌍 Live Concept

Care.xyz connects families with verified caregivers and provides:

- Babysitting Services
- Elderly Care Services
- Special Medical / Sick Care
- Secure Online Booking
- Payment Integration
- Email Invoice System
- User Dashboard & Admin Panel

---

## 🚀 Features

### ✅ Core Features
- Responsive Design (Mobile / Tablet / Desktop)
- User Authentication (Email & Password)
- Google Social Login
- Dynamic Booking System
- Location Selection (Division, District, City, Area, Address)
- Automatic Total Cost Calculation
- Booking Status Tracking (Pending / Confirmed / Completed / Cancelled)
- My Bookings Dashboard
- Service Detail Pages
- Metadata Implementation (SEO)

### 💳 Payment
- Stripe Payment Integration
- Payment Webhook Handling
- Booking Created After Successful Payment
- Email Invoice Sent After Booking

### 👤 User Dashboard
- Overview (Booking Stats)
- My Bookings
- Payment History
- Profile & Settings

### 🛠 Admin Dashboard
- Manage Users
- Manage Bookings
- Manage Services
- View Payment History

---

## 🧱 Tech Stack

| Technology | Purpose |
|------------|----------|
| Next.js 14 (App Router) | Full-stack Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| NextAuth | Authentication |
| MongoDB / PostgreSQL | Database |
| Stripe | Payment Gateway |
| Nodemailer / Resend | Email Invoice |

---

## 📂 Project Structure

---

## 🔐 Environment Variables

Create a `.env.local` file and add:
NEXTAUTH_SECRET=
NEXTAUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=

⚠️ Never commit your `.env.local` file to GitHub.

---

## 🛠 Installation & Setup

### 1️⃣ Clone the repository

---

## 📦 Booking Flow

1. User selects a service
2. Chooses duration & location
3. Total cost is calculated dynamically
4. User completes Stripe payment
5. Booking created with status = Pending
6. Email invoice sent automatically

---

## 🔐 Role-Based Access

- Public Routes: Homepage, Service Details
- Private Routes: Booking, Dashboard
- Admin Routes: Admin Panel (Role Protected)

---

## 📊 Future Improvements

- Caregiver Registration System
- Real-time Booking Status Updates
- Notification System
- Review & Rating System
- Advanced Admin Analytics
- Mobile App Version

---

## 🧠 Learning Goals

This project demonstrates:

- Full-stack architecture with Next.js App Router
- Secure authentication system
- Payment integration with Stripe
- Role-based authorization
- Email automation
- Production-level folder structure

---

## 📄 License

This project is created for academic and portfolio purposes.

---

## 👨‍💻 Author

Nazrul Islam  
Full-Stack Web Developer  

---

## ⭐ If You Like This Project

Give it a ⭐ on GitHub!