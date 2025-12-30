# SPTC Website - Feature Roadmap

## Phase 1: Core Backend Integration (Highest Priority)

- [ ] Member Portal - Household
  - [ ] Wire up household data from Supabase
  - [ ] Display real household members
  - [ ] Edit household functionality
- [ ] Member Portal - Reservations
  - [ ] Show real tennis reservations from DB
  - [ ] Show real swim reservations from DB
  - [ ] Cancel reservation functionality
- [ ] Contact Form Submission
  - [ ] Save submissions to `contact_submissions` table
  - [ ] Success/error feedback
- [ ] Board Portal - Check-in
  - [ ] Real-time member check-ins to DB
  - [ ] Household search from DB
  - [ ] Guest check-in tracking

## Phase 2: Transactional Features

- [ ] Event Registration
  - [ ] Save registrations to `event_registrations` table
  - [ ] Enforce registration limits
  - [ ] Show registration status in member portal
- [ ] Party Booking
  - [ ] Submit booking requests to DB
  - [ ] Admin approval workflow
- [ ] Guest Pass Shop
  - [ ] Create shop page (`/shop`)
  - [ ] Guest pass purchase flow
  - [ ] Cart functionality
- [ ] Checkout/Payments
  - [ ] Stripe integration
  - [ ] Purchase history tracking
  - [ ] Account balance updates

## Phase 3: Board/Admin Tools

- [ ] Member Management
  - [ ] Edit member profiles
  - [ ] Deactivate/reactivate members
  - [ ] Role assignment
- [ ] Schedule Editing
  - [ ] Create board schedule editor (`/board-portal/schedule`)
  - [ ] Edit club hours/schedules
- [ ] Stats Dashboard
  - [ ] Real analytics from DB
  - [ ] Check-in trends
  - [ ] Reservation analytics
- [ ] Job Applications
  - [ ] Create applications page (`/board-portal/applications`)
  - [ ] View/manage submitted applications
  - [ ] Application status tracking

## Phase 4: Polish & Notifications

- [ ] Toast Notifications
  - [ ] Add Sonner toast for success/error feedback
  - [ ] Consistent notification patterns
- [ ] Email Confirmations
  - [ ] Reservation confirmation emails
  - [ ] Registration confirmation emails
  - [ ] Password reset emails
- [ ] Mobile Optimization
  - [ ] Tennis court reservation mobile sorting
  - [ ] Responsive improvements

---

## Legacy Checklist (Original Items)

### About
- [ ] Event Schedule
  - [ ] Add Event
  - [ ] Remove Event
  - [ ] Edit Event
  - [ ] Permissions
  - [x] UI
  - [x] Sorting
  - [x] Registration
- [x] History
- [x] Overview

### Swim
- [ ] Lisa's Bio
- [ ] Instruction
  - [ ] Registration
  - [x] UI
- [ ] Swim & Dive Team Info
  - [ ] UI
  - [ ] Registration
- [ ] Lap swim reservation
  - [ ] Permissions
  - [x] Block creation
  - [x] Scheduling creation
  - [x] Reservation options
  - [x] UI
  - [x] Sorting
- [x] Private lessons
  - [x] Registration
  - [x] UI
- [x] Schedule
- [x] Hours & rules

### Tennis
- [ ] Hours & rules
- [ ] Schedule
- [ ] Court reservations (sortable by time for mobile)
- [ ] Instruction
- [ ] Private lessons
- [ ] Greg bio

### Contact
- [ ] Contact us

### Employment
- [ ] Staff
- [ ] Apply

### Become a Member
- [ ] Info

### Shop
- [ ] Guest Passes
- [ ] Cart

### Member Portal
- [ ] Edit household
- [ ] Party booking
- [ ] Event Schedule
- [ ] Member Directory
- [ ] Account Balances
- [ ] Guests
- [ ] Purchase History
- [ ] # of Passes

### Board Member Portal
- [ ] Check-in
- [ ] Reservation booking
- [ ] Check-in stats
- [ ] Schedule Editing
- [ ] Text Editing
