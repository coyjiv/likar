import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import { auth } from "@/app/store/provider";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
  },
}));

const data = [
  { link: "", label: "Notifications", icon: "" },
  { link: "", label: "Billing", icon: "" },
  { link: "", label: "Security", icon: "" },
  { link: "", label: "SSH Keys", icon: "" },
  { link: "", label: "Databases", icon: "" },
  { link: "", label: "Authentication", icon: "" },
  { link: "", label: "Other Settings", icon: "" },
];

export function NavbarSimpleColored() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      zIndex={100}
      height={"100vh"}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart"></Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          {/* <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} /> */}
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => auth.signOut()}
        >
          {/* <IconLogout className={classes.linkIcon} stroke={1.5} /> */}
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
