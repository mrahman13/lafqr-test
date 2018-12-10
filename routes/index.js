const express = require('express');
const router = express.Router();
const auth = require("../controllers/AuthController");

// rout to home page
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

// route for adding new item
router.get('/new-item', auth.newItem);

// route for adding new item
router.post('/new-item', auth.addNewItem);

// route for displaying user's items
router.get('/my-items', auth.myItems);

module.exports = router;
