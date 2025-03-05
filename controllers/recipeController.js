const Recipe = require("../models/recipe");

exports.postRecipe = async (req, res) => {
  const {
    recipe_name,
    cuisine_type,
    difficulty_level,
    preparation_time,
    steps,
  } = req.body;

  try {
    const existingRecipe = await Recipe.findOne({ where: { recipe_name } });
    if (existingRecipe) {
      return res
        .status(400)
        .json({ message: "Esta receta ya está registrada." });
    }

    const newRecipe = await Recipe.create({
      recipe_name,
      cuisine_type,
      difficulty_level,
      preparation_time,
      steps,
    });

    return res
      .status(201)
      .json({ message: "Receta agregada exitosamente", recipe: newRecipe });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener recetas" });
  }
};

exports.getRecipe = async (req, res) => {
  const { recipe_id } = req.params;

  try {
    // Buscar receta por ID
    const recipe = await Recipe.findByPk(recipe_id);

    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada." });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { recipe_id } = req.params;

  try {
    // Buscar la receta por ID
    const recipe = await Recipe.findByPk(recipe_id);

    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada." });
    }

    // Eliminar la receta
    await recipe.destroy();

    res.status(200).json({ message: "Receta eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la receta:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


exports.updateRecipe = async (req, res) => {
  const { recipe_id } = req.params; // Obtener el ID de la receta desde los parámetros de la URL
  const {
    recipe_name,
    cuisine_type,
    difficulty_level,
    preparation_time,
    steps,
  } = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud

  try {
    // Buscar la receta por ID
    const recipe = await Recipe.findByPk(recipe_id);

    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada." });
    }

    // Actualizar los datos de la receta SOLO si existen en req.body
    recipe.recipe_name = recipe_name ?? recipe.recipe_name;
    recipe.cuisine_type = cuisine_type ?? recipe.cuisine_type;
    recipe.difficulty_level = difficulty_level ?? recipe.difficulty_level;
    recipe.preparation_time = preparation_time ?? recipe.preparation_time;
    recipe.steps = steps ?? recipe.steps;

    // Guardar los cambios
    await recipe.save();

    res
      .status(200)
      .json({ message: "Receta actualizada correctamente", recipe });
  } catch (error) {
    console.error("Error al actualizar la receta:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};