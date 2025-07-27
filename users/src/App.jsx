import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Introduction from "./components/Introduction";
import "./App.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <Introduction />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default Home;