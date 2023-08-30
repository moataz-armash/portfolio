import ContactInfo from "@/components/ContactPage/ContactInfo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Subject from "@/components/Subject";

function contactPage() {
  return (
    <div>
      <Navbar />
      <Subject title="Contact" />
      <ContactInfo />
      <Footer />
    </div>
  );
}

export default contactPage;
