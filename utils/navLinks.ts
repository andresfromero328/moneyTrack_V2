import { IconType } from "react-icons";
import { FaCalendar, FaChartPie, FaHome } from "react-icons/fa";

export interface NAVLINKTYPE {
  icon: IconType;
  text: string;
  href: string;
}

export const NAVLINKS: NAVLINKTYPE[] = [
  {
    icon: FaHome,
    text: "dashboard",
    href: "/",
  },
  {
    icon: FaCalendar,
    text: "calendar",
    href: "/calendar",
  },
  {
    icon: FaChartPie,
    text: "reports",
    href: "/reports",
  },
];
