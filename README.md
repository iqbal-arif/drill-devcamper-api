1. npm init
2. npm i express dotenv (creates environment variable; use in single config file)
3. npm i -D nodemon
4. set config.env file in config folder
   NODE_ENV=development
   PORT=5000
5. set script in package.json
   "scripts": {
   "start": "SET NODE_ENV=production & node server",
   "dev" : "nodemon server"
   },
6. npm run dev for development mode
7. npm start for production mode
