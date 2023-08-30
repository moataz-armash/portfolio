import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavLinkProps {
  href?: any;
  text?: string;
  open?: any;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text, open }) => {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? "#fff" : "#ffffff80",
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <>
      <Link
        className={`main-nav-link`}
        onClick={handleClick}
        style={style}
        href={href}>
        {text}
      </Link>
    </>
  );
};

export default NavLink;
