import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import authRoutes from './routes/index';
import profileRoutes from './routes/index';
import postRoutes from './routes/index';
require('./database/mongoose')


const app = express();
const PORT = 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); 


app.use(
  session({
    secret: 'Deepak@2110', 
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/assets'));

// Routes

app.use('/auth', authRoutes);
app.use('/user', profileRoutes);
app.use('/posts', postRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 
   