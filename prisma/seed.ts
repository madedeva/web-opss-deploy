import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const role1 = await prisma.role.upsert({
    where: { id: 4 },
    update: {},
    create: {
        id: 4,
        name: 'Administrator',
    },
  })
  const role2 = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
        id: 3,
        name: 'Reviewer',
    },
  })
  const role3 = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
        id: 2,
        name: 'Operator',
    },
  })
  const role4 = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        name: 'Author',
    },
  })

  const alice = await prisma.user.upsert({
    where: { email: 'author@gmail.com' },
    update: {},
    create: {
        email: 'author@gmail.com',
        name: 'Alice',
        password: '$2a$12$Yl92UEMTOhiQogjKk3xNZeePogmgqirQn222bfnbACSiRy9yW7exy', // = password
        roleId: 1
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'reviewer@gmail.com' },
    update: {},
    create: {
        email: 'reviewer@gmail.com',
        name: 'Bob',
        password: '$2a$12$Yl92UEMTOhiQogjKk3xNZeePogmgqirQn222bfnbACSiRy9yW7exy', // = password
        roleId: 3
    },
  })
  const eve = await prisma.user.upsert({
    where: { email: 'operator@gmail.com' },
    update: {},
    create: {
        email: 'operator@gmail.com',
        name: 'Eve',
        password: '$2a$12$Yl92UEMTOhiQogjKk3xNZeePogmgqirQn222bfnbACSiRy9yW7exy', // = password
        roleId: 2
    },
  })
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
        email: 'admin@gmail.com',
        name: 'Admin',
        password: '$2a$12$Yl92UEMTOhiQogjKk3xNZeePogmgqirQn222bfnbACSiRy9yW7exy', // = password
        roleId: 4
    },
  })
  console.log({ alice, bob, eve })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    // process.exit(1)
  })