import Link from "next/link";

function Footer() {
  return (
    <footer>
      <menu className="left-side">
        <ul>
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
      </menu>
      <aside className="right-side">
        <p className="copywrite">&copy; 2023 Dev Moataz</p>
      </aside>
    </footer>
  );
}

export default Footer;
