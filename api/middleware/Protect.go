package middleware

import (
	"proevilz/blog-api/utils"

	"github.com/gofiber/fiber/v2"
)

func Protected(c *fiber.Ctx) error {
	token := c.Cookies("jwt")

	if token == "" {
		return unauthorizedResponse(c)
	}

	valid, err := utils.DecodeJWT(token)
	if err != nil || !valid {
		return unauthorizedResponse(c)
	}

	return c.Next()
}

func unauthorizedResponse(c *fiber.Ctx) error {
	return c.Status(fiber.StatusUnauthorized).
		JSON(fiber.Map{"message": "Invalid or expired JWT"})
}
