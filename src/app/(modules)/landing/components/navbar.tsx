import { NavBarItem } from "./nav-bar-item";

interface NavBarProps {
  className: string;
}

const landingNavBarItems = [
  {
    content: "INICIO",
    href: "/home",
  },
  {
    content: "TIENDA",
    href: "/shop",
  },
  {
    content: "BLOG",
    href: "/blog",
  },
  {
    content: "NOSOTROS",
    href: "/about-us",
  },
  {
    content: "CONTACTO",
    href: "/contact-us",
  },
];

export default function NavBar({ className }: NavBarProps) {
  return (
    <div className={className}>
      {landingNavBarItems.map((item, index) => (
        <NavBarItem key={index} href={item.href}>
          {item.content}
        </NavBarItem>
      ))}
    </div>
  );
}
