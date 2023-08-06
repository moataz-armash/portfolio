import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text }) => {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? "#fff" : "hsla(0, 0%, 100%, 0.5)",
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <Link
      className={`nav-link`}
      onClick={handleClick}
      style={style}
      href={href}>
      {text}
    </Link>
  );
};

export default NavLink;
