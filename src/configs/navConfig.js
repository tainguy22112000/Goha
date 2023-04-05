import {
  TeamOutlined,
  UserSwitchOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";

const usersNavtree = [
  {
    key: "users",
    path: `/users`,
    title: "User Management",
    icon: TeamOutlined,
    breadcrumb: true,
    isGroupTitle: true,
    submenu: [
      {
        key: "users",
        path: `/users`,
        title: "Users",
        icon: TeamOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "agency",
        path: `/users/agency`,
        title: "Agency",
        icon: UserSwitchOutlined,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const ordersNavtree = [
  {
    key: "orders",
    path: `/orders`,
    title: "Order Management",
    icon: CodeSandboxOutlined,
    breadcrumb: true,
    isGroupTitle: true,
    submenu: [
      {
        key: "orders",
        path: `/orders`,
        title: "Orders",
        icon: CodeSandboxOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navConfig = [...usersNavtree, ...ordersNavtree];

export default navConfig;
