import React, { useEffect } from "react";
import { AuthContext, UserOrNull } from "../context/AuthContext";
import { IUserSettingsProps } from "../types/types";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const HeroSection = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<UserOrNull>(null);
  const [userSettings, setUserSettings] =
    React.useState<IUserSettingsProps | null>(null);

  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (
      authContext !== undefined &&
      authContext.user !== null &&
      authContext.userSettings !== null
    ) {
      const { user, userSettings } = authContext;

      setUser(user);
      setUserSettings(userSettings);
      setLoading(false);
    }
  }, [user, userSettings, authContext]);

  if (authContext === undefined) {
    return <div>Loading...</div>;
  }

  console.log("user:", user);
  console.log("userSettings:", userSettings);
  return (
    <div className="flex flex-row h-[550px] w-full py-4 px-20 bg-[#D9D9D9]">
      <div className="flex justify-end w-[33%]">
        {userSettings?.heroSection.image1 &&
          userSettings?.heroSection.image1.length > 0 && (
            <img
              className="object-cover w-[250px] shadow-md rounded-lg"
              src={userSettings?.heroSection.image1}
              alt="login"
            />
          )}
      </div>
      <div className="flex flex-col items-center w-[33%]">
        <div className="h-[20%]">
          {userSettings?.heroSection.image3 &&
            userSettings?.heroSection.image3.length > 0 && (
              <img
                className="object-cover h-[100px] w-[300px] rounded-lg"
                src={userSettings?.heroSection.image3}
                alt="login"
              />
            )}
        </div>
        <div className="h-[60%]"></div>
        <div className="h-[20%]">
          {userSettings?.heroSection.image4 &&
            userSettings?.heroSection.image4.length > 0 && (
              <img
                className="object-cover h-[100px] w-[300px] rounded-lg"
                src={userSettings?.heroSection.image4}
                alt="login"
              />
            )}
        </div>
      </div>
      <div className="relative flex justify-start w-[33%]">
        {userSettings?.heroSection.image2 &&
          userSettings?.heroSection.image2.length > 0 && (
            <img
              className="object-cover w-[250px] shadow-md rounded-lg"
              src={userSettings?.heroSection.image2}
              alt="login"
            />
          )}
        <div className="absolute flex gap-1 mt-4 right-44">
          <div className="p-1 bg-white rounded-full">
            <FaRegEdit />
          </div>
          <div className="p-1 bg-white rounded-full">
            <FaRegTrashCan />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
