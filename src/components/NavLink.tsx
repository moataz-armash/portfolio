import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavLinkProps {
  href?: any;
  text?: string;
  closeMenu?: any;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text, closeMenu }) => {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? "#fff" : "#ffffff80",
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
    closeMenu(); // Call the closeMenu function passed as a prop
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
