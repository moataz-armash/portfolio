import Navbar from "@/components/Navbar";
import Subject from "@/components/Subject";
import Gallery from "../../components/Gallery";
import Footer from "@/components/Footer";

function PortfolioPage() {
  return (
    <>
      <Navbar />
      <Subject title="portfolio" />
      <Gallery />
      <Footer />
    </>
  );
}

export default PortfolioPage;
