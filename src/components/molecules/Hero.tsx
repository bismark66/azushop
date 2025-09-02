import { Container, Text, Title } from "@mantine/core";
import classes from "../../styles/Hero.module.css";
import AppButton from "../atoms/AppButton";
import { IconArrowRight } from "@tabler/icons-react";

export function Hero() {
  return (
    <div className={classes.root}>
      <Container size="xl">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              {/* A{" "} */}
              Next-Gen
              <Text className={classes.title}>Mobility</Text>
            </Title>

            <Text className={classes.description} mt={30}>
              Power, performance, and style—experience the future of smartphones
              today
            </Text>

            <AppButton
              variant="gradient"
              c={"black"}
              style={{ background: "#fff" }}
              size="xl"
              mt={40}
            >
              Shop Now
              <IconArrowRight size={16} />
            </AppButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
