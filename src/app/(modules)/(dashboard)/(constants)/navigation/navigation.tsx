export const DashboardNavigation = [
  {
    title: "Modulo principal",
    permissions: [],
    middleWares: [],
    isProtected: true,
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
          },
        ],
      },
    ],
  },
];

export const nextAuthPrefix = "/api/auth";
