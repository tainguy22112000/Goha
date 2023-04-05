import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import navigationConfig from "@/configs/navConfig";

let breadcrumbData = {
  "/app": "home",
};

navigationConfig.forEach((elm, i) => {
  const assignBreadcrumb = (obj) => (breadcrumbData[obj.path] = obj.title);
  assignBreadcrumb(elm);
  if (elm.submenu) {
    elm.submenu.forEach((elm) => {
      assignBreadcrumb(elm);
      if (elm.submenu) {
        elm.submenu.forEach((elm) => {
          assignBreadcrumb(elm);
        });
      }
    });
  }
});

const BreadcrumbRoute = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const buildBreadcrumb = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbData[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb>{buildBreadcrumb}</Breadcrumb>;
};

const PageHeader = ({ title, display }) => {
  return display ? (
    <div className="app-page-header">
      <h3 className="mb-0 mr-3 font-weight-semibold">
        {title ? title : "home"}
      </h3>
      <BreadcrumbRoute />
    </div>
  ) : null;
};

export default PageHeader;
