// const express = require('express');
// const jwt = require('jsonwebtoken');
// const session = require('express-session')
// const customer_routes = require('./router/auth_users.js').authenticated;
// const genl_routes = require('./router/general.js').general;

// const app = express();

// app.use(express.json());

// app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

// app.use("/customer/auth/*", function auth(req,res,next){
// //Write the authenication mechanism here
// });
 
// const PORT =5000;

// app.use("/customer", customer_routes);
// app.use("/", genl_routes);

// app.listen(PORT,()=>console.log("Server is running"));

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const generalRoutes = require('./router/general');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', generalRoutes);

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
