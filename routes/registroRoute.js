const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

router.get('/', registroController.getView);
router.post('/', express.urlencoded({ extended: true }), registroController.postRegistro); 

module.exports = router;
