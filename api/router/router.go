package router

import (
	"proevilz/blog-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRouter(app *fiber.App) {
	userController := &controllers.UserController{}
	postController := &controllers.PostController{}
	api := app.Group("/api/v1")
	api.Get("/users", userController.AllUsers)
	api.Post("/users", userController.AddUser)
	api.Post("/users/login", userController.LoginUser)

	// api.Get("/posts", middleware.Protected, postController.AllPosts) - example of protected route

	api.Get("/posts", postController.AllPosts)
	api.Get("/posts/:id", postController.GetPost)
	api.Post("/posts", postController.AddPost)

}
