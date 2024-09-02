import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[1440px]">
      <Nav />
      <HeroSection />
    </div>
  );
};

export default Home;
