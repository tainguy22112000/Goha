import React, { lazy, Suspense, memo } from "react";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/loading";

const AppLayout = lazy(() => import("./protectedLayout"));
const AuthLayout = lazy(() => import("./publicLayout"));

const Layouts = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const Layout = isAuthenticated ? AppLayout : AuthLayout;

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Layout>{children}</Layout>
    </Suspense>
  );
};

export default memo(Layouts);
