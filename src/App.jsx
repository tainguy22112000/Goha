import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import ErrorBoundary from "@/components/errorBoundary";
import { AuthProvider } from "@/hooks/useAuth";
import Layouts from "@/layouts";
import RootRoutes from "@/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <Layouts>
            <RootRoutes />
          </Layouts>
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
