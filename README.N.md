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
6. set .gitignore file
   node_modules/
   config/config.env
7. npm run dev for development mode
8. npm start for production mode
9. git init
10. git add .
11. git commit -m "Initial Express setup"
12. npm i morgan for
13. Set postman testing env.
14. npm i mongoose.
15. Set mongoose config as such
16. npm i colors (for console coloring)
    this code in server js will show server notification as yellow with "color"
    const server = app.listen(
    PORT,
    console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
    );
    Server running in development mode on port 5000 (this color changed to yellow)
    Database connection string
    MONGO_URI=mongodb+srv://arifiqbal:Luc3nt65@arifiqbal.jdvvvxa.mongodb.net/devcamper?
17. npm i slugify for mongodb
18. npm i node-geocoder
    For Mapquest API: developer.mapquest.com for api
19. File upload node module : npm i express-fileupload
20. npm i jsonwebtoken bcryptjs
21. npm i cookie-parser
22. npm i nodemailer
23. Database Sanitizer: npm i express-mongo-sanitize
24. Helmet: npm i helmet
25. API Rate Limit & HPP: npm i express-rate-limit hpp
26. CORS: npm i cors

\***\*\*\*\*\*\*** ROUTE STRUCTURE \***\*\*\*\*\***
GET/POST/PUT/DELETE

1. /api/v1/bootcamps
2. /api/v1/courses
3. /api/v1/reviews
4. /api/v1/auth
5. /api/v1/users

\***\*\*\*\*\*\*\*** Steps \***\*\*\*\*\***

1. Write All HTTP METHODS GET, POST, PUT, DELETE That are routes
2. Move ROUTES to bootcamps.js file in ROUTES folder.
3. Mount ROUTE file in server.js
4. Move Route logic into another bootcamps.js file in CONTROLLER FOLDER.
5. Write Middleware logger.js in MIDDLEWARE Folder.
6. Import logger.js in server.js.
7. Use in server.js as app.use(logger);
8.

---

9. After server and database connection setup
10. Create Models for Bootcamp for database.
11. Create Functionality in Controller bootcamps.js to read, write, and update from database. GET ALL, GET SINGLE, POST, UPDATE &, DELETE Data to db.
12. create Error Handler in Middleware error.js and import it in server.js
    error.js in Midddleware folder is handling DB related errors
13. Create a custom ErrorHandler class in utils/errorResponse.js
14. Import errorResponse in controllers/bootcamps.js and use it for error response
15.

**\*\***\*\*\***\*\*** Side Notes **\*\***\***\*\***

1. FIELDS: Now, the fields you see here, they're going to be included in the database and in our model.
   But we're going to have some other ones that you don't see here because they're going to be generated.
   So, for instance, the address, when a user enters an address, when we make a post requests and we
   we put this address in, we're actually going to have a piece of mongoose middleware that runs a geocode,
   are using the MapQuest API to create a location field, which is actually going to be something called
   the Geo Jason type in mongoose.
   And it'll have the coordinates, the latitude and longitude.
   And we can also separate.
   We can have like city, state zip code and stuff like that.

**\*\***\*\*\***\*\*** DATABASE OPERATIONS STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

**\*\***\*\*\***\*\*** ERROR HANDLING STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. server.js connects to db and call http routes/bootcamps.js
2. routes/bootcamps.js calls controller/bootcamps.js for db get,post,patch,delete functionality
3. controller/bootcamps.js db operation are handled through middleware/async.js
4. controller/bootcamps.js communicates with db and performs db methods through models/Bootcamps.js
5. controller/bootcamps.js also response to errors through middleware/error.js
6. middleware/error.js uses utils/errorResponse.js (express builtin) for providing error message

**\*\***\*\*\***\*\*** DATABASE HANDLING STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1.

**\*\***\*\*\***\*\*** MONGOOOSE MIDDLEWARE SLUGIFY STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Import slugify in models/Bootcamps.js
2. Create bootcamp slug from name logic fn.

**\*\***\*\*\***\*\*** MONGOOOSE \_DATA/BOOTCAMPS.JSON IMPORT STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Write seeder.js
2. To Import Data DB: Type node seeder.js -i
3. To Delete Data from DB: Type node seeder.js -d

**\*\***\*\*\***\*\*** MONGOOOSE BOOTCAMPS WITHIN A RADIUS STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Write Radius logic in /controllers/bootcamps.js
2. Write Routes in /routes/bootcamps.js to initiate it.
3. Use POSTMAN to check the bootcamp query by distance

**\*\***\*\*\***\*\*** MONGOOOSE BOOTCAMPS DB QUERY FILTERING STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Write Query logic in /controllers/bootcamps.js
2. console.log(req.query) give the object {'location.state'"MA", housing : true}
   Search by avergecost: bootcamps?averageCost[gte]=10000
   Search by avergecost & Location: bootcamps?averageCost[gte]=10000&location.city=Boston
   Search by careers: bootcamps?careers[in]=Business
   Search by location: bootcamps?location.stat=MA&housing=true

