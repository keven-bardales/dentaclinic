import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const main = async () => {
  try {
    await db.module.createMany({
      data: [
        {
          id: 1,
          name: "Pacientes",
          description: "Patients module",
        },
        {
          id: 2,
          name: "Agenda",
          description: "Agenda module",
        },
      ],
      skipDuplicates: true,
    });

    await db.modulePermission.createMany({
      data: [
        {
          moduleId: 1,
          name: "Crear pacientes",
        },
        {
          moduleId: 1,
          name: "Editar pacientes",
        },
        {
          moduleId: 1,
          name: "Eliminar pacientes",
        },
        {
          moduleId: 1,
          name: "Ver pacientes",
        },
        {
          moduleId: 2,
          name: "Crear citas",
        },
        {
          moduleId: 2,
          name: "Editar citas",
        },
        {
          moduleId: 2,
          name: "Eliminar citas",
        },
        {
          moduleId: 2,
          name: "Ver citas",
        },
      ],
    });

    await db.role.createMany({
      data: [
        {
          name: "Admin",
          description: "Administrator",
        },
        {
          name: "User",
          description: "User",
        },
      ],
    });

    await db.rolePermissions.createMany({
      data: [
        {
          rolId: 1,
          modulePermissionId: 1,
        },
        {
          rolId: 1,
          modulePermissionId: 2,
        },
        {
          rolId: 1,
          modulePermissionId: 3,
        },
        {
          rolId: 1,
          modulePermissionId: 4,
        },
        {
          rolId: 1,
          modulePermissionId: 5,
        },
        {
          rolId: 1,
          modulePermissionId: 6,
        },
        {
          rolId: 1,
          modulePermissionId: 7,
        },
        {
          rolId: 1,
          modulePermissionId: 8,
        },
      ],
    });

    await db.user.createMany({
      data: [
        {
          email: "admin@admin.com",
          emailVerified: new Date(),
          image: faker.image.avatar(),
          name: faker.person.firstName("male"),
          password: bcrypt.hashSync("admin", 10),
        },
        {
          email: faker.internet.email(),
          emailVerified: new Date(),
          image: faker.image.avatar(),
          name: faker.person.firstName(),
          password: bcrypt.hashSync("user", 10),
        },
      ],
    });

    const users = await db.user.findMany();

    await db.userRoles.createMany({
      data: [
        {
          userId: users[0].id,
          roleId: 1,
        },
        {
          userId: users[1].id,
          roleId: 2,
        },
      ],
    });
  } catch (error) {}
};

main().catch(console.error);
