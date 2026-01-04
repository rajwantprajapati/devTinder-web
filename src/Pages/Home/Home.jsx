import { Outlet } from "react-router";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";

const Home = () => {
  return (
    <>
      <NavBar />

      <Outlet />

      <Footer />
    </>
  );
};

export default Home;
