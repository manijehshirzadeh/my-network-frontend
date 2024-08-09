# My-Network - Frontend with React

## Description

This repository contains the frontend implementation for the My-Network application. The frontend is built with React using Vite and Material UI as React component library, and also integrated Cloudinary for image upload.

## Deployment
The project is deployed to Render. Can be accessed via:

https://my-network-frontend.onrender.com


The Backend of this My Network is deployed to Render, and can be accessed on this link:

https://my-network-backend.onrender.com


## Features

- This applicaiton is a clone of Facebook, in which the users can create/edit/delete a post, like a post, comment on a post.
- Also, users can search among other users and send friend requests. The receiver of the friend request can accept it, so they become friends.
- User authentication and authorization (Sign up, Sign in, Sign out)
- Only singed in user can see ALL the posts in the website.
- Display Date and Time for the Posts, Users and Comments


## Technologies:
- React.js
- Material UI
- Vite
- React Router Dom
- Cloudinary
- Render

## Installation

1. Clone the repository:

   ```bash
   https://github.com/manijehshirzadeh/my-network-frontend.git
   cd project-3-local-market-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
   ```bash
   VITE_EXPRESS_BACKEND_URL= http://localhost:3000

   ```

3. Running the Development Server:
   ```bash
   npm run dev
   ```

4. Building for Production
   ```bash
   npm run build
   ```
   
5. Visit `localhost:3000`

## Next Steps:
- Adding remove a friend functionality to remove a friend from the Freinds List .
- Adding ignore functionality for ignoring a Freind Request.