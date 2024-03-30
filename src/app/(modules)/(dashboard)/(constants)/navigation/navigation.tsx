export type NavigationItem = {
  title: string;
  href: string;
  icon: JSX.Element;
  permissions: string[];
  middleWares: string[];
  isProtected: boolean;
  children: NavigationItem[];
};

export const DashboardNavigation: NavigationItem[] = [
  {
    title: "Modulo principal",
    permissions: [],
    middleWares: [],
    isProtected: true,
    href: "/",
    icon: <i className="pi pi-home"></i>,
    children: [
      {
        title: "Agenda",
        href: "/agenda",
        icon: <i className="pi pi-calendar"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Pacientes",
        href: "/patients",
        icon: <i className="pi pi-users"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Reportes",
        href: "/reports",
        icon: <i className="pi pi-chart-line"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [
          {
            title: "Children",
            href: "/children2",
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
    href: "/settings",
    icon: <i className="pi pi-cog"></i>,
    permissions: [],
    middleWares: [],
    isProtected: true,
    children: [
      {
        title: "Usuarios",
        href: "/settings/users",
        icon: <i className="pi pi-users"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Roles",
        href: "/settings/roles",
        icon: <i className="pi pi-users"></i>,
        permissions: [],
        middleWares: [],
        isProtected: true,
        children: [],
      },
      {
        title: "Modulos",
        href: "/settings/modules",
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
