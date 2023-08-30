import { useRouter } from "next/router";
import Link from "next/link";
import { useRef, useState } from "react";
import NavLink from "./NavLink";
function Navbar() {
  const router = useRouter();
  // const style = {
  //   color: router.asPath === href ? "#fff" : "hsla(0, 0%, 100%, 0.5)",
  // };
  // const handleClick = (e: any) => {
  //   e.preventDefault();
  //   router.push(href);
  // };
  return (
    <>
      <header className="header">
        <div className="logo-side">
          <div className="logo">&nbsp;</div>
          <div className="letter">DevMoataz</div>
        </div>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <NavLink href="/" text="Home" />
            </li>
            <li>
              <NavLink href="/about" text="Front-end skills" />
            </li>
            <li>
              <NavLink href="/portfolio" text="portfolio" />
            </li>
            <li>
              <NavLink href="/contact" text="contact" />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
