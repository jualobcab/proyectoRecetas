const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get("/list", recipeController.getRecipes);
router.post("/create", recipeController.postRecipe);
router.delete('/delete/:recipe_id', recipeController.deleteRecipe);

module.exports = router;
