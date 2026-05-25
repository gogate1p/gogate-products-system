# Gogate Products — Portal guide

## Sites & apps

| Portal | Local port | Production subdomain |
|--------|------------|----------------------|
| Customer shop (mangoes, cashews) | 3000 | gogateproducts.store |
| Main admin (ecommerce + keys) | 3001 | admin.gogateproducts.store |
| Seller portal | 3002 | seller.gogateproducts.store |
| Hub portal | 3003 | hub.gogateproducts.store |
| Courier tracking | 3004 | track.gogateproducts.store |
| REST API | 4000 | api.gogateproducts.store |
| Delivery agent (Expo) | Expo | mobile app |

## Customer shop

- Header: **Gogate Products**, banners/slider from CMS
- Product grid (admin-approved images)
- PDP: description, specs, manufacturer/packer, seller + delivery ratings, 5-star reviews
- Pincode check: Gogate Courier + Shiprocket + partners, store pickup, hyperlocal
- Account: orders (12-digit ID, tracking timeline), wallet, address, profile, wishlist, store pickups, support tickets, live chat stub
- Cancel / return / replace on eligible line items only

## Seller portal

1. Signup → login → dashboard
2. KYC: personal → business → documents → bank → Didit CKYC → admin verify
3. Products: white-bg media, dimensions, return flags → pending approval
4. Orders: NEW → … → DELIVERED buckets; accept/reject; SLA; courier book by pincode
5. Passbook, subscription, reviews, support, profile (seller ID, logout)

## Main admin

- Sellers: create, verify, CKYC, disable
- Customers: create, enable/disable
- Orders, payments (view/create), coupons
- CMS: banners, sliders, pages (site + mobile content)
- API keys: Razorpay, PayU, Easebuzz, Shiprocket, Nimbuspost, Shipday, Zippykind, Deliforce, Gogate Courier, GMaps, Didit
- Courier CMS: hubs, shipments, rate calculator, vehicles
- Delivery agents: approve, hub assign
- Support users & tickets

## Courier / hub / agent

- **Route:** seller pickup → seller hub → hub → hub → customer hub → last mile
- Tracking: Shipment Booked → In Transit → Out for Delivery → Delivered + event table
- COD: agent QR on gogateproducts.store; `codCollected` on pay; order stays OFD until hub report
- `confirm-delivery` marks order Delivered and clears interim customer “delivery update”
- Hub: radius, manager, Didit KYC, scans, vehicles/trucks
- Agent: self-signup, KYC, slots, hub QR check-in
