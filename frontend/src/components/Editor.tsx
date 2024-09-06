import React, { useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  HeroSection,
  ITestimonial,
  IUserSettingsProps,
  Product,
  ProductPage,
  Section2,
  Sponsors,
} from "../types/types";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { updateUserSettings } from "../service/service";
import FormikErrorMessage from "./common/ErrorField";
import EditField from "./common/EditField";
import EditorTextArea from "./common/EditorTextArea";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./common/PrimaryButton";
import SecondaryButton from "./common/SecondaryButton";
import { IoStar } from "react-icons/io5";

const heroSectionSchema = Yup.object().shape({
  image1: Yup.string(),
  image2: Yup.string(),
  image3: Yup.string(),
  image4: Yup.string(),
  heading1: Yup.string().required("Heading 1 is required"),
  heading2: Yup.string().required("Heading 2 is required"),
  description: Yup.string().required("Description is required"),
});

const Editor = () => {
  const [userSettings, setUserSettings] =
    React.useState<IUserSettingsProps | null>(null);
  const [heroSection, setHeroSection] = React.useState<HeroSection>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    heading1: "",
    heading2: "",
    description: "",
  });

  const [sponsors, setSponsors] = React.useState<Sponsors>({
    images: [],
  });

  const [updatedSponsors, setUpdatedSponsors] =
    React.useState<Sponsors>(sponsors);

  const [productPage, setProductPage] = React.useState<ProductPage>({
    heading: "",
    description: "",
    products: [],
  });

  const [updatedProductPage, setUpdatedProductPage] =
    React.useState<ProductPage>(productPage);

  const [section2, setSection2] = React.useState<Section2>({
    image: "",
    description: "",
    heading: "",
    subheading: "",
    price: "",
  });

  const [testimonialsArray, setTestimonials] = React.useState<ITestimonial[]>(
    [],
  );

  const [updatedTestimonials, setUpdatedTestimonials] =
    React.useState<ITestimonial[]>(testimonialsArray);

  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authContext !== undefined &&
      authContext.user !== null &&
      authContext.userSettings !== null
    ) {
      const {
        userSettings: {
          heroSection,
          sponsors,
          productPage,
          section2,
          testimonials,
        },
      } = authContext;

      setUserSettings(authContext.userSettings);
      setHeroSection(heroSection);
      setSponsors(sponsors);
      setProductPage(productPage);
      setSection2(section2);
      setTestimonials(testimonials);
    }
  }, [authContext, userSettings]);

  const onSubmit = async <T extends keyof IUserSettingsProps>(
    values: IUserSettingsProps[T],
    key: T,
  ) => {
    if (!userSettings) return;

    const updatedUserSettings: IUserSettingsProps = {
      ...userSettings,
      [key]: {
        ...userSettings[key],
        ...values,
      },
    };

    try {
      const res = await updateUserSettings(updatedUserSettings);

      if (res == null) {
        throw new Error(`Error updating ${key}`);
      }

      if (res.status !== 201) {
        throw new Error(`Error updating ${key}`);
      }

      setUserSettings(updatedUserSettings);
      authContext?.setProfileSettings(updatedUserSettings);
      toast.success(
        `${key.charAt(0).toUpperCase() + key.slice(1)} updated successfully`,
      );
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      toast.error(`Error updating ${key}`);
    }
  };

  const removeSponsor = (index: number) => {
    const updatedSponsors = [...sponsors.images];
    updatedSponsors.splice(index, 1);
    setUpdatedSponsors({ ...sponsors, images: updatedSponsors });
    setSponsors({ ...sponsors, images: updatedSponsors });
  };

  const addSponsor = ({ image }: { image: string }) => {
    const updatedSponsors = [...sponsors.images, image];
    setUpdatedSponsors({ ...sponsors, images: updatedSponsors });
    setSponsors({ ...sponsors, images: updatedSponsors });
  };

  const deleteProduct = (index: number) => {
    const updatedProducts = [...productPage.products];
    updatedProducts.splice(index, 1);
    setUpdatedProductPage({ ...productPage, products: updatedProducts });
    setProductPage({ ...productPage, products: updatedProducts });
  };

  const addProduct = (product: Product) => {
    const newProduct = {
      name: product.name,
      image: product.image,
      category: product.category,
    };
    const updatedProducts = [...productPage.products, newProduct];
    setUpdatedProductPage({ ...productPage, products: updatedProducts });
    setProductPage({ ...productPage, products: updatedProducts });
  };

  const deleteTestimonial = (index: number) => {
    const updatedTestimonials = [...testimonialsArray];
    updatedTestimonials.splice(index, 1);
    setUpdatedTestimonials(updatedTestimonials);
    setTestimonials(updatedTestimonials);
  };

  const addTestmimonial = (testimonial: ITestimonial) => {
    const updatedTestimonials = [...testimonialsArray, testimonial];
    setUpdatedTestimonials(updatedTestimonials);
    setTestimonials(updatedTestimonials);
  };

  const addProductPageHeading = ({
    heading,
    description,
  }: {
    heading: string;
    description: string;
  }) => {
    setUpdatedProductPage({ ...productPage, heading, description });
    setProductPage({ ...productPage, heading, description });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-between py-6 w-full items-center px-10 border-b-2 mb-10">
        <h1 className="text-3xl font-bold volkhov-regular">FASCO</h1>
        <SecondaryButton
          onClick={() => navigate("/")}
          className="w-[150px!important]"
        >
          Preview
        </SecondaryButton>
      </div>

      <div className="px-4 pb-10 py-10 sm:px-10">
        <div>
          <h1 className="text-3xl text-center font-bold mb-8 volkhov-regular">
            Edit Hero Section
          </h1>
        </div>
        <Formik
          initialValues={heroSection as HeroSection}
          validationSchema={heroSectionSchema}
          onSubmit={(values) => onSubmit(values, "heroSection")}
          enableReinitialize={true}
        >
          <Form className="w-[500px]">
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <EditField type="text" label="Image 1 URL" name="image1" />
              <FormikErrorMessage name="image1" />
              <EditField type="text" name="image2" label="Image 2 URL" />
              <FormikErrorMessage name="image2" />
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-4">
              <EditField type="text" label="Image 3 URL" name="image3" />
              <FormikErrorMessage name="image3" />
              <EditField name="image4" label="Image 4 URL" type="text" />
              <FormikErrorMessage name="image4" />
            </div>

            <div>
              <EditField label="Heading 1" name="heading1" />
              <FormikErrorMessage name="heading1" />
            </div>

            <div>
              <label
                htmlFor="heading2"
                className="block text-sm font-medium text-gray-700"
              >
                Heading 2
              </label>
              <Field
                type="text"
                name="heading2"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <FormikErrorMessage name="heading2" />
            </div>

            <div>
              <EditorTextArea label="Description" name="description" />
              <FormikErrorMessage name="description" />
            </div>

            <div>
              <PrimaryButton type="submit">Update Hero Section</PrimaryButton>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="px-4 pb-10 py-10 sm:px-10">
        <div>
          <h1 className="text-3xl text-center font-bold mb-8 volkhov-regular">
            Edit Sponsors
          </h1>
        </div>

        <div className="grid grid-cols-2 py-5 gap-2 justify-center">
          {sponsors.images.map((image, index) => (
            <div
              className="flex gap-4 border-2 rounded-md py-4 px-2 text-center w-[300px] items-center justify-between"
              key={index}
            >
              <p className="w-[250px] text-ellipsis break-words text-sm">
                {image}
              </p>
              <div onClick={() => removeSponsor(index)}>
                <FaRegTrashCan />
              </div>
            </div>
          ))}
        </div>
        <Formik
          initialValues={{
            image: "",
          }}
          onSubmit={(values) => addSponsor(values)}
          enableReinitialize={true}
        >
          <Form>
            <EditField name="image" type="text" label="Sponsor Image URL" />
            <SecondaryButton className="my-4" type="submit">
              Add Sponsor
            </SecondaryButton>
          </Form>
        </Formik>
        <PrimaryButton onClick={() => onSubmit(updatedSponsors, "sponsors")}>
          Update Sponsors
        </PrimaryButton>
      </div>

      <div className="px-4 pb-10 py-10 sm:px-10">
        <div>
          <h1 className="text-3xl text-center font-bold mb-8 volkhov-regular">
            Add Products
          </h1>
        </div>

        <div className="grid grid-cols-3 py-5 gap-2 justify-center">
          {productPage.products.map((product, index) => (
            <div
              key={index}
              className="w-[200px] relative p-2 product-shadow rounded-lg poppins-regular"
            >
              <img
                src={product.image}
                className="object-cover w-full rounded-lg"
                alt="product"
              />
              <div className="flex text-sm justify-between mt-2">
                <p>{product.name}</p>
                <div className="flex text-sm text-[#FCA120]">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-[#8a8a8a]">
                <p>Long Dress</p>
              </div>
              <div className="flex py-4 justify-between text-[10px]">
                <p>(4.1k) Customer Reviews</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm">$ 100</p>
                <p className="text-[10px] text-[#ff4646]">Almost sold out</p>
              </div>

              <div className="absolute z-10 hidden gap-1 top-6 right-6 sm:flex">
                <div
                  onClick={() => deleteProduct(index)}
                  className="p-1 bg-white rounded-full cursor-pointer"
                >
                  <FaRegTrashCan />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Formik
          initialValues={{
            _id: `${Math.floor(Math.random() * 100000)}`,
            name: "",
            image: "",
            category: "",
          }}
          onSubmit={(values) => addProduct(values)}
          enableReinitialize={true}
        >
          <Form>
            <EditField name="name" type="text" label="Product Name" />

            <EditField name="image" type="text" label="Product Image URL" />
            <EditField name="category" type="text" label="Product Category" />

            <SecondaryButton className="my-4" type="submit">
              Add Product
            </SecondaryButton>
          </Form>
        </Formik>

        <h2 className="text-3xl font-bold mb-8 volkhov-regular mt-10">
          <span className="text-2xl">Heading</span>: {productPage.heading}
        </h2>
        <h2 className="text-xl w-[500px] font-bold mb-8 volkhov-regular mt-10">
          <span className="text-2xl">Description</span>:{" "}
          {productPage.description}
        </h2>

        <Formik
          initialValues={{
            heading: productPage.heading,
            description: productPage.description,
          }}
          onSubmit={(values) => addProductPageHeading(values)}
          enableReinitialize={true}
        >
          <Form>
            <EditField
              name="heading"
              type="text"
              label="Product Page Heading"
            />

            <EditField
              name="description"
              type="text"
              label="Product Page Description"
            />

            <SecondaryButton className="my-4" type="submit">
              Udpate
            </SecondaryButton>
          </Form>
        </Formik>
        <PrimaryButton
          onClick={() => onSubmit(updatedProductPage, "productPage")}
        >
          Update Product Page
        </PrimaryButton>
      </div>

      {/* <div className="px-4 pb-10 py-10 sm:px-10"> */}
      {/*   <div> */}
      {/*     <h1 className="text-3xl text-center font-bold mb-8 volkhov-regular"> */}
      {/*       Add Testimonials */}
      {/*     </h1> */}
      {/*   </div> */}
      {/**/}
      {/*   <div className="grid grid-cols-3 py-5 gap-2 justify-center"> */}
      {/*     {testimonialsArray.map((testimonial, index) => ( */}
      {/*       <div */}
      {/*         key={index} */}
      {/*         className="w-[200px] relative p-2 product-shadow rounded-lg poppins-regular" */}
      {/*       > */}
      {/*         <img */}
      {/*           src={testimonial.image} */}
      {/*           className="object-cover w-full rounded-lg" */}
      {/*           alt="product" */}
      {/*         /> */}
      {/*         <div className="flex text-sm justify-between mt-2"> */}
      {/*           <p>{testimonial.name}</p> */}
      {/*           <div className="flex text-sm text-[#FCA120]"> */}
      {/*             <IoStar /> */}
      {/*             <IoStar /> */}
      {/*             <IoStar /> */}
      {/*             <IoStar /> */}
      {/*             <IoStar /> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*         <div className="flex justify-between text-[10px] text-[#8a8a8a]"> */}
      {/*           <p>{testimonial.message}</p> */}
      {/*         </div> */}
      {/*         <div className="flex items-center justify-end mt-2"> */}
      {/*           <p className="text-[10px] text-[#ff4646]">{testimonial.role}</p> */}
      {/*         </div> */}
      {/**/}
      {/*         <div className="absolute z-10 hidden gap-1 top-6 right-6 sm:flex"> */}
      {/*           <div */}
      {/*             onClick={() => deleteTestimonial(index)} */}
      {/*             className="p-1 bg-white rounded-full cursor-pointer" */}
      {/*           > */}
      {/*             <FaRegTrashCan /> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     ))} */}
      {/*   </div> */}
      {/**/}
      {/*   <Formik */}
      {/*     initialValues={{ */}
      {/*       _id: `${Math.floor(Math.random() * 100000)}`, */}
      {/*       role: "", */}
      {/*       message: "", */}
      {/*       name: "", */}
      {/*       image: "", */}
      {/*     }} */}
      {/*     onSubmit={(values) => addTestmimonial(values)} */}
      {/*     enableReinitialize={true} */}
      {/*   > */}
      {/*     <Form> */}
      {/*       <EditField name="name" type="text" label="Testimonial Name" /> */}
      {/**/}
      {/*       <EditField name="image" type="text" label="Testimonial Image" /> */}
      {/**/}
      {/*       <EditField name="role" type="text" label="Testimonial Role" /> */}
      {/**/}
      {/*       <EditorTextArea */}
      {/*         name="message" */}
      {/*         type="text" */}
      {/*         label="Testimonial Message" */}
      {/*       /> */}
      {/*       <SecondaryButton className="my-4" type="submit"> */}
      {/*         Add Testimonial */}
      {/*       </SecondaryButton> */}
      {/*     </Form> */}
      {/*   </Formik> */}
      {/*   <PrimaryButton */}
      {/*     onClick={() => onSubmit(updatedTestimonials, "testimonials")} */}
      {/*   > */}
      {/*     Update Product Page */}
      {/*   </PrimaryButton> */}
      {/* </div> */}
    </div>
  );
};

export default Editor;
