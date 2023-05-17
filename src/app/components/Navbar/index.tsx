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
import UserButton from "../UserButton";
import { useAppSelector } from "@/hooks/redux";
import { CalendarDaysIcon, DocumentCheckIcon, BeakerIcon, ChatBubbleLeftEllipsisIcon, Cog8ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  { link: '/appointments', label: 'Ваші візити', icon: <CalendarDaysIcon className="w-4"/> },
  { link: '/recipes', label: 'Ваші направлення', icon: <DocumentCheckIcon className="w-4"/> },
  { link: '/lab-results', label: 'Результати аналізів', icon: <BeakerIcon className="w-4"/> },
  { link: '/chat', label: 'Чат', icon: <ChatBubbleLeftEllipsisIcon className="w-4" /> },
  // { link: '/settings', label: 'Налаштування', icon: <Cog8ToothIcon className="w-4" /> },
];

export function NavbarSimpleColored() {
  const pathname = usePathname();
  
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(data.find(item=>item.link===pathname)?.label ?? '');
  //@ts-ignore
  const profile = useAppSelector(state=>state.firebase.profile)

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      }, 'transition-all flex justify-center items-center sm:block')}
      href={item.link}
      key={item.label}
    >
      <span className="sm:hidden">{item.icon}</span>
      <span className="hidden sm:inline">{item.label}</span>
    </Link>
  ));

  return (
    <Navbar
      zIndex={100}
      height={"100vh"}
      width={{ base: 50, sm: 300 }}
      p="md"
      px={{base: '0.5rem', sm:'1rem'}}
      className={classes.navbar}
    >
      <Navbar.Section>
        <UserButton
          image={profile?.avatarUrl}
          name={profile?.firstName + ' ' + profile?.lastName}
          email={profile?.email}
        />
      </Navbar.Section>

      <Navbar.Section grow className="space-y-5 sm:space-y-0">
        <Group className={classes.header} position="apart"></Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => auth.signOut()}>
          {/* <IconLogout className={classes.linkIcon} stroke={1.5} /> */}
          <span className="hidden sm:inline">Вийти з аккаунту</span>
          <span className="sm:hidden"><ArrowRightOnRectangleIcon className="w-4"/></span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
