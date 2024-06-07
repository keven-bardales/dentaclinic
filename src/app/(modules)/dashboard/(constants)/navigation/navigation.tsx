import { PermissionsByModule } from "@/features/common/domain/enums/permissions-enum";
import { RouteMiddleware, withPermissions } from "@/lib/middlewares/withPermissionsMiddleWare";
import {
  Barcode,
  Building,
  Building2,
  CirclePercent,
  FileText,
  Network,
  PackageSearch,
  PieChart,
  Receipt,
  ShoppingCart,
  SquareUser,
  Warehouse,
} from "lucide-react";

export type NavigationItem = {
  title: string;
  href: string;
  icon: JSX.Element;
  permissions: string[];
  middleWares: RouteMiddleware[];
  isProtected: boolean;
  children: NavigationItem[];
  renders?: boolean;
};

export const DashboardNavigation: NavigationItem[] = [
  {
    title: "Comercial",
    permissions: [],
    middleWares: [],
    isProtected: true,
    href: "/dashboard/commercial",
    icon: <i className="pi pi-home"></i>,
    children: [
      {
        title: "Dashboard",
        href: "/dashboard/commercial/charts",
        icon: <PieChart className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Cotizaciones",
        href: "/dashboard/commercial/quotations",
        icon: <FileText className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Facturas",
        href: "/dashboard/commercial/bills",
        icon: <Receipt className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Clientes",
        href: "/dashboard/commercial/customers",
        icon: <SquareUser className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Reportes",
        href: "/dashboard/reports",
        icon: <i className="pi pi-chart-line"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [
          {
            title: "Reporte 1",
            href: "/",
            icon: <i className="pi pi-chart-line"></i>,
            permissions: [],
            middleWares: [],
            isProtected: true,
            children: [],
          },
        ],
      },
    ],
  },
  {
    title: "Inventario",
    permissions: [],
    middleWares: [],
    isProtected: true,
    href: "/dashboard/inventory",
    icon: <PackageSearch className="h-5 w-5" />,
    children: [
      {
        title: "Productos",
        href: "/dashboard/inventory/products",
        icon: <Barcode className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Categorias",
        href: "/dashboard/inventory/categories",
        icon: <ShoppingCart className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Listas de precios",
        href: "/dashboard/inventory/pricelists",
        icon: <CirclePercent className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Almacenes",
        href: "/dashboard/inventory/warehouses",
        icon: <Warehouse className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
    ],
  },
  {
    title: "Empresa",
    permissions: [],
    middleWares: [],
    isProtected: true,
    href: "/dashboard/company",
    icon: <Building2 className="h-5 w-5" />,
    children: [
      {
        title: "Compañias",
        href: "/dashboard/company/list",
        icon: <Building className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Sucursales",
        href: "/dashboard/company/branch-offices",
        icon: <Network className="h-5 w-5" />,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
    ],
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: <i className="pi pi-cog"></i>,
    permissions: [],
    middleWares: [],
    isProtected: true,
    children: [
      {
        title: "Países",
        href: "/dashboard/settings/countries",
        icon: <i className="pi pi-flag"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Departamentos",
        href: "/dashboard/settings/states",
        icon: <i className="pi pi-map"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Ciudades",
        href: "/dashboard/settings/cities",
        icon: <i className="pi pi-map-marker"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Colonias",
        href: "/dashboard/settings/neighborhoods",
        icon: <i className="pi pi-home"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Direcciones",
        href: "/dashboard/settings/addresses",
        icon: <i className="pi pi-book"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Telefonos",
        href: "/dashboard/settings/phones",
        icon: <i className="pi pi-phone"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Usuarios",
        href: "/dashboard/settings/users",
        icon: <i className="pi pi-users"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Roles",
        href: "/dashboard/settings/roles",
        icon: <i className="pi pi-users"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [
          {
            title: "Detalle de rol",
            href: "/settings/roles/[id]",
            icon: <i className="pi pi-users"></i>,
            permissions: [],
            middleWares: [],
            isProtected: true,
            renders: false,
            children: [],
          },
        ],
      },
      {
        title: "Modulos",
        href: "/dashboard/settings/modules",
        icon: <i className="pi pi-users"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
    ],
  },
];

export const flattenRoutes = (routes: NavigationItem[]) => {
  return routes.reduce((acc: NavigationItem[], route) => {
    acc.push(route);
    if (route.children && route.children.length > 0) {
      acc.push(...flattenRoutes(route.children));
    }
    return acc;
  }, []);
};

export const flattenedRoutes = flattenRoutes(DashboardNavigation);

export const nextAuthPrefix = "/api/auth";
