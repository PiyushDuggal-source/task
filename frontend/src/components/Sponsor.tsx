import React, { useEffect } from "react";
import { IUserSettingsProps } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sponsor = () => {
  const [userSettings, setUserSettings] =
    React.useState<IUserSettingsProps | null>(null);

  const navigate = useNavigate();

  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (
      authContext !== undefined &&
      authContext.user !== null &&
      authContext.userSettings !== null
    ) {
      const { userSettings } = authContext;

      setUserSettings(userSettings);
    }
  }, [authContext]);

  return (
    <div className="container flex items-center justify-center py-8">
      <Swiper
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {userSettings?.sponsors.images.map((sponsor, index) => (
          <SwiperSlide key={index}>
            <div className="w-40 h-14">
              <img src={sponsor} className="" alt="sponsor" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute z-10 hidden gap-1 sm:flex right-12">
        <div onClick={() => navigate("/editor")} className="p-1 bg-white rounded-full cursor-pointer">
          <FaRegEdit />
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
