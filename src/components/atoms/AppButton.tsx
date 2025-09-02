import { Button, type ButtonProps } from "@mantine/core";
import React from "react";
import { NavLink } from "react-router";

type PolymorphicComponentProps =
  | { component?: "button"; to?: never }
  | { component: typeof NavLink; to: string };

type AppButtonProps = ButtonProps &
  PolymorphicComponentProps & {
    children: React.ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: "button" | "submit" | "reset";
  };

function AppButton({
  children,
  onClick,
  style,
  type = "button",
  component = "button",
  ...props
}: AppButtonProps) {
  const Component = component === NavLink ? NavLink : "button";
  return (
    <Button
      variant="filled"
      onClick={onClick}
      style={style}
      component={Component as any}
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
}

export default AppButton;
