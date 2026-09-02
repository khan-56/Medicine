import { AppDataSource } from './data-source';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';
import { Medicine } from './entities/medicine.entity';
import { Pharmacy } from './entities/pharmacy.entity';
import { PriceRecord } from './entities/price_record.entity';

async function run() {
  await AppDataSource.initialize();
  console.log('DataSource initialized');

  const userRepo = AppDataSource.getRepository(User);
  const compRepo = AppDataSource.getRepository(Company);
  const medRepo = AppDataSource.getRepository(Medicine);
  const pharmRepo = AppDataSource.getRepository(Pharmacy);
  const prRepo = AppDataSource.getRepository(PriceRecord);

  const adminEmail = 'admin@example.com';
  let admin = await userRepo.findOneBy({ email: adminEmail });
  if (!admin) {
    const hashed = await bcrypt.hash('password123', 10);
    admin = userRepo.create({ email: adminEmail, password: hashed, name: 'Admin', role: 'admin' });
    await userRepo.save(admin);
    console.log('Admin created:', adminEmail, 'password: password123');
  }

  const c1 = compRepo.create({ name_en: 'Square Pharmaceuticals', name_bn: 'স্কয়ার ফার্মা', website: 'https://squarepharma.com.bd' });
  const c2 = compRepo.create({ name_en: 'Beximco Pharmaceuticals', name_bn: 'বেক্সিমকো ফার্মা', website: 'https://beximco.com' });
  await compRepo.save([c1, c2]);
  console.log('Companies seeded');

  const m1 = medRepo.create({
    name_en: 'Paracetamol 500mg Tablet',
    name_bn: 'প্যারাসিটামল ৫০০মিগ্রা ট্যাবলেট',
    generic_name: 'Paracetamol',
    brand_name: 'Acme Paracetamol',
    form: 'tablet',
    strength: '500 mg',
    indications: ['Fever', 'Pain'],
    composition: [{ ingredient: 'Paracetamol', amount: '500 mg' }],
    regulatory_status: { registered: true, dgda_no: 'DGDA-0001' },
    company: c1,
  });
  const m2 = medRepo.create({
    name_en: 'Amoxicillin 500mg Capsule',
    name_bn: 'অ্যামক্সিসিলিন ৫০০মিগ্রা ক্যাপসুল',
    generic_name: 'Amoxicillin',
    brand_name: 'Bexo Amox',
    form: 'capsule',
    strength: '500 mg',
    indications: ['Bacterial infections'],
    composition: [{ ingredient: 'Amoxicillin', amount: '500 mg' }],
    regulatory_status: { registered: true, dgda_no: 'DGDA-0002' },
    company: c2,
  });
  await medRepo.save([m1, m2]);
  console.log('Medicines seeded');

  const p1 = pharmRepo.create({ name: 'Dhaka Pharmacy', address: 'Dhanmondi, Dhaka', phone: '01710000000', lat: 23.7465, lon: 90.3760 });
  const p2 = pharmRepo.create({ name: 'Gulshan Pharmacy', address: 'Gulshan, Dhaka', phone: '01710000001', lat: 23.7925, lon: 90.4078 });
  await pharmRepo.save([p1, p2]);
  console.log('Pharmacies seeded');

  const pr1 = prRepo.create({ medicine: m1 as any, pharmacy: p1 as any, price: 25, unit: 'per tablet', source_type: 'pharmacy', verified: true });
  const pr2 = prRepo.create({ medicine: m1 as any, pharmacy: p2 as any, price: 27, unit: 'per tablet', source_type: 'user', verified: false });
  const pr3 = prRepo.create({ medicine: m2 as any, pharmacy: p1 as any, price: 120, unit: 'per strip', source_type: 'pharmacy', verified: true });
  await prRepo.save([pr1, pr2, pr3]);
  console.log('Price records seeded');

  console.log('Seeding complete');
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed error', err);
  process.exit(1);
});
