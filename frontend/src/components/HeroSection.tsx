import React, { useEffect } from "react";
import { AuthContext, UserOrNull } from "../context/AuthContext";
import {
  HeroSection as HeroSectionType,
  IUserSettingsProps,
} from "../types/types";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { updateUserSettings } from "../service/service";
import { toast } from "react-toastify";
import PrimaryButton from "./common/PrimaryButton";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [user, setUser] = React.useState<UserOrNull>(null);
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
      const { user, userSettings } = authContext;

      setUser(user);
      setUserSettings(userSettings);
    }
  }, [user, authContext]);

  const deleteImage = async (image: keyof HeroSectionType) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?",
    );

    if (!confirmDelete) {
      return;
    }

    if (userSettings) {
      const updatedHeroSection = {
        ...userSettings.heroSection,
        [image]: "",
      };
      const updatedUserSettings = {
        ...userSettings,
        heroSection: updatedHeroSection,
      };

      try {
        const res = await updateUserSettings(updatedUserSettings);
        if (res == null) {
          throw new Error("Error deleting image");
        }

        if (res.status !== 201) {
          throw new Error("Error deleting image");
        }

        setUserSettings(updatedUserSettings);
        authContext?.setProfileSettings(updatedUserSettings);
        toast.success("Image deleted successfully");
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("Error deleting image");
      }
    }
  };

  if (authContext === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row h-[550px] w-full py-4 justify-center sm:px-20 bg-[#D9D9D9]">
      <div className="hidden sm:flex relative justify-end w-[33%]">
        {userSettings?.heroSection.image1 &&
          userSettings?.heroSection.image1.length > 0 && (
            <img
              className="object-cover w-[250px] shadow-md rounded-lg"
              src={userSettings?.heroSection.image1}
              alt="login"
            />
          )}

        {userSettings?.heroSection.image1 &&
          userSettings?.heroSection.image1.length > 0 && (
            <div className="absolute hidden gap-1 mt-4 sm:flex right-4">
              <div
                onClick={() => navigate("/editor")}
                className="p-1 bg-white rounded-full cursor-pointer"
              >
                <FaRegEdit />
              </div>
              <div
                onClick={() => deleteImage("image1")}
                className="p-1 bg-white rounded-full cursor-pointer"
              >
                <FaRegTrashCan />
              </div>
            </div>
          )}
      </div>
      <div className="flex flex-col items-center sm:w-[33%]">
        <div className="relative h-[20%]">
          {userSettings?.heroSection.image3 &&
            userSettings?.heroSection.image3.length > 0 && (
              <img
                className="object-cover h-[100px] w-[300px] rounded-lg"
                src={userSettings?.heroSection.image3}
                alt="login"
              />
            )}
          {userSettings?.heroSection.image3 &&
            userSettings?.heroSection.image3.length > 0 && (
              <div className="absolute hidden gap-1 -mt-24 sm:flex left-60">
                <div
                  onClick={() => navigate("/editor")}
                  className="p-1 bg-white rounded-full cursor-pointer"
                >
                  <FaRegEdit />
                </div>
                <div
                  onClick={() => deleteImage("image3")}
                  className="p-1 bg-white rounded-full cursor-pointer"
                >
                  <FaRegTrashCan />
                </div>
              </div>
            )}
        </div>
        <div className="flex relative flex-col justify-center items-center h-[60%] text-[#484848]">
          <h1 className="text-6xl font-medium text-center">
            {userSettings?.heroSection.heading1}
          </h1>
          <h1 className="text-[120px] leading-[120px] font-bold text-center">
            {userSettings?.heroSection.heading2}
          </h1>
          <p>{userSettings?.heroSection.description}</p>
          <PrimaryButton className="mt-4 w-[140px!important]">
            SHOP NOW
          </PrimaryButton>

          <div className="absolute hidden gap-1 mb-[280px] sm:flex -right-0">
            <div
              onClick={() => navigate("/editor")}
              className="p-1 bg-white rounded-full cursor-pointer"
            >
              <FaRegEdit />
            </div>
          </div>
        </div>
        <div className="relative h-[20%]">
          {userSettings?.heroSection.image4 &&
            userSettings?.heroSection.image4.length > 0 && (
              <img
                className="object-cover h-[100px] w-[300px] rounded-lg"
                src={userSettings?.heroSection.image4}
                alt="login"
              />
            )}
          {userSettings?.heroSection.image4 &&
            userSettings?.heroSection.image4.length > 0 && (
              <div className="absolute hidden gap-1 -mt-24 sm:flex left-60">
                <div
                  onClick={() => navigate("/editor")}
                  className="p-1 bg-white rounded-full cursor-pointer"
                >
                  <FaRegEdit />
                </div>
                <div
                  onClick={() => deleteImage("image4")}
                  className="p-1 bg-white rounded-full cursor-pointer"
                >
                  <FaRegTrashCan />
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="hidden sm:flex relative justify-start w-[33%]">
        {userSettings?.heroSection.image2 &&
          userSettings?.heroSection.image2.length > 0 && (
            <img
              className="object-cover w-[250px] shadow-md rounded-lg"
              src={userSettings?.heroSection.image2}
              alt="login"
            />
          )}
        {userSettings?.heroSection.image2 &&
          userSettings?.heroSection.image2.length > 0 && (
            <div className="absolute hidden gap-1 mt-4 sm:flex right-36">
              <div
                onClick={() => navigate("/editor")}
                className="p-1 bg-white rounded-full cursor-pointer"
              >
                <FaRegEdit />
              </div>
              <div
                onClick={() => deleteImage("image2")}
                className="p-1 bg-white rounded-full cursor-pointer"
              >
                <FaRegTrashCan />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default HeroSection;
