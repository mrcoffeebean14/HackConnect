import Navbar from "../compounts/Navbar";
import Hero from "../compounts/Hero";
import Features from "../compounts/Features";
import About from "../compounts/About";
import Footer from "../compounts/Footer";
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