# Social Site

This project is a simple social site web application developed using TypeScript, Node.js, Express, and MongoDB with Mongoose.

## Project Structure

```plaintext
/social-site
├── /src
│   ├── /controllers
│   │   ├── authController.ts
│   │   ├── profileController.ts
│   │   └── postController.ts
│   ├── /database
│   │   └── mongoose.ts
│   ├── /middleware
│   │   └── authentication.ts
│   ├── /models
│   │   ├── User.ts
│   │   └── Post.ts
│   ├── /routes
│   │   └── index.ts
│   ├── /views
│   │   ├── signup.ejs
│   │   ├── login.ejs
│   │   ├── profile.ejs
│   │   ├── posts.ejs
│   │   ├── update.ejs
│   │   └── feed.ejs
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```



## Prerequisites

- TypeScript
- Node.js
- MongoDB

## Installation

1. Clone the repository.
2. Make sure MongoDB is installed and running. Update the MongoDB connection string in `/src/database/mongoose.ts`.
3. Run `npm install`.
4. Run `npm start`.

## Features

### User Authentication with JWT

1. **Signup:** Users can create an account with a unique username and email.
2. **Login:** Existing users can log in securely using their credentials.
3. **Logout:** Users can log out of their accounts.

### User Profile

1. **Profile Page:** Users have a dedicated profile page displaying their details, bio, and profile picture.
2. **Update Profile:** Users can update their profile information, including bio and profile picture.

### Posts

1. **Post Creation:** Users can create new posts.
2. **Post Display:** Posts are displayed on a dedicated page, sorted by time.



