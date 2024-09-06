// Hero Section Interface
export interface HeroSection {
  [key: string]: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  heading1: string;
  heading2: string;
  description: string;
}

// Sponsors Interface
export interface Sponsors {
  images: string[];
}

// Product Interface
export interface Product {
  name: string;
  image: string;
  category: string;
}

// Product Page Interface
export interface ProductPage {
  heading: string;
  description: string;
  products: Product[];
}

// Section2 Interface
export interface Section2 {
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

export interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  message: string;
  image: string;
}
