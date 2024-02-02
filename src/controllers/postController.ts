
import { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';

export const showForm = (req: Request, res: Response): void => {
    const { userId } = req.params;

    res.render('posts', { userId });
};

// to create post

export const handlePost = async (req: Request, res: Response): Promise<void> => {
    const inputText: string = req.body.inputText;
    const inputlocation : string = req.body.location;
    const Author : string = req.body.author;
    try {
        const newPost: IPost = await Post.create({ content: inputText , location:inputlocation, author : Author});
        res.redirect('back');
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).send('Internal Server Error');
    }
};

//  to show Post feed

export const showFeed = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const posts: IPost[] = await Post.find().sort({ timestamp: -1 }).exec();
        res.render('feed', { posts ,userId });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
};
