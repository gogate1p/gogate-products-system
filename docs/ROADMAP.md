# Implementation roadmap

## Phase 1 — Foundation (current)

- [x] Monorepo on `D:\Gogate Products`
- [x] Prisma schema
- [x] API skeleton (auth, orders, products, sellers, shipments, hubs)
- [x] Portal scaffolds
- [ ] `npm install` + Prisma migrate on your machine
- [ ] Seed admin user

## Phase 2 — Seller & catalog

- [ ] Full seller onboarding UI (steps + document upload + Didit)
- [ ] Product media upload + white-background validation
- [ ] Admin product approval queue
- [ ] Customer PDP tabs (specs, manufacturer, reviews)

## Phase 3 — Checkout & payments

- [ ] Cart, checkout, address book
- [ ] Razorpay / PayU / Easebuzz live SDKs + webhooks
- [ ] Wallet ledger
- [ ] Coupons

## Phase 4 — Orders & support

- [ ] My orders UI wired to API tracking
- [ ] Cancel / return / replace rules per line item
- [ ] Support tickets + live chat
- [ ] Wishlist

## Phase 5 — Logistics

- [ ] Shiprocket, Nimbuspost, Shipday, Zippykind, Deliforce adapters
- [ ] Gogate hub routing + leg planner
- [ ] Hub portal scans + vehicle module
- [ ] Tracking portal live AWB lookup
- [ ] Delivery agent Expo app

## Phase 6 — Production

- [ ] DNS for gogateproducts.store subdomains
- [ ] TLS, CI/CD, monitoring
- [ ] Mobile apps (customer + seller optional)
