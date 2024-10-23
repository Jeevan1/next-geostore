type NavItem = {
  label: string;
  path?: string;
  submenu?: NavItem[];
};

export const navData: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Women's", path: "/products/category/women" },
  {
    label: "Men's",
    path: "/products/category/men",
  },
  {
    label: "Pages",
    path: "/",
    submenu: [
      { label: "About Us", path: "/about" },
      { label: "Products", path: "/products" },
      { label: "Contact Us", path: "/contact-us" },
    ],
  },
  { label: "Features", path: "/" },
  { label: "Explore", path: "/" },
];
