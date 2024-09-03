import React, { useEffect } from "react";
import { IUserSettingsProps } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import PrimaryButton from "./common/PrimaryButton";
import { FaRegEdit } from "react-icons/fa";

const FeatureImgSection = () => {
  const [userSettings, setUserSettings] =
    React.useState<IUserSettingsProps | null>(null);

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
    <div className="flex flex-col sm:h-[450px] sm:flex-row mx-auto px-auto w-full justify-center items-center max-w-[1440px]">
      <div className="sm:w-[50%]">
        <img
          src={userSettings?.section2.image}
          className="object-cover h-[450px] w-full"
          alt="feature"
        />
      </div>
      <div className="flex flex-col sm:w-[50%] h-full p-12 bg-[#FFF7DC]">
        <h5 className="text-xl poppins-regular text-[#767676]">
          {userSettings?.section2.subheading}
        </h5>
        <h2 className="my-4 text-3xl text-[#484848] volkhov-regular">
          {userSettings?.section2.heading}
        </h2>
        <p className="my-4 underline">DESCRIPTION</p>

        <p className="text-sm mb-4 max-w-[400px] poppins-regular text-[#767676]">
          {userSettings?.section2.description}
        </p>
        <p className="text-xl font-bold">$ {userSettings?.section2.price}.00</p>
        <PrimaryButton className="mt-4 w-[140px]">Buy Now</PrimaryButton>

        <div className="absolute z-10 hidden gap-1 cursor-pointer right-10 sm:flex">
          <div className="p-1 bg-white rounded-full cursor-pointer">
            <FaRegEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureImgSection;
