const express = require("express");
const userRoutes = require('./user/user');
const taskRoutes = require('./tasks/task')
const router = express.Router();


router.use('/user',userRoutes)
router.use('/task',taskRoutes)


module.exports = router;
