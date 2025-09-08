import { Container, Text, Title } from "@mantine/core";
import classes from "../../styles/Hero.module.css";
import AppButton from "../atoms/AppButton";
import { IconArrowRight } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import HeroBg from "../../assets/HeroBg.jpg";
import HeroBg2 from "../../assets/HeroBg2.jpg";
import HeroBg3 from "../../assets/HeroBg3.jpg";
import { useNavigate } from "react-router";

const heroSlides = [
  {
    title: `Next-Gen Mobility`,
    description:
      "Power, performance, and style—experience the future of smartphones today",
    button: "Shop Now",
    bg: HeroBg,
  },
  {
    title: "Capture Every Moment",
    description:
      "Experience exceptional clarity and precision with our new high-performance cameras.",
    button: "Shop collection",
    bg: HeroBg2,
  },
  {
    title: "Power Meets Portability",
    description:
      "Unmatched performance and sleek design—built for work and play.",
    button: "Shop collection",
    bg: HeroBg3,
  },
];

export function Hero() {
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Container fluid style={{ padding: 0 }}>
        <Swiper
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={1}
          allowTouchMove={true}
          pagination={{ clickable: true }}
          modules={[Autoplay]}
          style={{ width: "100%", height: "100%", padding: 0 }}
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={classes.root}
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  padding: 80,
                }}
              >
                <Container size="xl">
                  <div className={classes.inner}>
                    <div className={classes.content}>
                      <Title className={classes.title}>{slide.title}</Title>
                      <Text className={classes.description} mt={30}>
                        {slide.description}
                      </Text>
                      <AppButton
                        variant="gradient"
                        c={"black"}
                        style={{ background: "#fff" }}
                        size="xl"
                        mt={40}
                        onClick={() => navigate("/product")}
                      >
                        {slide.button}
                        <IconArrowRight size={16} />
                      </AppButton>
                    </div>
                  </div>
                </Container>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}
