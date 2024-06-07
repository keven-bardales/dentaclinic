import Link from "next/link";

interface NavBarProps {
  className: string;
}

const landingNavBarItems = [
  {
    content: "HOME",
  },
  {
    content: "SHOP",
  },
  {
    content: "BLOG",
  },
  {
    content: "ABOUT US",
  },
  {
    content: "CONTACT US",
  },
];

export default function NavBar({ className }: NavBarProps) {
  return (
    <div className={className}>
      {landingNavBarItems.map((item, index) => (
        <NavBarItem key={index} href={"/landing/" + item.content.toLowerCase().replace(" ", "-")}>
          {item.content}
        </NavBarItem>
      ))}
    </div>
  );
}

interface NavBarItemProps {
  children: React.ReactNode;
  href: string;
}

function NavBarItem({ children, href }: NavBarItemProps) {
  return (
    <Link
      className="text-landing-secondary-main font-bold text-lg px-2 py-2 hover:bg-landing-primary-main hover:text-white rounded-lg transition-all duration-300"
      href={href}
    >
      {children}
    </Link>
  );
}
