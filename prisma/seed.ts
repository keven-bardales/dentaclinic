import { ro } from "@faker-js/faker";

const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const { bcryptAdapter } = require("./../src/features/common/adapters/bcryptjs.adapter");
const db = new PrismaClient();

const main = async () => {
  try {
    await db.userRoles.deleteMany();
    await db.user.deleteMany();
    await db.rolePermissions.deleteMany();
    await db.role.deleteMany();
    await db.modulePermission.deleteMany();
    await db.module.deleteMany();

    await db.module.createMany({
      data: [
        {
          name: "Pacientes",
          description: "Patients module",
        },
        {
          name: "Citas",
          description: "Appointments module",
        },
      ],
      skipDuplicates: true,
    });

    const createdModules = await db.module.findMany();

    createdModules.forEach(async (module: any) => {
      await db.modulePermission.createMany({
        data: [
          {
            moduleId: module.id,
            name: "Crear",
          },
          {
            moduleId: module.id,
            name: "Editar",
          },
          {
            moduleId: module.id,
            name: "Eliminar",
          },
          {
            moduleId: module.id,
            name: "Ver",
          },
        ],
      });
    });

    const modulePermissions = await db.modulePermission.findMany();

    await db.role.createMany({
      data: [
        {
          name: "Admin",
          description: "Administrator",
        },
        {
          name: "SuperAdmin",
          description: "User",
        },
      ],
    });

    const roles = await db.role.findMany();

    modulePermissions.forEach(async (modulePermission: any) => {
      roles.forEach(async (role: any) => {
        await db.rolePermissions.create({
          data: {
            rolId: role.id,
            modulePermissionId: modulePermission.id,
          },
        });
      });
    });

    await db.user.createMany({
      data: [
        {
          email: "admin@admin.com",
          emailVerified: new Date(),
          image: faker.image.avatar(),
          name: faker.person.firstName("male"),
          password: await bcryptAdapter.hash("123456"),
        },
        {
          email: faker.internet.email(),
          emailVerified: new Date(),
          image: faker.image.avatar(),
          name: faker.person.firstName(),
          password: await bcryptAdapter.hash("123456"),
        },
        {
          email: "keven.bardales@gmail.com",
          name: "Keven Bardales",
          password: await bcryptAdapter.hash("123456"),
        },
      ],
    });

    const users = await db.user.findMany();

    roles.forEach(async (role: any) => {
      users.forEach(async (user: any) => {
        await db.userRoles.create({
          data: {
            userId: user.id,
            roleId: role.id,
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = main;

main().catch((e) => {});
