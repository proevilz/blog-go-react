package controllers

import (
	"proevilz/blog-api/models"
	"proevilz/blog-api/repositories"

	"github.com/gofiber/fiber/v2"
)

type PostController struct{}

func (p *PostController) AllPosts(c *fiber.Ctx) error {
	PostRepositry := &repositories.PostRepository{}
	includeUsers := c.Query("includeUsers") == "true"
	var posts interface{}
	var err error
	if includeUsers {
		posts, err = PostRepositry.AllPostsWithUsers()
	} else {
		posts, err = PostRepositry.AllPosts()
	}

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
	PostRepositry := &repositories.PostRepository{}
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
	PostRepositry := &repositories.PostRepository{}
	includeUser := c.Query("includeUser") == "true"
	var post interface{}
	var err error
	if includeUser {
		post, err = PostRepositry.GetPostWithUser(c.Params("id"))
	} else {
		post, err = PostRepositry.GetPost(c.Params("id"))
	}
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error getting post",
		})
	}
	return c.JSON(fiber.Map{
		"post": post,
	})
}
