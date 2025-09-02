import { Anchor, Breadcrumbs, Container, Tabs, Text } from "@mantine/core";
import { useLocation, useNavigate, Outlet } from "react-router";
import {
  IconInvoice,
  IconLayoutDashboard,
  IconSettings,
} from "@tabler/icons-react";

const tabs = [
  {
    name: "Dashboard",
    icon: <IconLayoutDashboard size={16} />,
    path: "/dashboard/me",
  },
  {
    name: "Settings",
    icon: <IconSettings size={16} />,
    path: "/dashboard/settings",
  },
  {
    name: "Invoices",
    icon: <IconInvoice size={16} />,
    path: "/dashboard/invoices",
  },
];

export function ContentLayout({ children }: any) {
  //   const location = useLocation();
  //   const navigate = useNavigate();

  // Get active tab from current path
  //   const activeTab =
  //     tabs.find((tab) => location.pathname === tab.path)?.name || "Dashboard";

  //   const handleTabChange = (value: string | null) => {
  //     if (!value) return;
  //     const tab = tabs.find((tab) => tab.name === value);
  //     if (tab) {
  //       navigate(tab.path);
  //     }
  //   };

  const items = tabs.map((tab) => (
    <Anchor key={tab.name} m={0}>
      <Text
        ta="center"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {tab.icon}
        {tab.name}
      </Text>
    </Anchor>
  ));

  return (
    <>
      <div
      //   className={classes.header}
      >
        <Container size="xl" bg={"white"} pl={0} pr={0} h={"auto"} p={0} pt={0}>
          {/* <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="outline"
            visibleFrom="sm"
            // classNames={{
            //   root: classes.tabs,
            //   list: classes.tabsList,
            //   tab: classes.tab,
            // }}
          >
            <Tabs.List style={{ padding: 0, margin: 0 }}>{items}</Tabs.List>
          </Tabs> */}
          <Breadcrumbs>{items}</Breadcrumbs>
        </Container>
      </div>
      <Container size="xl">
        <div
        // className={classes.body}
        >
          {/* <Outlet /> */}
          {children}
        </div>
      </Container>
    </>
  );
}
