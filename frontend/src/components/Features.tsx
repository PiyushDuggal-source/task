import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { RiCustomerService2Line } from "react-icons/ri";
import { SlStar, SlBadge } from "react-icons/sl";

const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-16 py-10 sm:flex-row poppins-regular">
      <div className="flex items-center justify-center gap-3">
        <div>
          <SlStar fontSize={32} />
        </div>
        <div className="flex flex-col text-[#484848]">
          <p className="text-lg">High Quality</p>
          <p className="text-sm">crafted from top material</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div>
          <SlBadge fontSize={32} />
        </div>
        <div className="flex flex-col text-[#484848]">
          <p className="text-lg">Warranty Protection</p>
          <p className="text-sm">over 2 years</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div>
          <BsBoxSeam fontSize={32} />
        </div>
        <div className="flex flex-col text-[#484848]">
          <p className="text-lg">Free Shipping</p>
          <p className="text-sm">Order over $ 150</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div>
          <RiCustomerService2Line fontSize={32} />
        </div>
        <div className="flex flex-col text-[#484848]">
          <p className="text-lg">24 / 7 Support</p>
          <p className="text-sm">Dedicated support</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
