import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';


// signup controller

export const signupPage = function(req: Request, res: Response){
    return res.render("signup", { messages: req.flash() });
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
      req.flash('error', "Passwords don't match");
      return res.redirect('back');
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      req.flash('error', 'Email or username already exists , please signup');
      return res.redirect('/auth/login');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    req.flash('success', 'Signup successful!');
    return res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// login controller

export const loginPage = function(req: Request, res: Response) {
  return res.render('login', { messages: req.flash() });
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            // Check if the password matches
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {

                // Create a JWT token
                const token = jwt.sign({ userId: user._id, email: user.email }, 'Deep@k2110', { expiresIn: '1h' });

                // Attach the token to the response header or body
                res.cookie('jwt', token); 

                return res.redirect(`/user/profile/${user._id}`); 
            } else {
                req.flash('error', "Passwords don't match");
                return res.redirect('/auth/login'); // Redirect to the login page
            }
        } else {
            // Alert the user that the email doesn't exist, please Signup
            req.flash('error', "Email doesn't exist");
            return res.redirect('/auth/signup'); // Redirect to the login page
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//  logout

export const logout = (req: Request, res: Response): void => {
    // Clear the JWT token
    res.clearCookie('jwt');

    req.flash('success', 'Logged out successfully');
    res.redirect('/auth/login');
};
