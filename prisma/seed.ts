// import { db } from "@/lib/db/db";
import { CustomerTypes, DocumentTypes, PhoneStatus, PhoneType, PriceListStatus, Product, Quotation } from "@prisma/client";

const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const { bcryptAdapter } = require("./../src/features/common/adapters/bcryptjs.adapter");
const db = new PrismaClient();
// import { db } from "@/lib/db/db";

const main = async () => {
  try {
    await db.userBranchOffice.deleteMany();
    await db.branchOffice.deleteMany();
    await db.userRoles.deleteMany();
    await db.user.deleteMany();
    await db.rolePermissions.deleteMany();
    await db.role.deleteMany();
    await db.modulePermission.deleteMany();
    await db.module.deleteMany();
    await db.neighborhood.deleteMany();
    await db.address.deleteMany();
    await db.city.deleteMany();
    await db.state.deleteMany();
    await db.country.deleteMany();
    await db.company.deleteMany();
    await db.fax.deleteMany();
    await db.phone.deleteMany();
    await db.branchOfficeFaxes.deleteMany();
    await db.branchOfficePhones.deleteMany();
    await db.userBranchOffice.deleteMany();
    await db.quotationDetails.deleteMany();
    await db.quotation.deleteMany();
    await db.productPriceList.deleteMany();
    await db.product.deleteMany();
    await db.productCategory.deleteMany();
    await db.provider.deleteMany();
    await db.employee.deleteMany();
    await db.customer.deleteMany();
    await db.priceList.deleteMany();

    await db.module.createMany({
      data: [
        {
          name: "Dashboard",
          description: "Dashboard module",
        },
        {
          name: "Modulos",
          description: "Modules module",
        },
        {
          name: "Roles",
          description: "Roles module",
        },
        {
          name: "Usuarios",
          description: "Users module",
        },
        {
          name: "Facturas",
          description: "Invoices module",
        },
        {
          name: "Cotizaciones",
          description: "Quotes module",
        },
        {
          name: "Impuestos",
          description: "Taxes module",
        },
        {
          name: "Codigos de descuento",
          description: "Discount codes module",
        },
        {
          name: "Productos",
          description: "Products module",
        },
        {
          name: "Lista de precios",
          description: "Price list module",
        },
        {
          name: "Almacenes",
          description: "Warehouses module",
        },
        {
          name: "Categoria de productos",
          description: "Product category module",
        },
        {
          name: "Clientes",
          description: "Clients module",
        },
        {
          name: "Telefonos",
          description: "Phones module",
        },
        {
          name: "Paises",
          description: "Countries module",
        },
        {
          name: "Departamentos",
          description: "Departments module",
        },
        {
          name: "Ciudades",
          description: "Cities module",
        },
        {
          name: "Colonias",
          description: "Colonies module",
        },
        {
          name: "Direcciones",
          description: "Addresses module",
        },
        {
          name: "Proveedores",
          description: "Providers module",
        },
        {
          name: "Empleados",
          description: "Employees module",
        },
        {
          name: "Sucursales",
          description: "Branches module",
        },
      ],
      skipDuplicates: true,
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
        {
          name: "Asesor de ventas",
          description: "Asesor de ventas",
        },
        {
          name: "Jefe de sucursal",
          description: "Jefe de sucursal",
        },
        {
          name: "Gerente de ventas",
          description: "Gerente de ventas",
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

    await db.country.createMany({
      data: [
        {
          name: "Honduras",
          code: "HN",
        },
        {
          name: "Guatemala",
          code: "GT",
        },
        {
          name: "El Salvador",
          code: "SV",
        },
        {
          name: "Nicaragua",
          code: "NI",
        },
        {
          name: "Costa Rica",
          code: "CR",
        },
        {
          name: "Panama",
          code: "PA",
        },
      ],
    });

    await db.state.createMany({
      data: [
        {
          name: "Atlantida",
          countryId: 1,
          code: "AT",
        },
        {
          name: "Colon",
          countryId: 1,
          code: "CL",
        },
        {
          name: "Comayagua",
          countryId: 1,
          code: "CM",
        },
        {
          name: "Copan",
          countryId: 1,
          code: "CP",
        },
        {
          name: "Cortes",
          countryId: 1,
          code: "CT",
        },
        {
          name: "Choluteca",
          countryId: 1,
          code: "CH",
        },
        {
          name: "El Paraiso",
          countryId: 1,
          code: "EP",
        },
        {
          name: "Francisco Morazan",
          countryId: 1,
          code: "FM",
        },
        {
          name: "Gracias a Dios",
          countryId: 1,
          code: "GD",
        },
        {
          name: "Intibuca",
          countryId: 1,
          code: "IB",
        },
        {
          name: "Islas de la Bahia",
          countryId: 1,
          code: "IB",
        },
        {
          name: "La Paz",
          countryId: 1,
          code: "LP",
        },
        {
          name: "Lempira",
          countryId: 1,
          code: "LM",
        },
        {
          name: "Ocotepeque",
          countryId: 1,
          code: "OC",
        },
        {
          name: "Olancho",
          countryId: 1,
          code: "OL",
        },
        {
          name: "Santa Barbara",
          countryId: 1,
          code: "SB",
        },
        {
          name: "Valle",
          countryId: 1,
          code: "VL",
        },
        {
          name: "Yoro",
          countryId: 1,
          code: "YO",
        },

        {
          name: "Alta Verapaz",
          countryId: 2,
          code: "AV",
        },
        {
          name: "Baja Verapaz",
          countryId: 2,
          code: "BV",
        },
        {
          name: "Chimaltenango",
          countryId: 2,
          code: "CH",
        },
        {
          name: "Chiquimula",
          countryId: 2,
          code: "CQ",
        },
        {
          name: "El Progreso",
          countryId: 2,
          code: "EP",
        },
        {
          name: "Escuintla",
          countryId: 2,
          code: "ES",
        },
        {
          name: "Guatemala",
          countryId: 2,
          code: "GU",
        },
        {
          name: "Huehuetenango",
          countryId: 2,
          code: "HU",
        },
        {
          name: "Izabal",
          countryId: 2,
          code: "IZ",
        },
        {
          name: "Jalapa",
          countryId: 2,
          code: "JA",
        },
        {
          name: "Jutiapa",
          countryId: 2,
          code: "JT",
        },
        {
          name: "Peten",
          countryId: 2,
          code: "PT",
        },
        {
          name: "Quetzaltenango",
          countryId: 2,
          code: "QZ",
        },
        {
          name: "Quiche",
          countryId: 2,
          code: "QC",
        },
        {
          name: "Retalhuleu",
          countryId: 2,
          code: "RH",
        },
        {
          name: "Sacatepequez",
          countryId: 2,
          code: "ST",
        },
        {
          name: "San Marcos",
          countryId: 2,
          code: "SM",
        },
        {
          name: "Santa Rosa",
          countryId: 2,
          code: "SR",
        },
        {
          name: "Solola",
          countryId: 2,
          code: "SL",
        },
        {
          name: "Suchitepequez",
          countryId: 2,
          code: "SQ",
        },

        {
          name: "Ahuachapan",
          countryId: 3,
          code: "AH",
        },
        {
          name: "Cabañas",
          countryId: 3,
          code: "CB",
        },
        {
          name: "Chalatenango",
          countryId: 3,
          code: "CH",
        },
        {
          name: "Cuscatlan",
          countryId: 3,
          code: "CS",
        },
        {
          name: "La Libertad",
          countryId: 3,
          code: "LL",
        },
        {
          name: "La Paz",
          countryId: 3,
          code: "LP",
        },
        {
          name: "La Union",
          countryId: 3,
          code: "LU",
        },
        {
          name: "Morazan",
          countryId: 3,
          code: "MZ",
        },
        {
          name: "San Miguel",
          countryId: 3,
          code: "SM",
        },
        {
          name: "San Salvador",
          countryId: 3,
          code: "SS",
        },
        {
          name: "Santa Ana",
          countryId: 3,
          code: "SA",
        },
        {
          name: "San Vicente",
          countryId: 3,
          code: "SV",
        },
        {
          name: "Sonsonate",
          countryId: 3,
          code: "SO",
        },
        {
          name: "Usulutan",
          countryId: 3,
          code: "US",
        },

        {
          name: "Boaco",
          countryId: 4,
          code: "BO",
        },
        {
          name: "Carazo",
          countryId: 4,
          code: "CA",
        },
        {
          name: "Chinandega",
          countryId: 4,
          code: "CH",
        },
        {
          name: "Chontales",
          countryId: 4,
          code: "CT",
        },
        {
          name: "Esteli",
          countryId: 4,
          code: "ES",
        },
        {
          name: "Granada",
          countryId: 4,
          code: "GR",
        },
        {
          name: "Jinotega",
          countryId: 4,
          code: "JI",
        },
      ],
    });

    await db.city.createMany({
      data: [
        {
          name: "Tegucigalpa",
          stateId: 8,
          code: "TEG",
        },
        {
          name: "Comayaguela",
          stateId: 8,
          code: "COM",
        },
        {
          name: "San Pedro Sula",
          stateId: 5,
          code: "SPS",
        },
        {
          name: "La Ceiba",
          stateId: 1,
          code: "LCE",
        },
        {
          name: "Choloma",
          stateId: 5,
          code: "CHO",
        },
        {
          name: "El Progreso",
          stateId: 7,
          code: "EPR",
        },
        {
          name: "Choluteca",
          stateId: 6,
          code: "CHL",
        },
        {
          name: "La Lima",
          stateId: 5,
          code: "LAL",
        },
        {
          name: "Villanueva",
          stateId: 5,
          code: "VIL",
        },
        {
          name: "Puerto Cortes",
          stateId: 5,
          code: "PCO",
        },
        {
          name: "Danli",
          stateId: 8,
          code: "DAN",
        },
        {
          name: "Juticalpa",
          stateId: 4,
          code: "JUT",
        },
        {
          name: "Santa Rosa de Copan",
          stateId: 4,
          code: "SRC",
        },
        {
          name: "Santa Barbara",
          stateId: 16,
          code: "SBA",
        },
        {
          name: "La Paz",
          stateId: 12,
          code: "LPZ",
        },
        {
          name: "Gracias",
          stateId: 4,
          code: "GRA",
        },
        {
          name: "Yoro",
          stateId: 18,
          code: "YOR",
        },
        {
          name: "Olanchito",
          stateId: 18,
          code: "OLA",
        },
        {
          name: "Tela",
          stateId: 1,
          code: "TEL",
        },
        {
          name: "San Lorenzo",
          stateId: 1,
          code: "SLO",
        },
        {
          name: "La Ceiba",
          stateId: 1,
          code: "LCE",
        },
        {
          name: "La Lima",
          stateId: 5,
          code: "LAL",
        },
        {
          name: "Villanueva",
          stateId: 5,
          code: "VIL",
        },
        {
          name: "Puerto Cortes",
          stateId: 5,
          code: "PCO",
        },
        {
          name: "Danli",
          stateId: 8,
          code: "DAN",
        },
        {
          name: "Juticalpa",
          stateId: 4,
          code: "JUT",
        },

        {
          name: "Guatemala",
          stateId: 7,
          code: "GUA",
        },
        {
          name: "Mixco",
          stateId: 7,
          code: "MIX",
        },
        {
          name: "Villa Nueva",
          stateId: 7,
          code: "VIL",
        },
        {
          name: "Petapa",
          stateId: 7,
          code: "PET",
        },
        {
          name: "San Juan Sacatepequez",
          stateId: 7,
          code: "SJS",
        },
        {
          name: "Quetzaltenango",
          stateId: 13,
          code: "QUE",
        },
        {
          name: "Villa Canales",
          stateId: 7,
          code: "VCA",
        },
        {
          name: "Escuintla",
          stateId: 6,
          code: "ESC",
        },
        {
          name: "Chinautla",
          stateId: 7,
          code: "CHI",
        },
        {
          name: "Chimaltenango",
          stateId: 3,
          code: "CHI",
        },
        {
          name: "Amatitlan",
          stateId: 7,
          code: "AMA",
        },
        {
          name: "Huehuetenango",
          stateId: 8,
          code: "HUE",
        },
        {
          name: "San Miguel Petapa",
          stateId: 7,
          code: "SMP",
        },
        {
          name: "Santa Lucía Cotzumalguapa",
          stateId: 6,
          code: "SLC",
        },
        {
          name: "Chichicastenango",
          stateId: 13,
          code: "CHI",
        },
        {
          name: "San Pedro Ayampuc",
          stateId: 7,
          code: "SPA",
        },
        {
          name: "San Cristobal Verapaz",
          stateId: 1,
          code: "SCV",
        },
        {
          name: "Mazatenango",
          stateId: 16,
          code: "MAZ",
        },
        {
          name: "Santa Catarina Pinula",
          stateId: 7,
          code: "SCP",
        },
        {
          name: "San Francisco El Alto",
          stateId: 8,
          code: "SFE",
        },
        {
          name: "San Jose Pinula",
          stateId: 7,
          code: "SJP",
        },
        {
          name: "San Pedro Sacatepequez",
          stateId: 7,
          code: "SPS",
        },
        {
          name: "Totonicapan",
          stateId: 14,
          code: "TOT",
        },
        {
          name: "Antigua Guatemala",
          stateId: 3,
          code: "ANT",
        },
        {
          name: "Santa Maria de Jesus",
          stateId: 3,
          code: "SMJ",
        },
        {
          name: "San Lucas Sacatepequez",
          stateId: 3,
          code: "SLS",
        },
        {
          name: "San Juan Ostuncalco",
          stateId: 13,
          code: "SJO",
        },
        {
          name: "San Pedro Sacatepequez",
          stateId: 13,
          code: "SPS",
        },
        {
          name: "San Andres Itzapa",
          stateId: 3,
          code: "SAI",
        },
        {
          name: "Santiago Sacatepequez",
          stateId: 3,
          code: "SSQ",
        },
        {
          name: "San Bartolome Milpas Altas",
          stateId: 3,
          code: "SBM",
        },
        {
          name: "San Lucas Toliman",
          stateId: 14,
          code: "SLT",
        },
      ],
    });

    await db.neighborhood.createMany({
      data: [
        {
          name: "Col. Kennedy",
          cityId: 1,
          code: "KEN",
        },
        {
          name: "Col. Miramontes",
          cityId: 1,
          code: "MIR",
        },
        {
          name: "Col. San Miguel",
          cityId: 1,
          code: "SMI",
        },
        {
          name: "Col. San Rafael",
          cityId: 1,
          code: "SRA",
        },
        {
          name: "Col. San Francisco",
          cityId: 1,
          code: "SFR",
        },
        {
          name: "Col. San Isidro",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. San Juan",
          cityId: 1,
          code: "SJU",
        },
        {
          name: "Col. San Martin",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. San Pedro",
          cityId: 1,
          code: "SPE",
        },
        {
          name: "Col. San Sebastian",
          cityId: 1,
          code: "SSE",
        },
        {
          name: "Col. San Vicente",
          cityId: 1,
          code: "SVI",
        },
        {
          name: "Col. Santa Ana",
          cityId: 1,
          code: "SAA",
        },
        {
          name: "Col. Santa Lucia",
          cityId: 1,
          code: "SLU",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Santa Isabel",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Santa Isabel",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Santa Isabel",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Santa Isabel",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Santa Isabel",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Santa Isabel",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Santa Isabel",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Santa Isabel",
          cityId: 1,
          code: "SIS",
        },
        {
          name: "Col. Santa Maria",
          cityId: 1,
          code: "SMA",
        },
        {
          name: "Col. Santa Rosa",
          cityId: 1,
          code: "SRO",
        },
        {
          name: "Col. Santa Teresa",
          cityId: 1,
          code: "STE",
        },
        {
          name: "Col. Santa Fe",
          cityId: 1,
          code: "SFE",
        },
        {
          name: "Col. Lomas del Country",
          cityId: 2,
          code: "LDC",
        },
      ],
    });

    await db.address.createMany({
      data: [
        {
          fullAddress: "Col. Kennedy, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 1,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. Kennedy",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. Miramontes, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 2,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. Miramontes",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. San Miguel, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 3,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Miguel",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. San Rafael, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 4,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Rafael",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. San Francisco, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 5,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Francisco",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. San Isidro, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 6,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Isidro",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. San Juan, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 7,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Juan",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. San Martin Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 8,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Martin",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },

        {
          fullAddress: "Col. San Pedro, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 9,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Pedro",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. San Sebastian, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 10,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Sebastian",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. San Vicente, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 11,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. San Vicente",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. Santa Ana, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 12,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. Santa Ana",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. Santa Lucia, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 13,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. Santa Lucia",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. Santa Maria, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 14,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. Santa Maria",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Col. Santa Rosa, Tegucigalpa, Francisco Morazan, Honduras",
          neighborhoodId: 15,
          cityId: 1,
          countryId: 1,
          neighborhoodName: "Col. Santa Rosa",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
        {
          fullAddress: "Avenida Cabañas Intersección Belen Country, contiguo a gasolinera Cabañas, Comayaguela M.D.C",
          cityId: 2,
          countryId: 1,
          neighborhoodId: 58,
          neighborhoodName: "Col. Lomas del Country",
          number: "123",
          stateId: 8,
          street: "Calle Principal",
        },
      ],
    });

    await db.phone.createMany({
      data: [
        {
          phone: "504-2237-6887",
          status: PhoneStatus.ACTIVE,
          type: PhoneType.WORK,
        },
      ],
    });

    await db.fax.createMany({
      data: [
        {
          fax: "504-2237-6924",
          status: PhoneStatus.ACTIVE,
          type: PhoneType.WORK,
        },
      ],
    });

    await db.company.createMany({
      data: [
        {
          name: "Corporación Electrica Industrial, S.A.",
          rtn: "08011999000000",
          acronym: "CEISA",
        },
      ],
    });

    await db.branchOffice.createMany({
      data: [
        {
          addressId: 1,
          name: "Sucursal Tegucigalpa",
          companyId: 1,
        },
        {
          addressId: 16,
          name: "Sucursal Comayaguela",
          companyId: 1,
        },
      ],
    });

    await db.branchOfficeFaxes.createMany({
      data: [
        {
          branchOfficeId: 2,
          faxId: 1,
          isMainFax: true,
          status: PhoneStatus.ACTIVE,
        },
      ],
    });

    await db.branchOfficePhones.createMany({
      data: [
        {
          branchOfficeId: 2,
          isMainPhone: true,
          phoneId: 1,
          status: PhoneStatus.ACTIVE,
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

    const keven = users.find((user: any) => user.email === "keven.bardales@gmail.com");

    if (!keven) return console.log("Keven not found");

    await db.userBranchOffice.createMany({
      data: [
        {
          branchOfficeId: 1,
          userId: keven?.id,
          isDefault: true,
        },
        {
          branchOfficeId: 2,
          userId: keven?.id,
          isDefault: false,
        },
      ],
    });

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

    await db.customer.createMany({
      data: [
        {
          rtn: "08011999000000",
          fullName: "CM Airlines",
          lastName: "Airlines",
          name: "CM",
          type: CustomerTypes.COMPANY,
        },
      ],
    });

    // firstCreateMainCategories
    await db.productCategory.createMany({
      data: [
        {
          name: "Electrico",
          categoryLevel: 1,
        },
        {
          name: "Plomeria",
          categoryLevel: 1,
        },
      ],
    });

    await db.productCategory.createMany({
      data: [
        {
          name: "Cables",
          categoryLevel: 2,
          parentId: 1,
        },
        {
          name: "Conectores",
          categoryLevel: 2,
          parentId: 1,
        },
        {
          name: "Pvc",
          categoryLevel: 2,
          parentId: 2,
        },
        {
          name: "Cajas",
          categoryLevel: 2,
          parentId: 1,
        },
        {
          name: "Grapas",
          categoryLevel: 2,
          parentId: 1,
        },
      ],
    });

    const categories = await db.productCategory.findMany();

    await db.product.createMany({
      data: [
        {
          name: "Tubo pvc 1/2 c20",
          description: "Tubo de pvc 1/2 c20",
          categoryId: categories.find((category: any) => category.name === "Pvc")?.id,
        },
        {
          name: "Conector pvc 1/2 C20",
          description: "Conector de pvc 1/2 C20",
          categoryId: categories.find((category: any) => category.name === "Pvc")?.id,
        },
        {
          name: "Union pvc 1/2 C20",
          description: "Union pvc 1/2 C20",
          categoryId: categories.find((category: any) => category.name === "Pvc")?.id,
        },
        {
          name: "Curva pvc 1/2 C20",
          description: "Curva pvc 1/2 C20",
          categoryId: categories.find((category: any) => category.name === "Pvc")?.id,
        },
        {
          name: "Caja 2x4x1/2",
          description: "Caja 2x4x1/2",
          categoryId: categories.find((category: any) => category.name === "Cajas")?.id,
        },
        {
          name: "Tubo Pvc 3/4 C20",
          description: "Tubo Pvc 3/4 C20",
          categoryId: categories.find((category: any) => category.name === "Pvc")?.id,
        },
        {
          name: "Conector Pvc 3/4 c20",
          description: "Conector Pvc 3/4 c20",
          categoryId: categories.find((category: any) => category.name === "Pvc")?.id,
        },
        {
          name: "Union pvc 3/4 C20",
          description: "Union pvc 3/4 C20",
          categoryId: categories.find((category: any) => category.name === "Pvc")?.id,
        },
        {
          name: "Cajas 2x4x3/4",
          description: "Cajas 2x4x3/4",
          categoryId: categories.find((category: any) => category.name === "Cajas")?.id,
        },

        {
          name: "Cajas 4x4x2 Mixta",
          description: "Cajas 4x4x2 Mixta",
          categoryId: categories.find((category: any) => category.name === "Cajas")?.id,
        },

        {
          name: "Curva pvc 3/4 c20",
          description: "Curva pvc 3/4 c20",
          categoryId: categories.find((category: any) => category.name === "Pvc")?.id,
        },

        {
          name: "Tacos s-8 s/t",
          description: "Tacos s-8 s/t",
          categoryId: categories.find((category: any) => category.name === "Grapas")?.id,
        },

        {
          name: "Grapas emt 1/2",
          description: "Grapas emt 1/2",
          categoryId: categories.find((category: any) => category.name === "Grapas")?.id,
        },

        {
          name: "Grapas emt 3/4",
          description: "Grapas emt 3/4",
          categoryId: categories.find((category: any) => category.name === "Grapas")?.id,
        },

        {
          name: "Cajas oct 1/2",
          description: "Cajas oct 1/2",
          categoryId: categories.find((category: any) => category.name === "Cajas")?.id,
        },
      ],
    });

    await db.priceList.createMany({
      data: [
        {
          name: "Lista de precios 1",
          status: PriceListStatus.ACTIVE,
          description: "Lista de precios 1",
        },
      ],
    });

    await db.productPriceList.createMany({
      data: [
        {
          productId: 1,
          salePrice: 32,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 2,
          salePrice: 3.4,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 3,
          salePrice: 3,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 4,
          salePrice: 5,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 5,
          salePrice: 17.5,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 6,
          salePrice: 37,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 7,
          salePrice: 4.5,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 8,
          salePrice: 4,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 9,
          salePrice: 18.5,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 10,
          salePrice: 45,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 11,
          salePrice: 5.9,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 12,
          salePrice: 1.6,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 13,
          salePrice: 1.5,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 14,
          salePrice: 1.8,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
        {
          productId: 15,
          salePrice: 22,
          status: PriceListStatus.ACTIVE,
          priceListId: 1,
        },
      ],
    });

    const customers = await db.customer.findMany();

    if (customers.length === 0) return console.log("No customers found");

    const today = new Date();
    const daySevenFromToday = new Date(today.setDate(today.getDate() + 7));

    await db.quotation.createMany({
      data: [
        {
          code: "Q-0001",
          customerId: customers[0].id,
          documentType: DocumentTypes.QUOTATION,
          finalDate: daySevenFromToday,
          project: "",
          startDate: new Date(),
          addressId: 1,
          branchOfficeId: 2,
          discount: 0,
          subtotal: 0,
          tax: 0,
          total: 0,
        },
      ],
    });

    const quotations = await db.quotation.findMany();

    const products = await db.product.findMany({
      include: {
        productPriceList: true,
      },
    });

    const productWithData = {
      "Tubo pvc 1/2 c20": {
        quantity: 200,
      },
      "Conector pvc 1/2 C20": {
        quantity: 400,
      },
      "Union pvc 1/2 C20": {
        quantity: 100,
      },
      "Curva pvc 1/2 C20": {
        quantity: 300,
      },
      "Caja 2x4x1/2": {
        quantity: 60,
      },
      "Tubo Pvc 3/4 C20": {
        quantity: 100,
      },
      "Conector Pvc 3/4 c20": {
        quantity: 100,
      },
      "Union pvc 3/4 C20": {
        quantity: 50,
      },
      "Cajas 2x4x3/4": {
        quantity: 20,
      },
      "Cajas 4x4x2 Mixta": {
        quantity: 20,
      },
      "Curva pvc 3/4 c20": {
        quantity: 150,
      },
      "Tacos s-8 s/t": {
        quantity: 500,
      },
      "Grapas emt 1/2": {
        quantity: 200,
      },
      "Grapas emt 3/4": {
        quantity: 100,
      },
      "Cajas oct 1/2": {
        quantity: 100,
      },
    };

    const processQuotationsAndProducts = async () => {
      for (const quotation of quotations) {
        for (const product of products) {
          const quantity = productWithData[product.name as keyof typeof productWithData].quantity as number;
          const salePrice = product.productPriceList[0].salePrice;

          await db.quotationDetails.create({
            data: {
              description: product.name,
              productId: product.id,
              price: product.productPriceList[0].salePrice as any,
              quantity: quantity,
              quotationId: quotation.id,
              discountAmount: 0,
              discountPercentage: 0,
              priceWithDiscount: salePrice,
              priceWithTax: salePrice,
              subTotal: salePrice.times(quantity),
              subTotalWithDiscount: salePrice.times(quantity),
              subTotalWithTax: salePrice.times(quantity).plus(salePrice.times(quantity).times(0.15)),
              taxAmount: salePrice.times(quantity).times(0.15),
              taxPercentage: 15,
              total: salePrice.times(quantity).plus(salePrice.times(quantity).times(0.15)),
            },
          });
        }
      }

      for (const quotation of quotations) {
        const quotationDetails = await db.quotationDetails.findMany({
          where: {
            quotationId: quotation.id,
          },
        });

        const subtotal = quotationDetails.reduce((acc: any, curr: any) => acc + curr.subTotal.toNumber(), 0);
        const tax = quotationDetails.reduce((acc: any, curr: any) => acc + curr.taxAmount.toNumber(), 0);
        const total = quotationDetails.reduce((acc: any, curr: any) => acc + curr.total.toNumber(), 0);

        await db.quotation.update({
          where: {
            id: quotation.id,
          },
          data: {
            subtotal: subtotal,
            tax: tax,
            total: total,
          },
        });
      }
    };

    processQuotationsAndProducts().catch(console.error);
  } catch (error) {
    console.log(error);
  }
};

module.exports = main;

main().catch((e) => {});
