import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITestimonial {
  name: string;
  role: string;
  message: string;
  image: string;
}

// Hero Section Interface
interface HeroSection {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  heading1: string;
  heading2: string;
  description: string;
}

// Sponsors Interface
interface Sponsors {
  images: string[];
}

// Product Interface
export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
}

// Product Page Interface
interface ProductPage {
  heading: string;
  description: string;
  products: Product[];
}

// Section2 Interface
interface Section2 {
  image: string;
  description: string;
  heading: string;
  subheading: string;
  price: string;
}

export interface IUserSettingsProps {
  heroSection: HeroSection;
  sponsors: Sponsors;
  productPage: ProductPage;
  section2: Section2;
  testimonials: ITestimonial[];
}

// User Settings Interface
export interface IUserSettings extends Document {
  user: Types.ObjectId;
  heroSection: HeroSection;
  sponsors: Sponsors;
  productPage: ProductPage;
  section2: Section2;
  testimonials: ITestimonial[];
}

// Hero Section Schema
const heroSectionSchema = new Schema<HeroSection>({
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  image4: { type: String, required: true },
  heading1: { type: String, required: true },
  heading2: { type: String, required: true },
  description: { type: String, required: true },
});

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, required: true },
});

// Sponsors Schema
const sponsorsSchema = new Schema<Sponsors>({
  images: { type: [String], required: true },
});

// Product Schema
const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

// Product Page Schema
const productPageSchema = new Schema<ProductPage>({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  products: { type: [productSchema], required: true }, // Array of products
});

// Section2 Schema
const section2Schema = new Schema<Section2>({
  image: { type: String, required: true },
  description: { type: String, required: true },
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  price: { type: String, required: true },
});

// Main User Settings Schema
const userSettingsSchema = new Schema<IUserSettings>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  heroSection: { type: heroSectionSchema, required: true },
  sponsors: { type: sponsorsSchema, required: true },
  productPage: { type: productPageSchema, required: true },
  section2: { type: section2Schema, required: true },
  testimonials: { type: [TestimonialSchema], required: true },
});

// Create the model
const UserSettings = mongoose.model<IUserSettings>(
  'UserSettings',
  userSettingsSchema
);

const ProductSchema = mongoose.model<Product>('Products', productSchema);

const Testimonial = mongoose.model<ITestimonial>(
  'Testimonial',
  TestimonialSchema
);

export { UserSettings, ProductSchema, Testimonial };
