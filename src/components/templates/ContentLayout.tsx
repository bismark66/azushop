import {
  Anchor,
  Breadcrumbs,
  Center,
  Container,
  Text,
  Title,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router";

interface ContentProps {
  children: React.ReactNode;
  hasBanner?: boolean;
  hasBreadcrumbs?: boolean;
  appendPaths?: string[];
  bannerText?: string;
}

// Default breadcrumb labels for common paths
const defaultBreadcrumbLabels: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/dashboard/me": "My Account",
  "/dashboard/settings": "Settings",
  "/dashboard/settings/profile": "Profile",
  "/dashboard/settings/security": "Security",
  "/dashboard/invoices": "Invoices",
  "/dashboard/invoices/paid": "Paid",
  "/dashboard/invoices/pending": "Pending",
  "/product": "Shop",
};

// Function to generate breadcrumb items from the current path
const generateBreadcrumbItems = (
  currentPath: string,
  appendPaths: string[] = [],
  customLabels: Record<string, string> = {}
) => {
  const paths = [];
  const fullPath =
    currentPath + (appendPaths.length ? "/" + appendPaths.join("/") : "");

  const segments = fullPath.split("/").filter((segment) => segment !== "");

  let accumulatedPath = "";
  for (let i = 0; i < segments.length; i++) {
    accumulatedPath += "/" + segments[i];

    const label =
      customLabels[accumulatedPath] ||
      defaultBreadcrumbLabels[accumulatedPath] ||
      segments[i].charAt(0).toUpperCase() +
        segments[i].slice(1).replace(/-/g, " ");

    paths.push({
      path: accumulatedPath,
      label: label,
    });
  }

  return paths;
};

export function ContentLayout({
  children,
  hasBanner = false,
  hasBreadcrumbs = true,
  appendPaths = [],
  bannerText,
}: ContentProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (path: string) => {
    navigate(path);
  };

  const pathBreadcrumbItems = generateBreadcrumbItems(
    location.pathname,
    appendPaths,
    {}
  );
  const items = [
    <Anchor
      key="/"
      onClick={() => handleTabChange("/")}
      style={{
        cursor: pathBreadcrumbItems.length > 0 ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
      c={pathBreadcrumbItems.length > 0 ? "blue" : "dimmed"}
    >
      <Text fw={pathBreadcrumbItems.length === 0 ? 600 : 400} size="sm">
        Home
      </Text>
    </Anchor>,
    ...pathBreadcrumbItems.map((item, index) => (
      <Anchor
        key={item.path}
        onClick={() =>
          index < pathBreadcrumbItems.length - 1
            ? handleTabChange(item.path)
            : null
        }
        style={{
          cursor:
            index < pathBreadcrumbItems.length - 1 ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
        c={index < pathBreadcrumbItems.length - 1 ? "blue" : "dimmed"}
      >
        <Text
          fw={index === pathBreadcrumbItems.length - 1 ? 600 : 400}
          size="sm"
        >
          {item.label}
        </Text>
      </Anchor>
    )),
  ];

  return (
    <>
      <div>
        {hasBanner && (
          <Container fluid bg={"blue"} pt={60} pb={60} c={"#fff"}>
            <Center>
              <Title order={2}>{bannerText || "New Arrival"}</Title>
            </Center>
            <Center>
              <Text>
                {bannerText
                  ? null
                  : "Shop through our latest selection of Products"}
              </Text>
            </Center>
          </Container>
        )}

        {hasBreadcrumbs && items.length > 1 && (
          <Container size="xl" pt="md" pb="md">
            <Center>
              <Breadcrumbs separatorMargin="sm">{items}</Breadcrumbs>
            </Center>
          </Container>
        )}

        <Container size="xl" bg={"white"} pl={0} pr={0} h={"auto"} p={0} pt={0}>
          <div>{children}</div>
        </Container>
      </div>
    </>
  );
}
