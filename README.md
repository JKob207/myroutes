# MyRoutes

MyRoutes is a web application designed to help you create and save your own paths. With MyRoutes, you can create a user account, record your favorite routes, save them, edit them, and delete them as needed. This application is built using Vue.js with Vue Materials for the frontend and a PHP backend with SQLite for the database.

## Features
- **User Accounts**: Create your own user account to manage your routes.
- **Route Management**: Real time record, save, edit and delete your favorite paths.
- Vue.js Frontend: Utilizes Vue.js with Vue Materials for an interactive and responsive user interface.
- **PHP Backend**: The backend is powered by PHP's built-in web server, providing server-side functionality.
- **SQLite Database**: Data is stored in an SQLite database for efficient and lightweight data management.

## Installation
To get MyRoutes up and running on your local machine, follow these steps:

### Dependencies
- **Node.js** - JavaScript runtime for building the frontend
- **PHP** - Backend scripting language with a built-in web server.

``` bash
# clone the repository
git clone https://github.com/JKob207/myroutes.git
cd myroutes

# install dependencies
npm install

# start the PHP built-in web server:
php -S localhost:9090

# serve with hot reload at localhost:8080
npm run dev

