package controllers

import (
	"os"
	"proevilz/blog-api/models"
	"proevilz/blog-api/repositories"
	"proevilz/blog-api/utils"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

type AuthController struct{}

func (a *AuthController) Login(c *fiber.Ctx) error {
	UserRepository := &repositories.UserRepository{}
	user := new(models.User)

	err := c.BodyParser(user)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	storedUser, err := UserRepository.GetUserByEmail(user.Email)

	if storedUser == nil || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if !utils.CheckPasswordHash(user.Password, storedUser.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}
	token, err := utils.GenerateJWT()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
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
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"user": storedUser.ToUserResponse(),
	})
}

func (a *AuthController) Register(c *fiber.Ctx) error {
	UserRepository := &repositories.UserRepository{}
	user := new(models.User)
	err := c.BodyParser(user)
	if err != nil {
		return err
	}
	hash, err := utils.HashPassword(user.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong, please try again later",
		})
	}
	user.Password = hash
	user, err = UserRepository.AddUser(user)
	if err != nil {
		var errResponse fiber.Map
		if strings.Contains(err.Error(), "users_username_key") {
			errResponse = fiber.Map{

				"message": "A user with this username already exists.",
				"data": fiber.Map{
					"field": "username",
				},
			}
		} else if strings.Contains(err.Error(), "users_email_key") {
			errResponse = fiber.Map{

				"message": "A user with this email already exists.",
				"data": fiber.Map{
					"field": "email",
				},
			}
		} else {
			errResponse = fiber.Map{
				"message": "Something went wrong, please try again later",
				"data":    nil,
			}
		}

		return c.Status(fiber.StatusUnauthorized).JSON(errResponse)
	}

	return c.JSON(fiber.Map{
		"user": user.ToUserResponse(),
	})

}
