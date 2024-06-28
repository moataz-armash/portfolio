import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { isOmittedExpression } from "typescript";
function Navbar() {
  useEffect(() => {
    const btnNavEl = document.querySelector(".btn-mobile-nav");
    const headerEl = document.querySelector(".header");

    if (btnNavEl && headerEl) {
      btnNavEl.addEventListener("click", function () {
        headerEl.classList.toggle("nav-open");
      });
    }

    // Fix flexbox gap property
    function checkFlexGap() {
      const flex = document.createElement("div");
      flex.style.display = "flex";
      flex.style.flexDirection = "column";
      flex.style.rowGap = "1px";

      flex.appendChild(document.createElement("div"));
      flex.appendChild(document.createElement("div"));

      document.body.appendChild(flex);
      const isSupported = flex.scrollHeight === 1;
      flex.parentNode?.removeChild(flex);
      console.log(isSupported);

      if (!isSupported) document.body.classList.add("no-flexbox-gap");
    }

    checkFlexGap();
  }, []);

  const [isOpen, setIsOpen] = useState(true);
  const clickHandle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className={isOpen ? "header" : "header nav-open"}>
        <div className="logo-side">
          <div className="logo">&nbsp;</div>
          <div className="letter">DevMoataz</div>
        </div>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <NavLink href="/" text="Home" closeMenu={closeMenu} />
            </li>
            <li>
              <NavLink
                href="/about"
                text="Front-end skills"
                closeMenu={closeMenu}
              />
            </li>
            <li>
              <NavLink
                href="/portfolio"
                text="portfolio"
                closeMenu={closeMenu}
              />
            </li>
            <li>
              <NavLink href="/contact" text="contact" closeMenu={closeMenu} />
            </li>
          </ul>
        </nav>
        <button onClick={clickHandle} className="btn-mobile-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-mobile-nav open">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-mobile-nav close">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>
    </>
  );
}

export default Navbar;
