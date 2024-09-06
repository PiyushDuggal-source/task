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
    <div className="flex bg-[#fafafa] py-20 flex-col items-center justify-center">
      <div>
        <h2 className="text-[#484848] text-2xl sm:text-5xl mb-4 volkhov-regular">
          This Is What Our Customers Say
        </h2>
        <p className="text-[#767676] text-sm text-center mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis
        </p>
      </div>

      <div className="container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
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
              spaceBetween: 50,
            },
          }}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 10,
            scale: 0.6,
            stretch: 100,
            slideShadows: false,
            depth: 30,
            modifier: 1,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex my-4 bg-white px-8 justify-center items-center flex-col md:flex-row py-10 w-[200px] product-shadow rounded-lg poppins-regular gap-10 sm:w-auto sm:max-w-[699px]">
                <div className="sm:relative">
                  <img
                    alt=""
                    className="object-cover w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] z-50 relative"
                    src={testimonial.image}
                  />
                  <div className="hidden sm:absolute w-[200px] z-10 h-[200px] bg-[#D9D9D9] top-4 right-4"></div>
                </div>
                <div className="flex flex-col">
                  <q className="text-[#8a8a8a] w-[100px] sm:w-full text-sm sm:max-w-[300px]">
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
    </div>
  );
};

export default Testimonials;
