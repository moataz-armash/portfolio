import Head from "next/head";
import Navbar from "@/components/Navbar";
import PageContent from "@/components/HomePage/PageContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>MotazSec</title>
        <meta
          name="description"
          content="MotazSec — Full Stack Developer & Security Enthusiast"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <PageContent />
      <Footer />
    </>
  );
}
