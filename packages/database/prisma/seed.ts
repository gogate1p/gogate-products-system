import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gogateproducts.store' },
    update: {},
    create: {
      email: 'admin@gogateproducts.store',
      passwordHash,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  });

  const sellerUser = await prisma.user.upsert({
    where: { email: 'seller@gogateproducts.store' },
    update: {},
    create: {
      email: 'seller@gogateproducts.store',
      passwordHash,
      role: 'SELLER',
      status: 'ACTIVE',
    },
  });

  const seller = await prisma.sellerProfile.upsert({
    where: { userId: sellerUser.id },
    update: { kycStatus: 'VERIFIED', verifiedAt: new Date() },
    create: {
      userId: sellerUser.id,
      sellerId: 'GP-SELLER-00001',
      businessName: 'Gogate Farms',
      ownerName: 'Gogate Family',
      address: 'Ratnagiri, Maharashtra',
      pincode: '415612',
      kycStatus: 'VERIFIED',
      verifiedAt: new Date(),
      ratingAvg: 4.8,
      ratingCount: 120,
    },
  });

  const products = [
    {
      title: 'Alphonso Mangoes — Premium 1kg',
      description:
        'Hand-picked Ratnagiri Alphonso mangoes. Naturally ripened, no carbide. Perfect for gifting.',
      price: 899,
      weightGrams: 1000,
      lengthCm: 20,
      breadthCm: 15,
      heightCm: 10,
      manufacturer: 'Gogate Farms',
      packerDetails: 'Packed at source in ventilated crates',
      image: 'https://images.unsplash.com/photo-1559188197-4f761a469ab2?w=600',
    },
    {
      title: 'Cashew W320 — Roasted 500g',
      description: 'Premium W320 whole cashews, lightly roasted. Rich, buttery flavour.',
      price: 649,
      weightGrams: 500,
      lengthCm: 18,
      breadthCm: 12,
      heightCm: 8,
      manufacturer: 'Gogate Products',
      packerDetails: 'Vacuum sealed pouch, FSSAI compliant',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600',
    },
    {
      title: 'Dry Mango Slices — 250g',
      description: 'Sun-dried mango slices without added sugar. Snack and trail mix favourite.',
      price: 299,
      weightGrams: 250,
      lengthCm: 15,
      breadthCm: 10,
      heightCm: 5,
      manufacturer: 'Gogate Farms',
      packerDetails: 'Resealable pouch',
      image: 'https://images.unsplash.com/photo-1605027990121-c736e0e0e2ec?w=600',
    },
  ];

  for (const p of products) {
    const existing = await prisma.product.findFirst({
      where: { sellerId: seller.id, title: p.title },
    });
    if (existing) continue;
    await prisma.product.create({
      data: {
        sellerId: seller.id,
        title: p.title,
        description: p.description,
        price: p.price,
        weightGrams: p.weightGrams,
        lengthCm: p.lengthCm,
        breadthCm: p.breadthCm,
        heightCm: p.heightCm,
        manufacturer: p.manufacturer,
        packerDetails: p.packerDetails,
        returnable: true,
        cancellable: true,
        replaceable: false,
        approvalStatus: 'APPROVED',
        approvedAt: new Date(),
        approvedBy: admin.id,
        aiVerified: true,
        images: {
          create: [{ url: p.image, type: 'IMAGE', whiteBgOk: true, sortOrder: 0 }],
        },
      },
    });
  }

  await prisma.cmsBanner.deleteMany();
  await prisma.cmsBanner.createMany({
    data: [
      {
        title: 'Alphonso Season',
        imageUrl: 'https://images.unsplash.com/photo-1559188197-4f761a469ab2?w=1200',
        linkUrl: '/',
        sortOrder: 0,
      },
      {
        title: 'Premium Cashews',
        imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200',
        linkUrl: '/',
        sortOrder: 1,
      },
    ],
  });

  const sliderCount = await prisma.cmsSlider.count();
  if (sliderCount === 0) {
    await prisma.cmsSlider.create({
      data: {
        title: 'Home Hero',
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1559188197-4f761a469ab2?w=1400',
            caption: 'Farm-fresh mangoes from Ratnagiri',
            link: '/',
          },
          {
            image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1400',
            caption: 'Handpicked cashews — W320 grade',
            link: '/',
          },
        ],
        active: true,
      },
    });
  }

  const hub = await prisma.hub.upsert({
    where: { hubId: 'GP-HUB-00001' },
    update: { status: 'ACTIVE', activatedAt: new Date() },
    create: {
      hubId: 'GP-HUB-00001',
      name: 'Ratnagiri Central Hub',
      address: 'Main Road, Ratnagiri',
      pincode: '415612',
      radiusKm: 25,
      email: 'hub@gogateproducts.store',
      phone: '9876543210',
      status: 'ACTIVE',
      kycStatus: 'VERIFIED',
      activatedAt: new Date(),
    },
  });

  await prisma.pincodeServiceability.upsert({
    where: { pincode_provider: { pincode: '415612', provider: 'GOGATE' } },
    update: {},
    create: { pincode: '415612', provider: 'GOGATE', available: true, etaDays: 2 },
  });

  console.log('Seed complete:', {
    admin: admin.email,
    seller: seller.sellerId,
    hub: hub.hubId,
    password: 'Admin@123',
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
