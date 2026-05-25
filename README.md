# Gogate Products

Full-stack **ecommerce marketplace** + **courier / hub logistics** platform for [gogateproducts.store](https://gogateproducts.store).

Location: `D:\Gogate Products`

## Portals

| App | Port | URL (local) | Role |
|-----|------|-------------|------|
| customer-web | 3000 | http://localhost:3000 | Storefront, account, orders, wallet, wishlist, support |
| admin-web | 3001 | http://localhost:3001 | Main admin — sellers, customers, CMS, API keys, courier CMS |
| seller-web | 3002 | http://localhost:3002 | Seller KYC, products, order buckets, courier booking |
| hub-portal | 3003 | http://localhost:3003 | Hub manager — agents, scans, vehicles |
| tracking-portal | 3004 | http://localhost:3004 | Public shipment tracking |
| api | 4000 | http://localhost:4000/api/v1 | REST API |
| delivery-agent | — | Mobile (Expo) | Agent app — QR, COD, hub report |

## Quick start (PowerShell)

```powershell
cd "D:\Gogate Products"
.\scripts\setup.ps1
```

Then:

```powershell
# Terminal 1 — database
docker compose -f infrastructure/docker/docker-compose.yml up -d

# Terminal 2 — API
npm run dev:api

# Terminal 3 — storefront
npm run dev -w @gogate/customer-web
```

Copy `.env.example` to `.env` and set `DATABASE_URL`, payment and courier keys.

## Monorepo layout

```
apps/
  api/                 NestJS API
  customer-web/        Next.js shop
  admin-web/           Next.js admin
  seller-web/          Next.js seller
  hub-portal/          Next.js hub
  tracking-portal/     Next.js tracking
  delivery-agent/      Mobile (Expo — see README)
packages/
  database/            Prisma schema (PostgreSQL)
  shared/              Order IDs, tracking steps
  integrations/        Razorpay, PayU, Easebuzz, couriers
```

## Implemented in v0.1 (foundation)

- PostgreSQL data model: users, sellers, customers, hubs, agents, products, orders (12-digit ID), payments, shipments, CMS, wallets, tickets
- Auth register/login (seller & customer)
- Product list/approve flow API + seed (mangoes, cashews, dry mango)
- Order tracking steps (Ordered → Shipped → OFD → Delivered)
- Seller order buckets & accept/reject
- Shipment booking + tracking portal (BOOKED → IN_TRANSIT → OFD → DELIVERED)
- Hub create/activate · delivery agent signup/approve
- Admin API: sellers, customers, orders, payments, coupons, API keys, stats
- CMS banners/sliders · pincode serviceability · store pickup & hyperlocal flags
- Support tickets + chat session stub
- Payment/courier adapter stubs (Razorpay, PayU, Easebuzz, Gogate + partners)
- All portal UIs scaffolded (customer shop, admin, seller, hub, tracking, delivery agent app)

### Default seed login

After `npm run db:seed`:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gogateproducts.store | Admin@123 |
| Seller | seller@gogateproducts.store | Admin@123 |

## Domain mapping (production)

| Subdomain | App |
|-----------|-----|
| gogateproducts.store | customer-web |
| admin.gogateproducts.store | admin-web |
| seller.gogateproducts.store | seller-web |
| hub.gogateproducts.store | hub-portal |
| track.gogateproducts.store | tracking-portal |

## Docs

- [Architecture](./docs/ARCHITECTURE.md)
- [Roadmap](./docs/ROADMAP.md)
