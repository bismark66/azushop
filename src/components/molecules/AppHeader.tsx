import {
  IconHeart,
  IconHome,
  IconLogin2,
  IconShoppingBag,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import {
  Box,
  Burger,
  Container,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import AuthModal from "../organisms/AuthModal";
import classes from "../../styles/AppHeader.module.css";
import AppButton from "../atoms/AppButton";
import { NavLink } from "react-router";

function AppHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  return (
    <>
      <Box>
        <Container size="xl">
          <header className={classes.header}>
            <Group justify="space-between" h="100%">
              AzuShop
              <Group h="100%" gap={0} visibleFrom="sm">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.link} ${classes.active}`
                      : classes.link
                  }
                  end
                >
                  <IconHome style={{ paddingRight: 5 }} />
                  Home
                </NavLink>
                <NavLink
                  to="/product"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.link} ${classes.active}`
                      : classes.link
                  }
                  end
                >
                  <IconShoppingBag style={{ paddingRight: 5 }} />
                  Shop
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.link} ${classes.active}`
                      : classes.link
                  }
                  end
                >
                  <IconShoppingCart style={{ paddingRight: 5 }} />
                  Cart
                </NavLink>
                <NavLink
                  to="/favorite"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.link} ${classes.active}`
                      : classes.link
                  }
                  end
                >
                  <IconHeart style={{ paddingRight: 5 }} />
                  Favourite
                </NavLink>
              </Group>
              <Group visibleFrom="sm">
                <AppButton
                  variant="transparent"
                  c={"#000"}
                  onClick={() => {
                    setAuthMode("login");
                    setAuthModalOpened(true);
                  }}
                >
                  <IconLogin2 style={{ paddingRight: 5 }} />
                  Log in
                </AppButton>
                <AppButton
                  variant="transparent"
                  c={"#000"}
                  onClick={() => {
                    setAuthMode("register");
                    setAuthModalOpened(true);
                  }}
                >
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

              <NavLink to="/" className={classes.link}>
                <IconHome style={{ paddingRight: 5 }} />
                Home
              </NavLink>
              <NavLink to="/product" className={classes.link}>
                <IconShoppingBag style={{ paddingRight: 5 }} />
                Shop
              </NavLink>

              <NavLink to="/cart" className={classes.link}>
                <IconShoppingCart style={{ paddingRight: 5 }} />
                Cart
              </NavLink>
              <NavLink to="/favorite" className={classes.link}>
                <IconHeart style={{ paddingRight: 5 }} />
                Favourite
              </NavLink>

              <Divider my="sm" />

              <Group justify="center" grow pb="xl" px="md">
                <AppButton
                  variant="transparent"
                  c={"#000"}
                  onClick={() => {
                    setAuthMode("login");
                    setAuthModalOpened(true);
                  }}
                >
                  <IconLogin2 style={{ paddingRight: 5 }} /> Login
                </AppButton>
                <AppButton
                  variant="transparent"
                  c={"#000"}
                  onClick={() => {
                    setAuthMode("register");
                    setAuthModalOpened(true);
                  }}
                >
                  <IconUser style={{ paddingRight: 5 }} /> Register
                </AppButton>
              </Group>
            </ScrollArea>
          </Drawer>
        </Container>
      </Box>
      <AuthModal
        opened={authModalOpened}
        onClose={() => setAuthModalOpened(false)}
        mode={authMode}
      />
    </>
  );
}

export default AppHeader;
