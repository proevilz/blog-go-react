package main

import (
	"proevilz/blog-api/controllers"
	"proevilz/blog-api/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.ConnectDB()

	app := fiber.New()
	userController := &controllers.UserController{}
	postController := &controllers.PostController{}

	app.Get("/api/v1/users", userController.AllUsers)
	app.Post("/api/v1/users", userController.AddUser)

	app.Get("/api/v1/posts", postController.AllPosts)
	app.Get("/api/v1/posts/:id", postController.GetPost)
	app.Post("/api/v1/posts", postController.AddPost)
	app.Listen(":3000")
}
