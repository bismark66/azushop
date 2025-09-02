import { AspectRatio, Container, Group, Image, Text } from "@mantine/core";
import classes from "../../styles/AppFooter.module.css";
import MasterCard from "../../assets/partners/Mastercard.png";
import Paypal from "../../assets/partners/Paypal.png";
import Visa from "../../assets/partners/visa.png";

export function AppFooter() {
  return (
    <div className={classes.footer}>
      <Container size={"xl"} className={classes.inner}>
        <Group gap={10}>
          <AspectRatio ratio={16 / 9}>
            <Image src={Visa} />
          </AspectRatio>
          <AspectRatio ratio={16 / 9}>
            <Image src={Paypal} />
          </AspectRatio>
          <AspectRatio ratio={16 / 9}>
            <Image src={MasterCard} />
          </AspectRatio>
        </Group>

        <Text>2022 Evershop. All Rights Reserved.</Text>
      </Container>
    </div>
  );
}
