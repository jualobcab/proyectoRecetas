const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get("/list", recipeController.getRecipes);

router.get("/:recipe_id", recipeController.getRecipe);

router.post("/create", recipeController.postRecipe);

router.put("/update/:recipe_id", recipeController.updateRecipe);
router.delete('/delete/:recipe_id', recipeController.deleteRecipe);

module.exports = router;