3. Write Query to select fields
   Search by location: /api/v1/bootcamps?housing=true&location.state=MA gives {'location.state'"MA", housing : true}
   Search by Description: /api/v1/bootcamps?select=name,description
   Search by Description & Housing: /api/v1/bootcamps?select=name,description,housing
   Search by Description & Housing & housing filtering: /api/v1/bootcamps?select=name,description,housing&housing=true
4. Write Query to Sort fields
   Search by name in ascending order: /api/v1/bootcamps?select=name,description,housing&sort=name
   Search by name in descending order: /api/v1/bootcamps?select=name,description,housing&sort=-name
5. Write Query for Pagination and Limit
   Search by page number: /api/v1/bootcamps?page=2
   Search page 2 limit 2: /api/v1/bootcamps?page=2&limit=2&select=name

**\*\***\*\*\***\*\*** COURSE.JS MODEL & ROUTES STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Write courrse logic in /models/Course.js
2. Import it in seeder.js
3. Write method for courses in /controller/courses.js.
4. Write route files for courses in /route/courses.js
5. Write separate courseRouter and router.use(....courseRouter) in .routes/bootcamps.js
6. courseRoute will invoke getCourses route in /routes/courses.js
   api/v1/courses
   /api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses

**\*\***\*\*\***\*\*** COURSE.JS DATA POPULATION & DELETION STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. /controllers/courses.js add the following for data population
   query = Course.find().populate({
   path: 'bootcamp',
   select: 'name description',
   });
2. Add Reverse populate with virtuals in /models/Bootcamps.js
3. Add // Finding resource
   query = Bootcamp.find(JSON.parse(queryStr)).populate('courses'); in /controllers/bootcamps.js
4. Add // Cascade delete courses when a bootcamp is deleted in /models/Bootcamps.js
5. Add bootcamp.remove(); in /controllers/bootcamps.js to invoke deletion

/api/v1/bootcamps/5d725a037b292f5f8ceff787
Courses being removed from bootcamp 5d725a037b292f5f8ceff787
DELETE /api/v1/bootcamps/5d725a037b292f5f8ceff787 200 32.300 ms - 26

**\*\***\*\*\***\*\*** GET SINGLE COURSE & ADD A COURSE STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Write controller for single course in /controllers/courses
2. Set route for course in /routes/courses.js
3. Write controller for adding a course in /controllers/courses
4. Add route in routes/courses.js
   POST for adding a course in specific ID /api/v1/bootcamps/5d725a1b7b292f5f8ceff788/courses

**\*\***\*\*\***\*\*** DELETE A COURSE STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Write controller for delete a course in /controllers/courses
2. Set route for delete course in /routes/courses.js
3. Add to route deleteCourse in /routes/courses.js
   Delete a course with specific id /api/v1/courses/5d725cb9c4ded7bcb480eaa1

**\*\***\*\*\***\*\*** CALCULATING COURSE AVERAGE COST STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Write logic for calculating average cost in /models/Course.js

**\*\***\*\*\***\*\*** PHOTO UPLOAD FOR BOOTCAMP STEPS **\*\*\*\***\*\*\*\***\*\*\*\***

1. Install express-fileupload module
2. import it into server.js
3. Use module in server.js app.use(fileupload())
4. Writing methods in /controllers/bootcamps.js
5. Add bootcampPhotoUpload in /routes/bootcamps.js
6.

**\*\*\*\***\***\*\*\*\***MIDDLEWARE INFO**\*\***\*\*\*\***\*\***
https://medium.com/@agoiabeladeyemi/a-simple-explanation-of-express-middleware-c68ea839f498

**\*\*\*\***\***\*\*\*\***AUTHENTICATION**\*\***\*\*\*\***\*\***

