import React, { useEffect } from "react";
import { IUserSettingsProps, Product } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import { IoStar } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import PrimaryButton from "./common/PrimaryButton";
import { FaRegTrashCan } from "react-icons/fa6";
import { updateUserSettings } from "../service/service";
import { toast } from "react-toastify";

const ProductSection = () => {
  const [userSettings, setUserSettings] =
    React.useState<IUserSettingsProps | null>(null);

  const [userProducts, setUserProducts] = React.useState<Product[]>([]);

  const authContext = React.useContext(AuthContext);
  useEffect(() => {
    if (
      authContext !== undefined &&
      authContext.user !== null &&
      authContext.userSettings !== null
    ) {
      const { userSettings } = authContext;

      setUserSettings(userSettings);
      const products = userSettings.productPage.products;
      setUserProducts(products);
    }
  }, [authContext]);

  const deleteProduct = async (productId: string) => {
    console.log("productId:", productId);
    if (userSettings) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmDelete) {
        const updatedProducts = userSettings.productPage.products.filter(
          (product) => product._id !== productId
        );

        const updatedUserSettings = {
          ...userSettings,
          productPage: {
            ...userSettings.productPage,
            products: updatedProducts,
          },
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
          setUserProducts(updatedProducts);
          toast.success("Image deleted successfully");
        } catch (error) {
          console.error("Error deleting image:", error);
          toast.error("Error deleting image");
        }
      }
    }
  };

  return (
    <div className="py-10">
      <div className="relative">
        <h1 className="text-5xl text-center volkhov-regular text-[#484848]">
          {userSettings?.productPage.heading}
        </h1>
        <div className="flex justify-center">
          <p className="text-sm poppins-regular max-w-[600px] text-center mt-4 text-[#8a8a8a]">
            {userSettings?.productPage.description}
          </p>
        </div>
        <div className="absolute right-0 z-10 hidden gap-1 -mt-24 sm:flex">
          <PrimaryButton>Add product</PrimaryButton>
        </div>
      </div>

      <div className="container grid items-center justify-center gap-4 py-8 sm:grid-cols-3">
        {userProducts.map((product, index) => (
          <div
            key={product._id}
            className="w-[300px] relative p-4 product-shadow rounded-lg poppins-regular"
          >
            <img
              src={product.image}
              className="object-cover w-full rounded-lg"
              alt="product"
            />
            <div className="flex justify-between mt-2">
              <p>{product.name}</p>
              <div className="flex text-[#FCA120]">
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
              </div>
            </div>
            <div className="flex justify-between text-[12px] text-[#8a8a8a]">
              <p>Long Dress</p>
            </div>
            <div className="flex py-4 justify-between text-[12px]">
              <p>(4.1k) Customer Reviews</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl">$ 100</p>
              <p className="text-[12px] text-[#ff4646]">Almost sold out</p>
            </div>

            <div className="absolute z-10 hidden gap-1 top-6 right-6 sm:flex">
              <div className="p-1 bg-white rounded-full cursor-pointer">
                <FaRegEdit />
              </div>

              <div
                onClick={() => deleteProduct(product._id)}
                className="p-1 bg-white rounded-full cursor-pointer"
              >
                <FaRegTrashCan />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
