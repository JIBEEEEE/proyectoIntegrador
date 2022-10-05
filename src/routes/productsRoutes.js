const productsController = require('../controllers/productsController');

const express = require('express');
const router = express.Router();

router.get("/", productsController.productos)

module.exports = router;