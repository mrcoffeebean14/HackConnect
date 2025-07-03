import Navbar from "../compounts/home/Navbar";
import Hero from "../compounts/home/Hero";
import Features from "../compounts/home/Features";
import About from "../compounts/home/About";
import Footer from "../compounts/home/Footer";
function Index() {
    return (
    <div className="min-h-screen">
      <Navbar />
      <Hero/>
      <Features/>
      <About/>
      <Footer/>
    </div>
  );
}
export default Index;