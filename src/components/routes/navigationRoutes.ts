export type NavbarRoute = {
  title: string;
  href: string;
};

export type NavbarRoutes = NavbarRoute[];

export const routes: NavbarRoutes = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
];
