package controllers

import (
	"proevilz/blog-api/models"
	"proevilz/blog-api/repositories"

	"github.com/gofiber/fiber/v2"
)

type PostController struct{}

func (p *PostController) AllPosts(c *fiber.Ctx) error {
	PostRepositry := &repositories.PostRepositry{}
	includeUsers := c.Query("includeUsers") == "true"
	posts, err := PostRepositry.AllPosts(includeUsers)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error getting posts",
		})

	}
	return c.JSON(fiber.Map{
		"posts": posts,
	})
}

func (p *PostController) AddPost(c *fiber.Ctx) error {
	PostRepositry := &repositories.PostRepositry{}
	post := new(models.Post)
	err := c.BodyParser(post)
	if err != nil {
		return err
	}
	post, err = PostRepositry.AddPost(post)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error adding post",
		})
	}
	return c.JSON(fiber.Map{
		"post": post,
	})

}

func (p *PostController) GetPost(c *fiber.Ctx) error {
	PostRepositry := &repositories.PostRepositry{}
	post, err := PostRepositry.GetPost(c.Params("id"))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error getting post",
		})
	}
	return c.JSON(fiber.Map{
		"post": post,
	})
}
