import { PermissionsByModule } from "@/features/common/domain/enums/permissions-enum";
import { RouteMiddleware, withPermissions } from "@/lib/middlewares/withPermissionsMiddleWare";

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
    title: "Modulo principal",
    permissions: [],
    middleWares: [],
    isProtected: true,
    href: "/dashboard",
    icon: <i className="pi pi-home"></i>,
    children: [
      {
        title: "Agenda",
        href: "/dashboard/agenda",
        icon: <i className="pi pi-calendar"></i>,
        permissions: [],
        middleWares: [withPermissions([PermissionsByModule.AGENDA.VIEW])],
        isProtected: true,
        children: [],
      },
      {
        title: "Pacientes",
        href: "/dashboard/patients",
        icon: <i className="pi pi-users"></i>,
        permissions: [],
        middleWares: [withPermissions([PermissionsByModule.PATIENTS.VIEW])],
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
            title: "Children",
            href: "/dashboard/reports/children2",
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
    title: "Configuración",
    href: "/dashboard/settings",
    icon: <i className="pi pi-cog"></i>,
    permissions: [],
    middleWares: [],
    isProtected: true,
    children: [
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
            middleWares: [withPermissions(["CanViewroleDetail"], false)],
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
