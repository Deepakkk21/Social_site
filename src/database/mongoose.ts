import mongoose from 'mongoose';

// const url = 'mongodb://127.0.0.1:27017/wasserstoff';
// const url ='mongodb+srv://Deepakk:Deepak2110@cluster0.tt4vu2r.mongodb.net/?retryWrites=true&w=majority';
const url ='mongodb+srv://Deepak:Deepak2110@social.fyqcqkz.mongodb.net/?retryWrites=true&w=majority&appName=social';
mongoose.connect(url);

const connection = mongoose.connection;
 
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
});

export default connection;
