import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppTheme } from "./utils/appTheme.ts";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import AppLayout from "./components/templates/AppLayout.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import routerConfig from "./utils/router/routes.tsx";
// import { AuthProvider } from "./utils/contexts/AuthenticationContext";
import ProtectedRoute from "./utils/router/protectedRoute.tsx";
import { BreadcrumbProvider } from "./utils/contexts/breadCrumpContext.tsx";
import { AuthProvider } from "./utils/contexts/authenticationContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WishlistProvider } from "./utils/contexts/wishlistContext";
import { CartProvider } from "./utils/contexts/cartContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Helper function to render routes recursively
const renderRoutes = (routes: any[]) => {
  return routes.map((route) => {
    const element = route.protected ? (
      <ProtectedRoute>{route.element}</ProtectedRoute>
    ) : (
      route.element
    );

    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={element}
        index={route.index}
      />
    );
  });
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={AppTheme}>
        <Notifications />
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <BreadcrumbProvider>
                <BrowserRouter>
                  <AppLayout>
                    <Routes>{renderRoutes(routerConfig)}</Routes>
                  </AppLayout>
                </BrowserRouter>
              </BreadcrumbProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
