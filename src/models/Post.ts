
import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
    content: string;
    timestamp: Date;
    location: string;
    author : string 
}

const postSchema = new Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    location: { type: String, default: 'Mobile' },
    author: { type: String, required: true },

});

export default model<IPost>('Post', postSchema);
