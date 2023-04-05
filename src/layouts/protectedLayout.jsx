import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "antd";

import SideNav from "@/components/sideNav";
import Footer from "@/components/footer";
import navConfig from "@/configs/navConfig";

import getRouteInfo from "@/utils/getRouteInfo";
import PageHeader from "@/components/pageHeader";
import HeaderNav from "@/components/headerNav";
import Loading from "@/components/loading";
import { ModalManager } from "@/hooks/useModal";

const { Content } = Layout;

export const AppLayout = ({ children }) => {
  const location = useLocation();

  const currentRouteInfo = getRouteInfo(navConfig, location.pathname);
  return (
    <Layout>
      <HeaderNav />
      <Layout className="app-container">
        <SideNav routeInfo={currentRouteInfo} />
        <Layout className="app-layout" style={{ paddingLeft: 250 }}>
          <div className={`app-content`}>
            <PageHeader
              display={currentRouteInfo?.breadcrumb}
              title={currentRouteInfo?.title}
            />
            <Content>
              <Suspense fallback={<Loading cover="content" />}>
                <ModalManager>{children}</ModalManager>
              </Suspense>
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default React.memo(AppLayout);
