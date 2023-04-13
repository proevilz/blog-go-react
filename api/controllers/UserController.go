package controllers

import (
	"os"
	"proevilz/blog-api/models"
	"proevilz/blog-api/repositories"
	"proevilz/blog-api/utils"
	"time"

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

func (u *UserController) AddUser(c *fiber.Ctx) error {
	UserRepository := &repositories.UserRepository{}
	user := new(models.User)
	err := c.BodyParser(user)
	if err != nil {
		return err
	}
	hash, err := utils.HashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "something went wrong, please try again later",
		})
	}
	user.Password = hash
	user, err = UserRepository.AddUser(user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error adding user",
		})
	}
	return c.JSON(fiber.Map{
		"user": user,
	})
}

func (u *UserController) LoginUser(c *fiber.Ctx) error {
	UserRepository := &repositories.UserRepository{}
	user := new(models.User)

	err := c.BodyParser(user)
	if err != nil {
		return err
	}

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "something went wrong, please try again later",
		})
	}

	storedUser, err := UserRepository.GetUserByEmail(user.Email)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error getting user",
		})
	}
	if storedUser == nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if !utils.CheckPasswordHash(user.Password, storedUser.Password) {
		return c.Status(401).JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}
	token, err := utils.GenerateJWT()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error generating token",
		})
	}

	cookie := new(fiber.Cookie)
	cookie.Name = "jwt"
	cookie.Value = token
	cookie.Expires = time.Now().Add(10 * time.Minute)
	cookie.HTTPOnly = true
	cookie.Domain = os.Getenv("APP_DOMAIN")

	c.Cookie(cookie)
	return c.SendStatus(200)
}
