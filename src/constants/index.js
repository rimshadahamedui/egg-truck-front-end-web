import {
  CheckCircle,
  Container,
  Hourglass,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import {
  MdHome,
  MdImage,
  MdShoppingCart,
  MdCategory,
  MdTag,
  MdLocalOffer,
  MdPeople,
} from "react-icons/md";

import { Icon } from "@chakra-ui/react";
import env from "../utils/config/env";

export const categoryRegex = /^[A-Z][a-zA-Z0-9\s'’-]*$/;
export const nameRegex = /^[A-Z][a-z]+(?: [a-zA-Z]+)*$/;
export const phoneRegex = /^[0-9]{10}$/;
export const USER_URL = "/user/e-com";
export const ADMIN_URL = "/admin/e-com";
export const SHIPPING_CHARGE = 5;
export const GST_IN_PERCENTAGE = 18;
export const MIN_TEXT_AREA_HEIGHT = 32;
export const PAYPAL_INITIAL_OPTIONS = {
  clientId: env.PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};
export const darkColor = "#0b1437";
export const darkCardBg = "#111c44";
export const allowedImageFileTypes = ["image/jpeg", "image/png", "image/webp"];

export const productHeaders = [
  "Photo",
  "Product Name",
  // "Category",
  "Price",
  "Stock",
  "Created At",
  "List/Unlist",
  "Actions",
  "Offer",
  "Reviews",
];

export const categoryHeaders = [
  "S.No",
  "Category Name",
  "Created At",
  "List/Unlist",
  "Subcategory",
  "Actions",
  "Offers",
];

export const offerTableHeaders = [
  "S.No",
  "Offer Name",
  "Code",
  "Discount",
  "Valid From",
  "Valid Until",
  "List/Unlist",
  "Actions",
];
export const bannerTableHeaders = [
  "S.No",
  "Image",
  "Title",
  // "Start Date",
  // "End Date",
  // "List/Unlist",
  "Actions",
];
export const userTableHeaders = [
  "S.No",
  "Name",
  "Email",
  "Is Verified",
  "Joined Date",
  "Actions",
];

export const orderStatusIcons = {
  initiated: <Package className="size-5 text-blue-500" />,
  shipped: <Container className="size-5 text-purple-500" />,
  outForDelivery: <Truck className="size-5 text-yellow-500" />,
  delivered: <CheckCircle className="size-5 text-green-500" />,
  cancelled: <XCircle className="size-5 text-red-500" />,
  pending: <Hourglass className="size-5 text-yellow-500" />,
};

export const orderStatusLabels = {
  pending: "Pending",
  initiated: "Order Initiated",
  shipped: "Shipped",
  outForDelivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Order Cancelled",
};

export const validTransitions = {
  pending: ["shipped", "cancelled"],
  initiated: ["shipped", "cancelled"],
  shipped: ["outForDelivery", "cancelled"],
  outForDelivery: ["delivered", "cancelled"],
  delivered: ["cancelled"],
  cancelled: [],
};

export const adminSidebarRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <Icon as={MdHome} width="22px" height="22px" color="inherit" />,
  },
  {
    path: "/admin/orders",
    name: "Orders",
    icon: (
      <Icon as={MdShoppingCart} width="22px" height="22px" color="inherit" />
    ),
  },
  {
    path: "/admin/products",
    name: "Products",
    icon: <Icon as={MdCategory} width="22px" height="22px" color="inherit" />,
  },
  {
    path: "/admin/categories",
    name: "Categories",
    icon: <Icon as={MdTag} width="22px" height="22px" color="inherit" />,
  },
  {
    path: "/admin/offers",
    name: "Offers",
    icon: <Icon as={MdLocalOffer} width="22px" height="22px" color="inherit" />,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: <Icon as={MdPeople} width="22px" height="22px" color="inherit" />,
  },
  {
    path: "/admin/banners",
    name: "Banners",
    icon: <Icon as={MdImage} width="22px" height="22px" color="inherit" />,
  },
];
