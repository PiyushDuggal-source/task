import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import User, { IUser } from '../../models/user.model';
import { UserSchema, UserLoginSchema } from '../../models/validators/user';
import UserSettings, {
  IUserSettings,
  IUserSettingsProps,
  Product,
} from '~/models/userSettings.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body against our schema
    const validatedData = UserSchema.parse(req.body);

    // Check if user already exists using email
    const existingUser = await User.findOne({
      email: validatedData.email,
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // Create a new user
    const newUser = new User({
      ...validatedData,
      password: hashedPassword,
    });

    const dummyProducts: Product[] = [
      {
        name: 'Shiny Dress',
        category: 'Dress',
        image: 'https://picsum.photos/300/200',
      },

      {
        name: 'Long Dress',
        category: 'Dress',
        image: 'https://picsum.photos/300/200',
      },

      {
        name: 'Full Sweater',
        category: 'Sweater',
        image: 'https://picsum.photos/300/200',
      },
      {
        name: 'Half Sweater',
        category: 'Sweater',
        image: 'https://picsum.photos/300/200',
      },
      {
        name: 'Red Shirt',
        category: 'Shirt',
        image: 'https://picsum.photos/300/200',
      },
      {
        name: 'Blue Shirt',
        category: 'Shirt',
        image: 'https://picsum.photos/300/200',
      },
      {
        name: 'Green Shirt',
        category: 'Shirt',
        image: 'https://picsum.photos/300/200',
      },
    ];

    const profileSettings: IUserSettingsProps = {
      heroSection: {
        image1: 'heroImage1',
        image2: 'heroImage2',
        image3: 'heroImage3',
        image4: 'heroImage4',
        heading1: 'ULTIMATE',
        heading2: 'SALE',
        description: 'NEW COLLECTION',
      },
      sponsors: {
        images: ['sponsor1', 'sponsor2', 'sponsor3', 'sponsor4', 'sponsor5'],
      },
      productPage: {
        heading: 'New Arivals',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin',
        products: [...dummyProducts],
      },
      section2: {
        image: 'https://picsum.photos/550/400',
        description:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin',
        heading: 'Peaky Blinders',
        subheading: 'New Collection',
        price: '100',
      },
    };

    const userSettings = new UserSettings({
      user: newUser._id,
      ...profileSettings,
    });

    // Save the user and settings
    await newUser.save();
    await userSettings.save();

    // Set user session
    req.session.userId = (newUser._id as string).toString();

    // Send a success response
    res.status(201).json({
      registered: true,
      user: newUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedData = UserLoginSchema.parse(req.body);

    // Find the user
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Set user session
    req.session.userId = (user._id as string).toString();

    // Send success response
    res.json({
      loggedIn: true,
      user: user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        return next();
      }
    } catch (error) {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
  res.status(401).json({ message: 'Unauthorized' });
};

export const logoutUser = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
    res.clearCookie('qid');
    res.json({ loggedOut: true });
  });
};