1. MODELS
   Write user model (userSchema) in /models/User.js
   a. Define User Registration Fields
   b. Define hash encryption method
   c. Define hash token (https://jwt.io/)
   d. Define secret and expiration in config.env file.
   Enter the hash key in Encoded field in https://jwt.io to reveal the id
   e. Define Match user entered password to hashed password in database
2. Define routes;
   a. userAuthRoute: user registration, encrypting password, logging in, getting currently logged in user, resetting password, etc
   b. userRoute : for CRUD functionality for admin to add, update, & delete user.
3. CONTROLLER
   Define user (registering, updating, deleting) methods auth.js in
   /controller/auth.js
   a. Define Registering User Fields
   b. Define Login User and Validate its fields (user,email,& password)
   c. Define Token Cookie for user password.
   d. Define JWT_COOKIE_EXPIRE in config.env file
   e. Define Get current User Login info

4. ROUTES
   a. Define USER Register route for /controllers/auth in /routes/auth.js
   b. Import & Mount to register the route in server.js to invoke it.
   const auth = require('./routes/auth');
   app.use('/api/v1/auth', auth);
   c. Define Login Route
   const {register,login} = require('../controllers/auth');
   router.post('/login', login);
   d. import /middleware/auth into /routes/bootcamps and protect upload photo, update bootcamps, create bootcamp, delete bootcamp.
   e. import /middleware/auth into /routes/courses and protect addCourse, updateCourse, updateCourse, and deleteCourse
   f. Define GET Login in Route
   const { protect } = require('../middleware/auth'); (token protect layer)
   const {register,login,getMe} = require('../controllers/auth');
   router.get('/me', protect, getMe);
   g. Define authorize user in bootcamps
   const { protect, authorize } = require('../middleware/auth');
   and add authorize('publisher', 'admin'), in upload photo, update bootcamps, create bootcamp, delete bootcamp
   h. Define authorize user in course
   const { protect, authorize } = require('../middleware/auth');
   and add authorize('publisher', 'admin') in addCourse, updateCourse, updateCourse, and deleteCourse

5. SERVER.JS
   1. Cookie Parser
      a. import cookie-parser
      const cookieParser = require('cookie-parser');
      b. use
      app.use(cookieParser());
6. MIDDLEWARE
   1. Define Token Cookie Function /middleware/auth.js to verify it with db and client
   2. Define Grant access role for users.

Register User:POST {{URL}}/api/v1/auth/register

7.  To check the token do the following
    One way to check is to add a console.log(decoded) after

         const decoded = jwt.verify(token, process.env.JWT_SECRET);

in middleware/auth.js

**\*\*\*\***\***\*\*\*\***COURSE AVERAGE COST**\*\***\*\*\*\***\*\***

1. LOGIC to calculate course average cost in /models/Course.js
2.

**\*\*\*\***\***\*\*\*\***AddING USERID IN BOOTCAMP**\*\***\*\*\*\***\*\***

1. USERID: in /models/Bootcamps.js add mongoose objectId
2. User associated with bootcamp
   user: {
   type: mongoose.Schema.ObjectId,
   ref: 'User',
   required: true,
   }
3. To insert the above add logic in /controllers/bootcamp.js
4.

**\*\*\*\***\***\*\*\*\***ADMIN USERS CRUD OPERATION**\*\***\*\*\*\***\*\***

1. Write logic in /controllers/users.js
2. Write routes in /routes.users.js
3. Add routes and mount it in server.js
   const auth = require('./routes/users');
   app.use('/api/v1/users', users);

**\*\*\*\***\***\*\*\*\***REVIEW RESOURCE**\*\***\*\*\*\***\*\***

1. Write MODELS /models/Review.js
2. Write Routes /route/reviews.js
3. Write Controllers /controllers/reviews.js
4. Call in in server.js

<!--   Data Sanitization -->

Prevents the header intrusions.

1. Without express-mongo-sanitize utile the SQL injection such as below is possible
   {  
    "email": {"$gt":""},
   "password": "123456"
   }

<!-- XSS-Clean -->

Prevents scripts intrusions.

1. npm i xss-clean
2. The module adds next to script so it cannot be executed
   "name": "Avanced Bootcamp-I&lt;script>(this is)&lt;/script>"

<!-- API Rate Limit -->

Status Code 429
Too many requests, please try again later.

<!-- CORS for Cross Domain API connection -->

**\*\*\*\***\***\*\*\*\*** POSTMAN & DOCGEN DOCUMENTATION **\*\***\*\*\*\***\*\***

1. Create Environment with HOST URL with Environment Management located on the left side. And enter the url.
2. Right-Click View Documentation
3. Publish and select Production Environment
4. In Postman EXPORT Collection as JSON
5. Download DOCGEN Utility from github link
6. DOCGEN Binary https://github.com/thedevsaddam/docgen-bin
7. DOCGEN EXE file as windows_amd64.exe and rename it to docgen.exe
8. Drop all the file in docgen folder and run the following command for html
   .\docgen build -i dc.postman_collection.json -o index.html
9. For linux: Install homebrew utility form https://brew.sh/ site
10. Install Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
11. brew tap thedevsaddam/cli https://github.com/thedevsaddam/homebrew-cli.git
12. Installing docgen through brew
    brew install docgen
13. Create html from the folder where all the json and docgen.exe is placed
    build -i dc.postman_collection.json -o index.html
14. Fonts link:
    https://github.com/Mobirise/Free-Bootstrap-Template/tree/master/assets/bootstrap/fonts

**\*\*\*\***\***\*\*\*\*** DEPLOYMENT **\*\***\*\*\*\***\*\***

1. Signup with digitalocean
2. Create ssh key
   C:\docgen>ssh-keygen
   Generating public/private rsa key pair.
   Enter file in which to save the key (C:\Users\NCFAdmin/.ssh/id_rsa): c:\docgen\devcamp
   Enter passphrase (empty for no passphrase):devcampapi
   Enter same passphrase again:
   Your identification has been saved in c:\docgen\devcamp.
   Your public key has been saved in c:\docgen\devcamp.pub.
   The key fingerprint is:
   SHA256:BrV6y4djeXLCnu+Xg2FvcDGO4R6r+Rm7OgOuFsjEMkI ncfadmin@DESKTOP-FOGNU5P
   The key's randomart image is:
   +---[RSA 3072]----+
   | . |
   | E . . |
   |.. . . |
   |+ o o . o |
   |.= . . S. + o |
   | o . .= +B o |
   | o .@o=O . |
   | . .ooX++* |
   | ... *OB+ . |
   +----[SHA256]-----+

C:\docgen>
