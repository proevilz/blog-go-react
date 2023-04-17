package controllers

import (
	"proevilz/blog-api/repositories"

	"github.com/gofiber/fiber/v2"
)

type UserController struct{}

func (u *UserController) AllUsers(c *fiber.Ctx) error {
	UserRepository := &repositories.UserRepository{}
	includePosts := c.Query("includePosts") == "true"
	var users interface{}
	var err error
	if includePosts {
		users, err = UserRepository.GetAllUsersWithPosts()
	} else {
		users, err = UserRepository.GetAllUsers()
	}
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error getting users",
		})

	}
	return c.JSON(fiber.Map{
		"users": users,
	})
}
