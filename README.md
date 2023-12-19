# Introduction
A point of sale system for manage seller and selling products. It have admin, seller and customer permission account for checking their order. Using 0Auth from Google for sending verification mail when register a new user.

# How to install
- Create your node project ``` npm init -y ```
- Install modules ``` npm install ```
- Create an ``` .env ``` in the root dict and set these variables:
DATABASE_HOST=

DATABASE_NAME=

DATABASE_USERNAME=

DATABASE_PASSWORD=

ACCESS_TOKEN_SECRET= [set any you want, it's used for encode the web token]

MAIL_USERNAME= [0Auth Gmail tutorial](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)

MAIL_PASSWORD= [0Auth Gmail tutorial](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)

OAUTH_CLIENTID= [0Auth Gmail tutorial](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)

OAUTH_CLIENT_SECRET= [0Auth Gmail tutorial](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)

OAUTH_REFRESH_TOKEN= [0Auth Gmail tutorial](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)

- Run the server by ``` node index.js ``` or ``` nodemon ```
