# Express-Ts-Boilerplate

This boilerplate was intended for personal use but anyone can use it if they want to. It comes with authentications routes handle with json webtokens and passport js.

## To start the server

1. `git clone` this repo
1. cd into the folder and create a `.env` file with the url as **MONGO_DB_URL** to your mongodb and a secret string as **SECRET** for creating the token. You can create a database with [mongodDb Atlas](https://www.mongodb.com/cloud/atlas)
1. run `yarn` or `npm i` to install dependencies
1. run `yarn dev` or `npm run dev`
1. you should see `Express listenning in port 4000 👍`
1. Have fun

## Dependencies

- bcryptjs
- body-parser
- connect-mongo
- cookie-parser
- cors
- dotenv
- express
- express-session
- jsonwebtoken
- mongoose
- passport
- passport-jwt
- validator