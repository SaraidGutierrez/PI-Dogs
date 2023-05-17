const { Dog } = require('../db')

const postDog = async (req, res) => {
  const { image, name, height, weight, temperament, life_span } = req.body

  try {
    if (image && name && height && weight && temperament && life_span) {
      // Check if a dog with the same name already exists in the database
      const existingDog = await Dog.findOne({ where: { name } })

      if (existingDog) {
        res.status(500).json('Una raza de perro con ese nombre ya existe')
      } else {
        // Create a new dog if a dog with the same name does not already exist
        const dog = await Dog.create({
          image,
          name,
          height,
          weight,
          temperament,
          life_span,
        })

        res.status(200).json(dog)
      }
    } else {
      res.status(400).json('Los datos son insuficientes')
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = {
  postDog,
}
