// Site-wide content. Values in [brackets] are placeholders still to be filled in.

export const site = {
  name: "Rogue Code",
  tagline: "We code. We compile. We run.",
  contact: {
    email: "contact@roguecode.in",
    phone: "[+91 00000 00000]",
    address: "25, Dattani Trade Centre, Near New BMC Office, Shanti Nagar, Borivali West, Mumbai, Maharashtra 400092",
  },
  compilerUrl: "https://rc-js-compiler.netlify.app/",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "X / Twitter", href: "#" },
  ],
};

export type NavItem = {
  label: string;
  href: string;
  /** Opens in a new tab (e.g. the online compiler). */
  external?: boolean;
  /** Path prefix that marks this item as the current section. */
  match?: string;
};

export type HeaderConfig = {
  home: string;
  logoSuffix?: string;
  nav: NavItem[];
  cartHref: string;
  loginHref: string;
  loginLabel: string;
  cta: { label: string; href: string };
};

export const studioHeader: HeaderConfig = {
  home: "/",
  nav: [
    { label: "Tech Solutions", href: "/#studio" },
    { label: "Academy", href: "/academy", match: "/academy" },
    { label: "Work", href: "/#work" },
    { label: "Events", href: "/events", match: "/events" },
    { label: "Blog", href: "/blog", match: "/blog" },
    { label: "Shop", href: "/shop", match: "/shop" },
  ],
  cartHref: "/shop/cart",
  loginHref: "/login",
  loginLabel: "Login",
  cta: { label: "Start a project", href: "/#contact" },
};

export const academyHeader: HeaderConfig = {
  home: "/academy",
  logoSuffix: "academy",
  nav: [
    { label: "Tech Solutions", href: "/" },
    { label: "Courses", href: "/academy#courses" },
    { label: "Events", href: "/events" },
    { label: "Shop", href: "/academy/shop", match: "/academy/shop" },
    { label: "Jamboard", href: "/jamboard" },
    { label: "Compiler", href: site.compilerUrl, external: true },
  ],
  cartHref: "/academy/shop/cart",
  loginHref: "/login",
  loginLabel: "Student login",
  cta: { label: "Book a free demo", href: "/academy#demo" },
};

export const footerNav = [
  {
    title: "TECH SOLUTIONS",
    links: [
      { label: "Services", href: "/#studio" },
      { label: "Work", href: "/#work" },
      { label: "Start a project", href: "/#contact" },
    ],
  },
  {
    title: "ACADEMY",
    links: [
      { label: "Courses", href: "/academy" },
      { label: "Events", href: "/events" },
      { label: "Jamboard", href: "/jamboard" },
      { label: "Student login", href: "/login" },
    ],
  },
  {
    title: "MORE",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Shop", href: "/shop" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export const stats = [
  { value: "[00]+", label: "Projects shipped" },
  { value: "[00]+", label: "Students trained" },
  { value: "[00]+", label: "Workshops & events" },
  { value: "[YEAR]", label: "Writing code since", highlight: true },
];
