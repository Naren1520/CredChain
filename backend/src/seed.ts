import dotenv from 'dotenv';
import prisma from './prisma';
import bcrypt from 'bcrypt';

dotenv.config();

async function main(){
  // create demo student
  const student = await prisma.student.upsert({
    where: { seid: 'SEID123' },
    update: {},
    create: { seid: 'SEID123', name: 'Demo Student', dob: new Date('2000-01-01'), email: 'student@example.com' }
  });

  const inst = await prisma.institution.upsert({
    where: { govtRegNo: 'GOVT-001' },
    update: {},
    create: { name: 'Demo Institute', govtRegNo: 'GOVT-001', status: 'APPROVED', wallet: '' }
  });

  const pw = await bcrypt.hash('password123', 10);
  await prisma.institutionUser.upsert({
    where: { email: 'officer@demo.org' },
    update: {},
    create: { institutionId: inst.id, role: 'INSTITUTION_ADMIN', name: 'Admin User', email: 'officer@demo.org', passwordHash: pw }
  });

  console.log('Seed complete');
}

main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
