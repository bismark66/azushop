import React from "react";
import { AppHeader } from "../molecules/AppHeader";
import { AppFooter } from "../molecules/AppFooter";

function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
}

export default AppLayout;
