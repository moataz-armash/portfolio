import Link from "next/link";

function Footer() {
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
        <p className="copywrite">&copy; 2023 DevMoataz</p>
      </footer>
    </>
  );
}

export default Footer;
