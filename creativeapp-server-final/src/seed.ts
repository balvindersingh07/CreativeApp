import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tanvi = await prisma.creator.create({
    data: { name: 'Tanvi', businessName: 'Tanvi Candles', city: 'Delhi', pincode: '110001', category: 'Candles', priceRange: '₹300-₹1200', phone: '+91-90000', email: 'tanvi@example.com' }
  });
  const aarav = await prisma.creator.create({
    data: { name: 'Aarav', businessName: 'Aarav Art', city: 'Mumbai', pincode: '400001', category: 'Painting', priceRange: '₹1000-₹5000', phone: '+91-91111', email: 'aarav@example.com' }
  });

  const bazaar = await prisma.event.create({
    data: { title: 'Diwali Craft Bazaar', organizer: 'City Council', city: 'Delhi', startDate: new Date('2025-11-06'), endDate: new Date('2025-11-08'), fee: 1500, tagsJson: JSON.stringify(['Candles','Decor']), applyLink:'https://example.com/apply', contact:'+91-80000' }
  });
  const flea = await prisma.event.create({
    data: { title: 'Weekend Flea', organizer: 'MktHub', city: 'Mumbai', startDate: new Date('2025-11-15'), endDate: new Date('2025-11-16'), fee: 2000, tagsJson: JSON.stringify(['Painting','Jewellery']), applyLink:'https://example.com/mumbai', contact:'+91-82222' }
  });

  console.log('✅ Seeded creators & events:', { creators: [tanvi.id, aarav.id], events: [bazaar.id, flea.id] });
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });