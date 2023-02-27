const Joi = require("joi")

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().min(2).max(255).required(),
  lastname: Joi.string().min(2).max(255).required(),
  city: Joi.string().min(2).max(255).required(),
  language: Joi.string().min(2).max(255).required(),
  password: Joi.string().min(2).max(255).required(),
})

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language, password } = req.body

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language, password },
    { abortEarly: false }
  )

  if (error) {
    res.status(422).json({ validationErrors: error.details })
  } else {
    next()
  }
}

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.number().integer().min(1900).max(2023).required(),
  color: Joi.number().integer().min(0).max(1).required(),
  duration: Joi.number().integer().min(1).max(255).required(),
})

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body
  const { error } = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details })
  } else {
    next()
  }
}

module.exports = {
  validateMovie,
  validateUser,
}
