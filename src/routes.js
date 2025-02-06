const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    layout: "/admin",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/customer",
    name: "Customers",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/prospect",
    name: "Prospect",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/service-logs",
    name: "Service Logs",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/route-assignment",
    name: "Routes",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/work-order",
    name: "Work Order",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/shopping-list",
    name: "Shopping List",
    roles: ["Super_Admin", "Admin"],
  },

  {
    path: "/email",
    name: "Broadcast Email",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/",
    name: "Reports",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/estimates",
    name: "Billing and Sales",
    layout: "/admin",
    roles: ["Super_Admin", "Admin"],
  },
  {
    path: "/dashboard",
    name: "Settings",
    roles: ["Super_Admin", "Admin"],
  },
  // {
  //   path: "/Export",
  //   name: "Export",
  //   roles: ["Super_Admin"]
  // },
  {
    path: "/integration",
    name: "Integration",
    roles: ["Super_Admin"],
  },
  // {
  //   path: "/Account",
  //   name: "Account",
  //   roles: ["Super_Admin"],
  // },
];

export default dashboardRoutes;
