import React from "react";
import Header from "../Components/Header/Header";
import Feature from "../Components/Feature/Feature";
import Service from "../Components/Service/Service";
import Testimonial from "../Components/Testimonial/Testimonial";
import Footer from "../Components/Footer/Footer";

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
