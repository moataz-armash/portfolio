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
      <header className="main-header">
        <div className="logo-side">
          <div className="logo"></div>
          <div className="letter">DevMoataz</div>
        </div>
        <nav>
          <NavLink href="/" text="Home" />
          <NavLink href="/pagefrontend" text="Front-end skills" />
          <NavLink href="/portfolio" text="portfolio" />
          <NavLink href="/contact" text="contact" />

          {/* <Link className={`nav-link`} href="/pagefrontend">
            Front-end skills
          </Link>
          <Link className={`nav-link`} onClick={handleClick} href="/portfolio">
            portfolio
          </Link>
          <Link className={`nav-link`} onClick={handleClick} href="/contact">
            contact
          </Link> */}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
