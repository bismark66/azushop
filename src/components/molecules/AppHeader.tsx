import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconHeart,
  IconHome,
  IconLogin2,
  IconNotification,
  IconShoppingBag,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../../styles/AppHeader.module.css";
import AppButton from "../atoms/AppButton";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function AppHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Container size="xl">
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            AzuShop
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className={classes.link}>
                <IconHome style={{ paddingRight: 5 }} />
                Home
              </a>
              <a href="#" className={classes.link}>
                <IconShoppingBag style={{ paddingRight: 5 }} />
                Shop
              </a>
              <a href="#" className={classes.link}>
                <IconShoppingCart style={{ paddingRight: 5 }} />
                Cart
              </a>
              <a href="#" className={classes.link}>
                <IconHeart style={{ paddingRight: 5 }} />
                Favourite
              </a>
            </Group>
            <Group visibleFrom="sm">
              <AppButton variant="transparent" c={"#000"}>
                {" "}
                <IconLogin2 style={{ paddingRight: 5 }} />
                Log in
              </AppButton>
              <AppButton variant="transparent" c={"#000"}>
                {" "}
                <IconUser style={{ paddingRight: 5 }} />
                Register
              </AppButton>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              <IconHome style={{ paddingRight: 5 }} />
              Home
            </a>
            <a href="#" className={classes.link}>
              <IconShoppingBag style={{ paddingRight: 5 }} />
              Shop
            </a>

            <a href="#" className={classes.link}>
              <IconShoppingCart style={{ paddingRight: 5 }} />
              Cart
            </a>
            <a href="#" className={classes.link}>
              <IconHeart style={{ paddingRight: 5 }} />
              Favourite
            </a>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <AppButton variant="transparent" c={"#000"}>
                <IconLogin2 style={{ paddingRight: 5 }} /> Login
              </AppButton>
              <AppButton variant="transparent" c={"#000"}>
                <IconUser style={{ paddingRight: 5 }} /> Register
              </AppButton>
            </Group>
          </ScrollArea>
        </Drawer>
      </Container>
    </Box>
  );
}
