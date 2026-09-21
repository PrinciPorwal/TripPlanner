import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trip from '../models/Trip.js';
import Activity from '../models/Activity.js';
import Expense from '../models/Expense.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log('[Seeder] Clearing existing data...');
    await Trip.deleteMany({});
    await Activity.deleteMany({});
    await Expense.deleteMany({});

    console.log('[Seeder] Creating trips...');

    // 1. Japan Tour
    const japanTrip = await Trip.create({
      title: 'Japan Cherry Blossom & Heritage Tour',
      startDate: new Date('2026-04-05'),
      endDate: new Date('2026-04-14'),
      travelers: 2,
      currency: 'USD',
      budget: 4200,
      destinations: ['Tokyo', 'Kyoto', 'Osaka'],
    });

    await Activity.create([
      {
        tripId: japanTrip._id,
        title: 'Check-in at Shinjuku Granbell Hotel',
        type: 'Hotel',
        date: '2026-04-05',
        startTime: '14:00',
        endTime: '15:00',
        location: 'Shinjuku, Tokyo',
        cost: 0,
        notes: 'Reservation #JP-98213 with panoramic city view',
      },
      {
        tripId: japanTrip._id,
        title: 'Dinner at Omoide Yokocho',
        type: 'Restaurant',
        date: '2026-04-05',
        startTime: '18:30',
        endTime: '20:30',
        location: 'Shinjuku, Tokyo',
        cost: 45,
        notes: 'Famous lantern-lit yakitori alleyway',
      },
      {
        tripId: japanTrip._id,
        title: 'Senso-ji Temple & Asakusa Cultural Walk',
        type: 'Attraction',
        date: '2026-04-06',
        startTime: '09:00',
        endTime: '11:30',
        location: 'Asakusa, Tokyo',
        cost: 0,
        notes: 'Historic temple grounds, incense pavilion, and Nakamise street',
      },
      {
        tripId: japanTrip._id,
        title: 'Shibuya Sky Observation Deck',
        type: 'Attraction',
        date: '2026-04-06',
        startTime: '16:00',
        endTime: '18:00',
        location: 'Shibuya, Tokyo',
        cost: 38,
        notes: '360-degree open-air rooftop view over Shibuya Scramble at sunset',
      },
      {
        tripId: japanTrip._id,
        title: 'Shinkansen Bullet Train to Kyoto',
        type: 'Transport',
        date: '2026-04-07',
        startTime: '08:30',
        endTime: '11:00',
        location: 'Tokyo Station -> Kyoto Station',
        cost: 160,
        notes: 'Nozomi Express, Mt. Fuji view on right-hand side',
      },
      {
        tripId: japanTrip._id,
        title: 'Fushimi Inari Torii Gates Twilight Hike',
        type: 'Attraction',
        date: '2026-04-07',
        startTime: '14:30',
        endTime: '17:30',
        location: 'Fushimi Ward, Kyoto',
        cost: 0,
        notes: 'Walk through thousands of vermilion torii gates up Mount Inari',
      },
      {
        tripId: japanTrip._id,
        title: 'Arashiyama Bamboo Grove & Sagano Romantic Train',
        type: 'Attraction',
        date: '2026-04-08',
        startTime: '08:30',
        endTime: '12:00',
        location: 'Arashiyama, Kyoto',
        cost: 24,
        notes: 'Early morning bamboo stroll followed by scenic gorge railway',
      },
      {
        tripId: japanTrip._id,
        title: 'Traditional Gion Kaiseki Multi-Course Dinner',
        type: 'Restaurant',
        date: '2026-04-08',
        startTime: '19:00',
        endTime: '21:30',
        location: 'Gion, Kyoto',
        cost: 180,
        notes: 'Authentic Kyoto seasonal tasting menu in historic preservation district',
      },
    ]);

    await Expense.create([
      {
        tripId: japanTrip._id,
        title: 'Shinjuku Granbell Hotel (3 Nights)',
        category: 'Accommodation',
        amount: 540,
        date: '2026-04-05',
        notes: 'Tokyo base lodging',
      },
      {
        tripId: japanTrip._id,
        title: 'Yakitori Dinner Day 1',
        category: 'Food',
        amount: 45,
        date: '2026-04-05',
        notes: 'Dinner for two',
      },
      {
        tripId: japanTrip._id,
        title: 'Suica Transit Cards Recharge',
        category: 'Transport',
        amount: 60,
        date: '2026-04-06',
        notes: 'Subway passes for Tokyo Metro',
      },
      {
        tripId: japanTrip._id,
        title: 'Shibuya Sky Deck Admission (2 Pax)',
        category: 'Activities',
        amount: 38,
        date: '2026-04-06',
        notes: 'Online twilight tickets',
      },
      {
        tripId: japanTrip._id,
        title: 'Tokyo to Kyoto Shinkansen Bullet Train',
        category: 'Transport',
        amount: 160,
        date: '2026-04-07',
        notes: 'Reserved window seats',
      },
      {
        tripId: japanTrip._id,
        title: 'Kyoto Machiya Heritage Townhouse (3 Nights)',
        category: 'Accommodation',
        amount: 620,
        date: '2026-04-07',
        notes: 'Traditional wooden architecture with tatami & garden',
      },
      {
        tripId: japanTrip._id,
        title: 'Gion Kaiseki Dinner Experience',
        category: 'Food',
        amount: 180,
        date: '2026-04-08',
        notes: 'Special anniversary dinner',
      },
      {
        tripId: japanTrip._id,
        title: 'Handmade Kyoto Ceramics & Uji Matcha',
        category: 'Shopping',
        amount: 110,
        date: '2026-04-08',
        notes: 'Souvenirs from Ninenzaka stone path',
      },
    ]);

    // 2. Amalfi Coast Roadtrip
    const amalfiTrip = await Trip.create({
      title: 'Amalfi Coast & Capri Sun Voyage',
      startDate: new Date('2026-06-12'),
      endDate: new Date('2026-06-19'),
      travelers: 2,
      currency: 'EUR',
      budget: 3500,
      destinations: ['Positano', 'Amalfi', 'Capri', 'Ravello'],
    });

    await Activity.create([
      {
        tripId: amalfiTrip._id,
        title: 'Cliffside Villa Check-in',
        type: 'Hotel',
        date: '2026-06-12',
        startTime: '15:00',
        endTime: '16:00',
        location: 'Positano, Italy',
        cost: 0,
        notes: 'Balcony overlooking Spiaggia Grande',
      },
      {
        tripId: amalfiTrip._id,
        title: 'Sunset Aperitivo at Franco’s Bar',
        type: 'Restaurant',
        date: '2026-06-12',
        startTime: '18:30',
        endTime: '20:30',
        location: 'Positano, Italy',
        cost: 65,
        notes: 'Iconic yellow ceramic bar with sea horizon view',
      },
      {
        tripId: amalfiTrip._id,
        title: 'Path of the Gods (Sentiero degli Dei) Trek',
        type: 'Attraction',
        date: '2026-06-13',
        startTime: '08:00',
        endTime: '13:00',
        location: 'Bomerano to Nocelle',
        cost: 0,
        notes: 'Panoramic clifftop coastal hiking trail',
      },
      {
        tripId: amalfiTrip._id,
        title: 'Capri Private Gozzo Boat & Faraglioni Rocks',
        type: 'Transport',
        date: '2026-06-14',
        startTime: '09:30',
        endTime: '16:00',
        location: 'Capri Marina Grande',
        cost: 320,
        notes: 'Full day boat with snorkeling around Blue Grotto',
      },
    ]);

    await Expense.create([
      {
        tripId: amalfiTrip._id,
        title: 'Positano Cliffside Villa (4 Nights)',
        category: 'Accommodation',
        amount: 1350,
        date: '2026-06-12',
        notes: 'Boutique stay',
      },
      {
        tripId: amalfiTrip._id,
        title: 'Franco’s Bar Aperitivo & Tapas',
        category: 'Food',
        amount: 65,
        date: '2026-06-12',
        notes: 'Cocktails and bruschetta',
      },
      {
        tripId: amalfiTrip._id,
        title: 'Capri Gozzo Boat Charter',
        category: 'Activities',
        amount: 320,
        date: '2026-06-14',
        notes: 'Skipper and fuel included',
      },
      {
        tripId: amalfiTrip._id,
        title: 'Salerno to Positano Ferry Tickets',
        category: 'Transport',
        amount: 48,
        date: '2026-06-12',
        notes: 'High speed hydrofoil transfer',
      },
    ]);

    // 3. Swiss Alps Explorer
    const swissTrip = await Trip.create({
      title: 'Swiss Alps Summer Trek & Peaks',
      startDate: new Date('2026-07-20'),
      endDate: new Date('2026-07-26'),
      travelers: 1,
      currency: 'CHF',
      budget: 2200,
      destinations: ['Zermatt', 'Grindelwald', 'Interlaken'],
    });

    await Activity.create([
      {
        tripId: swissTrip._id,
        title: 'Gornergrat Cogwheel Train to Matterhorn View',
        type: 'Attraction',
        date: '2026-07-21',
        startTime: '09:00',
        endTime: '13:00',
        location: 'Zermatt, Switzerland',
        cost: 110,
        notes: 'Mirror reflection at Riffelsee lake',
      },
      {
        tripId: swissTrip._id,
        title: 'Traditional Swiss Fondue & Wine',
        type: 'Restaurant',
        date: '2026-07-21',
        startTime: '19:00',
        endTime: '21:00',
        location: 'Zermatt Village',
        cost: 55,
        notes: 'Gruyère & Emmental blend',
      },
    ]);

    await Expense.create([
      {
        tripId: swissTrip._id,
        title: 'Swiss Half Fare Travel Card',
        category: 'Transport',
        amount: 120,
        date: '2026-07-20',
        notes: '50% discount on all Swiss trains & cable cars',
      },
      {
        tripId: swissTrip._id,
        title: 'Zermatt Mountain Lodge (3 Nights)',
        category: 'Accommodation',
        amount: 480,
        date: '2026-07-20',
        notes: 'Alpine view room',
      },
      {
        tripId: swissTrip._id,
        title: 'Gornergrat Railway Pass',
        category: 'Activities',
        amount: 110,
        date: '2026-07-21',
        notes: 'Scenic mountain rail',
      },
    ]);

    console.log('[Seeder] Successfully seeded database with 3 rich travel itineraries!');
  } catch (error) {
    console.error('[Seeder] Error seeding database:', error);
  }
};

// If executed directly from command line
if (process.argv[1]?.endsWith('seedData.js')) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      await seedDatabase();
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
