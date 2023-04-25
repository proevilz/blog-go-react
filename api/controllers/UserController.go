package controllers

import (
	"fmt"
	"proevilz/blog-api/models"
	"proevilz/blog-api/repositories"
	"strconv"

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

func (u *UserController) UpdateSettings(c *fiber.Ctx) error {
	UserRepository := &repositories.UserRepository{}
	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing user ID parameter",
		})
	}
	reqSettings := new(models.Settings)
	err := c.BodyParser(reqSettings)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid settings payload",
		})
	}
	UserID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid user ID",
		})
	}

	updatedSettings, err := UserRepository.UpdateSettings(uint(UserID), reqSettings)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error getting settings",
		})
	}
	return c.JSON(fiber.Map{
		"settings": updatedSettings,
	})
}

func (u *UserController) GetSettings(c *fiber.Ctx) error {
	UserRepository := &repositories.UserRepository{}
	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing user ID parameter",
		})
	}
	UserID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid user ID",
		})
	}

	settings, err := UserRepository.GetSettings(uint(UserID))
	if err != nil {
		fmt.Println(err)
		return c.Status(500).JSON(fiber.Map{
			"message": "Error getting settings",
		})
	}
	return c.JSON(fiber.Map{
		"settings": settings,
	})
}
