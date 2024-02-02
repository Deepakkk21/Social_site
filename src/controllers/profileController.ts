// controllers/profileController.ts
import { Request, Response } from 'express';
import User from '../models/User';


//  profile controller

export const showProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.render('profile', { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
// to update profile 

export const updateForm = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            // Handle case where user is not found
            return res.status(404).send('User not found');
        }

        res.render('update', { user, userId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


export const updatedNow = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, age } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update user information
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;

        await user.save();
        res.redirect(`/user/profile/${userId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
