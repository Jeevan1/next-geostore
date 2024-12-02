type NavItem = {
  label: string;
  path?: string;
  submenu?: NavItem[];
};

export const navData: NavItem[] = [
  // { label: "Home", path: "/" },
  // // { label: "Women's", path: "/products/category/women" },
  // // {
  // //   label: "Men's",
  // //   path: "/products/category/men",
  // // },
  {
    label: "Pages",
    path: "",
    submenu: [
      { label: "About Us", path: "/about" },
      { label: "Products", path: "/products" },
      { label: "Contact Us", path: "/contact-us" },
    ],
  },
  { label: "Features", path: "/" },
  // { label: "Explore", path: "/" },
];

export const checkoutFormData = [
  {
    id: 1,
    name: "email",
    title: "Email Address",
    label: "Email",
    type: "email",
    placeholder: "Enter your first name",
  },
  {
    id: 2,
    name: "firstName",
    title: "First Name",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
  },
  {
    id: 3,
    name: "lastName",
    title: "Last Name",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
  },
  {
    id: 4,
    name: "phone",
    title: "Phone Number",
    label: "Phone",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    id: 5,
    name: "address",
    title: "Delivery Address",
    label: "Address",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    id: 6,
    name: "address",
    title: "Delivery Address",
    label: "Address",
    type: "checkbox",
    placeholder: "Enter your address",
  },
];
