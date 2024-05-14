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
    await db.inscription.deleteMany();

    await db.module.createMany({
      data: [
        {
          name: "Dashboard",
          description: "Dashboard module",
        },
        {
          name: "Inscripciones",
          description: "",
        },
        {
          name: "Modulos",
          description: "",
        },
        {
          name: "Configuración",
          description: "",
        },
      ],
    });

    const createdModules = await db.module.findMany();

    createdModules.forEach(async (module: any) => {
      if (module.name === "Dashboard") {
        await db.modulePermission.createMany({
          data: [
            {
              moduleId: module.id,
              name: `Ver ${module.name}`,
            },
          ],
        }); // No permissions for dashboard
        return;
      } else {
        await db.modulePermission.createMany({
          data: [
            {
              moduleId: module.id,
              name: `Crear ${module.name}`,
            },
            {
              moduleId: module.id,
              name: `Editar ${module.name}`,
            },
            {
              moduleId: module.id,
              name: `Eliminar ${module.name}`,
            },
            {
              moduleId: module.id,
              name: `Ver ${module.name}`,
            },
          ],
        });
      }
    });

    const modulePermissions = await db.modulePermission.findMany({
      include: {
        module: true,
      },
    });

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
        {
          name: "Encargado de inscripciones",
          description: "Encargado de inscripciones",
        },
      ],
    });

    const roles = await db.role.findMany();

    modulePermissions.forEach(async (modulePermission: any) => {
      roles.forEach(async (role: any) => {
        if (role.name == "SuperAdmin") {
          await db.rolePermissions.create({
            data: {
              rolId: role.id,
              modulePermissionId: modulePermission.id,
            },
          });
        } else {
          if (modulePermission.module.name == "Inscripciones" && role.name == "Encargado de inscripciones") {
            await db.rolePermissions.create({
              data: {
                rolId: role.id,
                modulePermissionId: modulePermission.id,
              },
            });
          }
        }
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
          password: await bcryptAdapter.hash("123456789"),
        },
      ],
    });

    const inscriptionsRole = await db.role.findFirst({
      where: {
        name: "Encargado de inscripciones",
      },
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

    const createdUserRole = await db.user.create({
      data: {
        email: "inscripciones@gmail.com",
        emailVerified: new Date(),
        image: faker.image.avatar(),
        name: "Encargado de inscripciones",
        password: await bcryptAdapter.hash("Pl4tin0"),
      },
    });

    await db.userRoles.create({
      data: {
        userId: createdUserRole.id,
        roleId: inscriptionsRole.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = main;

main().catch((e) => {});
