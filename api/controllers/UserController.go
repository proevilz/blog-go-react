package controllers

import (
	"proevilz/blog-api/models"
	"proevilz/blog-api/repositories"

	"github.com/gofiber/fiber/v2"
)

type UserController struct{}

func (u *UserController) AllUsers(c *fiber.Ctx) error {
	UserRepositry := &repositories.UserRepositry{}
	users, err := UserRepositry.GetAllUsers()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error getting users",
		})

	}
	return c.JSON(fiber.Map{
		"users": users,
	})
}

func (u *UserController) AddUser(c *fiber.Ctx) error {
	UserRepositry := &repositories.UserRepositry{}
	user := new(models.User) // changed 'u' to 'user' for clarity
	err := c.BodyParser(user)
	if err != nil {
		return err
	}
	user, err = UserRepositry.AddUser(user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error adding user",
		})
	}
	return c.JSON(fiber.Map{
		"user": user,
	})
}
