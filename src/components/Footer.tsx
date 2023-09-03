import Link from "next/link";
import { useState } from "react";

function Footer() {
  const [currentYear, setCurrentYear] = useState("2023");
  const autoYear = new Date().getFullYear().toString();
  if (autoYear !== currentYear) {
    setCurrentYear(autoYear);
  }

  return (
    <>
      <div className="line"></div>
      <footer>
        <nav className="main-footer-link">
          <ul className="footer-link-list">
            <Link
              className="footer-link"
              href="https://github.com/moataz-armash/"
              target="_blank">
              Github
            </Link>
            <Link
              className="footer-link"
              href="https://www.linkedin.com/in/moataz-mohamed-b69404204/"
              target="_blank">
              Linkedin
            </Link>
          </ul>
        </nav>
        <p className="copywrite">&copy; {currentYear} DevMoataz</p>
      </footer>
    </>
  );
}

export default Footer;
