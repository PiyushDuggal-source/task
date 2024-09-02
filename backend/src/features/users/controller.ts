import { Request, Response } from 'express';
import UserSettings from '~/models/userSettings.model';

export const getUserSettings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const userSettings = await UserSettings.findOne({ user: userId });

    if (!userSettings) {
      return res.status(404).json({ message: 'User settings not found' });
    }

    return res.status(200).json(userSettings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserSettings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const updates = req.body;

    const userSettings = await UserSettings.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      { new: true, upsert: true }
    );

    return res.status(201).json(userSettings);
  } catch (error) {
    console.error('Error updating user settings:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
