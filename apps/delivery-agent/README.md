# Gogate Delivery Agent App

Mobile app (recommended: **React Native + Expo**) for delivery agents.

## Features (spec)

- Self signup → personal KYC → Didit CKYC → admin activation → hub allotment
- Daily working time slot selection
- Hub QR scan on arrival
- COD: generate gogateproducts.store payment QR; on pay, shipment COD flag updates (order stays out for delivery until hub report)
- Submit end-of-day hub report → then shipment/order marked **Delivered**

## Bootstrap (when ready)

```powershell
cd "D:\Gogate Products\apps\delivery-agent"
npx create-expo-app@latest . --template blank-typescript
```

API base: `http://localhost:4000/api/v1`
