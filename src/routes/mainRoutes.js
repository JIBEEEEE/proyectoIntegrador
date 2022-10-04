const mainController = require('../controllers/mainController');

const express = require('express');
const router = express.Router();

router.get("/", mainController.index)

router.get("/products", mainController.products)

module.exports = router;