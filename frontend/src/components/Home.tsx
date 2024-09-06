import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import HeroSection from "./HeroSection";
import Sponsor from "./Sponsor";
import ProductSection from "./ProductSection";
import FeatureImgSection from "./FeatureImgSection";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="flex mx-auto flex-col items-center justify-center max-w-[1440px]">
      <Nav />
      <HeroSection />
      <Sponsor />
      <ProductSection />
      <FeatureImgSection />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
