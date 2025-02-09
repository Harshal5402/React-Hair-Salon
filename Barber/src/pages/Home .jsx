import React from "react";
import Header from "../../../Frontend/src/Components/Header/Header";
import Feature from "../../../Frontend/src/Components/Feature/Feature";
import Service from "../../../Frontend/src/Components/Service/Service";
import Testimonial from "../../../Frontend/src/Components/Testimonial/Testimonial";
import Footer from "../../../Frontend/src/Components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Feature />
      <Service />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
