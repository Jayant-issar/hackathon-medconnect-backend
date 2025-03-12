import { PrismaClient } from '@prisma/client'
import { dummyHospitals, dummyBloodBanks } from './dummyData' // your existing data

const prisma = new PrismaClient()

async function main() {
  try {
    // Clear existing data
    await prisma.bedInformation.deleteMany()
    await prisma.bloodInventory.deleteMany()
    await prisma.hospital.deleteMany()
    await prisma.bloodBank.deleteMany()

    console.log('🗑️ Cleaned up existing data')

    // Seed Hospitals
    for (const hospitalData of dummyHospitals) {
      const hospital = await prisma.hospital.create({
        data: {
          name: hospitalData.name,
          address: hospitalData.address,
          phone: hospitalData.phone,
          latitude: hospitalData.location.lat,
          longitude: hospitalData.location.lng,
        },
      })

      // Create bed information for each hospital
      for (const bed of hospitalData.beds) {
        const bedInfo = await prisma.bedInformation.create({
          data: {
            type: bed.type as any, // Converting string to enum
            available: bed.available,
            total: bed.total,
            Hospital: {
              connect: {
                id: hospital.id
              }
            }
          }
        })
      }

      console.log(`✅ Created hospital: ${hospital.name}`)
    }

    // Seed Blood Banks
    for (const bankData of dummyBloodBanks) {
      const bloodBank = await prisma.bloodBank.create({
        data: {
          name: bankData.name,
          address: bankData.address,
          phone: bankData.phone,
          latitude: bankData.location.lat,
          longitude: bankData.location.lng,
        },
      })

      // Create inventory for each blood bank
      for (const inv of bankData.inventory) {
        const inventory = await prisma.bloodInventory.create({
          data: {
            bloodGroup: convertBloodGroup(inv.bloodGroup),
            units: inv.units,
            BloodBank: {
              connect: {
                id: bloodBank.id
              }
            }
          }
        })
      }

      console.log(`✅ Created blood bank: ${bloodBank.name}`)
    }

    // Create a default admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: 'hashed_password_here', // Remember to hash this in production!
        name: 'Admin User',
        role: 'ADMIN'
      }
    })

    console.log('✅ Created admin user')

  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Helper function to convert blood group strings to enum values
function convertBloodGroup(group: string): any {
  const mapping: { [key: string]: string } = {
    'A+': 'A_POSITIVE',
    'A-': 'A_NEGATIVE',
    'B+': 'B_POSITIVE',
    'B-': 'B_NEGATIVE',
    'AB+': 'AB_POSITIVE',
    'AB-': 'AB_NEGATIVE',
    'O+': 'O_POSITIVE',
    'O-': 'O_NEGATIVE'
  }
  return mapping[group]
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })