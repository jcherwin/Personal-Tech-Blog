# Personal-Tech-Blog

## Description

The purpose of this program is to provide a functional back-end server for retreiving and storing records within a personalized database that interacts with a CMS-style blog front-end. Users can signup, login, and then add/edit/delete posts to the blog, as well as add/edit/delete comments from their posts and the posts of other users.

This program utilizes node.js as well as the npm packages 'express' for handling server routing, 'mysql2' for communicating with the database, 'dotenv' for storing and using sensitive information such as a database username and password, 'sequelize' for easy translation of database information into js objects for use in code, 'express-session' for creating sessions that store the logged in state of users, 'handlebars' for dynamically creating views within the MVC framework, and 'bcrypt' for ensuring that information such as user passwords are stored in a secure way to the database and in the code.

## Demo

Here is a link to the deployed application being hosted on: [Heroku](https://dry-earth-97574.herokuapp.com/)

Here is an example screenshot showing what the application should look like: ![This is an image of the application](/assets/images/demo-screenshot.png)

## Installation

This program was built and tested using node.js v16.19.0.

After cloning this repository into a working folder of your own, you'll need to run the following command to pull in the node packages required to run the program.

```md
npm install OR npm i
```

## Usage

Before running the server, you should setup the database schema by running the following commands after logging in through the SQL Client or Docker:

```md
source db/schema.sql
```

After installation and setting up the database schema, you can run the seed information to the database and then run the server by typing in the root folder:

```md
npm run seed
npm start
```

This will bring up a message upon a successful run:

```md
Now Listening
```

## Testing

From here you can test the established API routes by using a program such as Insomnia.