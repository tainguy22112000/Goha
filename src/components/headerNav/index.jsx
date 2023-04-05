import React from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";

import { useAuth } from "@/hooks/useAuth";
import Icon from "@ant-design/icons/lib/components/Icon";

const { Header } = Layout;

const MenuItem = (props) => (
  <div>
    <a className="d-flex align-items-center" href={props.path}>
      <Icon className="font-size-md" type={props.icon} />
      <span className="font-weight-normal mx-2">{props.label}</span>
    </a>
  </div>
);

const MenuItemSignOut = (props) => (
  <span className="d-flex align-items-center">
    <LogoutOutlined className="font-size-md" />
    <span className="font-weight-normal mx-2">{props.label}</span>
  </span>
);

export const HeaderNav = () => {
  const { logout, profile } = useAuth();
  const handleClick = ({ key }) => {
    if (key === "Sign Out") {
      logout();
    }
  };

  const menu = (
    <Menu
      onClick={handleClick}
      items={[
        {
          key: "Account Setting",
          label: <MenuItem label="Account Setting" icon={SettingOutlined} />,
        },
        {
          key: "Sign Out",
          label: <MenuItemSignOut label="Sign Out" />,
        },
      ]}
    />
  );

  return (
    <Header className={`app-header`}>
      <div className={`app-header-wrapper justify-between`}>
        <div className="logo">
          <img src={`/img/logo.png`} alt={`logo`} />
        </div>
        <div className="nav" style={{ width: `calc(100% - 250px` }}>
          <div className="nav-right">
            <Dropdown
              placement="bottomRight"
              overlay={menu}
              trigger={["click"]}
            >
              <div className="nav-item">
                <div className="d-flex align-items-center">
                  <Avatar src="/img/avatars/thumb-2.jpg" />
                  <div className="pl-2 d-none d-sm-block profile-text">
                    <div className="font-size-base font-weight-bold">
                      {profile?.name}
                    </div>
                    <span className="opacity-0-8">{profile?.email}</span>
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderNav;
