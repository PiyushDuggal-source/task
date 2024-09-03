import React, { useEffect } from "react";
import { ITestimonial } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

import { Autoplay, EffectCoverflow } from "swiper/modules";
import { IoStar } from "react-icons/io5";

const Testimonials = () => {
  const [testimonials, setTestimonials] = React.useState<ITestimonial[]>([]);

  const authContext = React.useContext(AuthContext);
  useEffect(() => {
    if (
      authContext !== undefined &&
      authContext.user !== null &&
      authContext.userSettings !== null
    ) {
      const { userSettings } = authContext;

      const testimonials = userSettings.testimonials;
      setTestimonials(testimonials);
    }
  }, [authContext]);
  return (
    <div className="container flex items-center justify-center py-8">
      <h2 className="text-[#484848] text-2xl volkhov-regular">Testimonials</h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
        }}
        coverflowEffect={{
          rotate: 10,
          scale: 0.6,
          stretch: 100,
          depth: 30,
          modifier: 1,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex my-4 bg-white px-8 py-10 product-shadow rounded-lg poppins-regular gap-10 max-w-[700px]">
              <div className="relative">
                <img
                  alt=""
                  className="object-cover w-[200px] h-[200px] z-50 relative"
                  src={testimonial.image}
                />
                <div className="absolute w-[200px] z-10 h-[200px] bg-[#D9D9D9] top-4 right-4"></div>
              </div>
              <div className="flex flex-col">
                <q className="text-[#8a8a8a] text-sm max-w-[300px]">
                  "{testimonial.message}"
                </q>
                <div className="flex text-[#FCA120] py-5">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </div>
                <hr className="w-40 border-[#8a8a8a] border-t-1" />
                <h3 className="text-[#484848] text-lg volkhov-regular pt-5">
                  {testimonial.name}
                </h3>
                <p className="test-sm text-[#484848]">{testimonial.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
