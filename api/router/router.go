package router

import (
	"fmt"
	"log"
	"os"
	"proevilz/blog-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRouter(app *fiber.App) {
	userController := &controllers.UserController{}
	postController := &controllers.PostController{}
	authController := &controllers.AuthController{}
	api := app.Group("/api/v1")
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	api.Static("/media/", fmt.Sprintf("%s/static/uploads/", dir), fiber.Static{
		Compress: true,
	})
	api.Post("/auth/register", authController.Register)
	api.Post("/auth/login", authController.Login)

	api.Get("/users", userController.AllUsers)
	api.Get("/users/:id/settings", userController.GetSettings)
	api.Put("/users/:id/settings", userController.UpdateSettings)

	// api.Get("/posts", middleware.Protected, postController.AllPosts) - example of protected route

	api.Get("/posts", postController.AllPosts)
	api.Get("/posts/:id", postController.GetPost)
	api.Get("/posts/slug/:slug", postController.GetPost)
	api.Post("/posts", postController.AddPost)

}
