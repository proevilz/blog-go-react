package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"proevilz/blog-api/models"
	"proevilz/blog-api/repositories"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type PostController struct{}

func (p *PostController) AllPosts(c *fiber.Ctx) error {
	PostRepository := &repositories.PostRepository{}
	includeUsers := c.Query("includeUsers") == "true"
	var posts interface{}
	var err error
	if includeUsers {
		posts, err = PostRepository.AllPostsWithUsers()
	} else {
		posts, err = PostRepository.AllPosts()
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
	PostRepository := &repositories.PostRepository{}
	post := new(models.Post)
	err := c.BodyParser(post)
	if err != nil {
		return err
	}
	file, _ := c.FormFile("coverImageFile")
	//TODO: go routine to optimise file size and save image
	if file != nil {
		if file.Size > 5*1024*1024 {
			return c.SendStatus(http.StatusRequestEntityTooLarge)
		}
		dir, err := os.Getwd()
		if err != nil {
			log.Fatal(err)
		}
		rawFileName := strings.Split(file.Filename, ".")
		ext := rawFileName[len(rawFileName)-1]
		fileName := uuid.New().String() + "." + ext
		err = c.SaveFile(file, fmt.Sprintf("%s/static/uploads/%s", dir, fileName))
		if err != nil {
			log.Println("Error saving file:", err)
			return err
		}

		post.CoverImage = fileName
	}

	post, err = PostRepository.AddPost(post)
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
	PostRepository := &repositories.PostRepository{}
	includeUser := c.Query("includeUser") == "true"
	slug := c.Params("slug")
	var post interface{}
	var err error
	if includeUser {
		if slug != "" {
			post, err = PostRepository.GetPostWithUserBySlug(slug)
		} else {
			post, err = PostRepository.GetPostWithUser(c.Params("id"))
		}
	} else {
		if slug != "" {
			post, err = PostRepository.GetPostBySlug(slug)
		} else {
			post, err = PostRepository.GetPost(c.Params("id"))
		}
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
