// import express router
const router = require('express').Router();

// import user-routes and thought-routes file
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');


router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export router
module.exports = router;