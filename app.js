require("dotenv").config()
const express = require("express")

const app = express()

app.use(express.json())

const port = process.env.APP_PORT ?? 5000

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list")
}

app.get("/", welcome)

const movieHandlers = require("./movieHandlers")
const usersHandlers = require("./usersHandlers.js")

const { validateMovie } = require("./validator.js")
const { validateUser } = require("./validator.js")

const { hashPassword, verifyPassword, verifyToken } = require("./auth")

//the public routes -----------

app.get("/api/movies", movieHandlers.getMovies)
app.get("/api/movies/:id", movieHandlers.getMovieById)
app.get("/api/users", usersHandlers.getUsers)
app.get("/api/users/:id", usersHandlers.getUserById)

app.post("/api/users", validateUser, hashPassword, usersHandlers.postUser)

app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
)

//then the routes to protect
app.use(verifyToken)

app.post("/api/movies", movieHandlers.postMovie)

app.put("/api/movies/:id", movieHandlers.updateMovie)
// app.put("/api/users/:id", usersHandlers.updateUser)
// app.post("/api/movies", validateMovie, movieHandlers.postMovie)
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie)

app.delete("/api/movies/:id", movieHandlers.deleteMovie)
app.delete("/api/users/:id", usersHandlers.deleteUser)

app.put("/api/users/:id", validateUser, hashPassword, usersHandlers.updateUser)

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened")
  } else {
    console.log(`Server is listening on ${port}`)
  }
})
