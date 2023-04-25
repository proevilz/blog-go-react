package main

import (
	"proevilz/blog-api/database"
	"proevilz/blog-api/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	database.ConnectDB()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173, https://localhost:5173",
		AllowCredentials: true,
	}))
	app.Use(logger.New(logger.Config{

		Format: "${pid} ${locals:requestid} ${status} - ${method} ${path}​\n",
	}))
	router.SetupRouter(app)
	app.Listen(":3000")
}
