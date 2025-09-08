import React from "react";
import AppHeader from "../molecules/AppHeader";
import { AppFooter } from "../molecules/AppFooter";

function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AppHeader />
      <main style={{ flex: 1 }}>{children}</main>
      <AppFooter />
    </div>
  );
}

export default AppLayout;
