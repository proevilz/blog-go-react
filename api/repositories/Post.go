package repositories

import (
	"proevilz/blog-api/database"
	"proevilz/blog-api/models"
	"time"
)

type PostRepository struct{}
type PostResponse struct {
	ID         uint            `json:"id"`
	CreatedAt  time.Time       `json:"createdAt"`
	UpdatedAt  time.Time       `json:"updatedAt"`
	Title      string          `json:"title"`
	Slug       string          `json:"slug"`
	Content    string          `json:"content"`
	CoverImage string          `json:"coverImage"`
	ReadTime   int             `json:"readTime"`
	User       UserWithoutPass `json:"user"`
}

type UserWithoutPass struct {
	ID        uint      `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
}

type PostResponseWithUser struct {
	ID         uint            `json:"id"`
	CreatedAt  time.Time       `json:"createdAt"`
	UpdatedAt  time.Time       `json:"updatedAt"`
	Title      string          `json:"title"`
	Slug       string          `json:"slug"`
	Content    string          `json:"content"`
	CoverImage string          `json:"coverImage"`
	ReadTime   int             `json:"readTime"`
	User       UserWithoutPass `json:"user"`
}

func PostsToPostResponsesSafeUser(posts []models.Post) []PostResponseWithUser {
	postResponses := make([]PostResponseWithUser, len(posts))
	for i, post := range posts {
		postResponses[i] = PostResponseWithUser{
			ID:         post.ID,
			CreatedAt:  post.CreatedAt,
			UpdatedAt:  post.UpdatedAt,
			Title:      post.Title,
			Slug:       post.Slug,
			Content:    post.Content,
			CoverImage: post.CoverImage,
			ReadTime:   post.ReadTime,
			User: UserWithoutPass{
				ID:        post.User.ID,
				CreatedAt: post.User.CreatedAt,
				UpdatedAt: post.User.UpdatedAt,
				Username:  post.User.Username,
				Email:     post.User.Email,
			},
		}
	}
	return postResponses
}

func PostsToPostResponses(posts []models.Post) []PostResponse {
	postResponses := make([]PostResponse, len(posts))
	for i, post := range posts {
		postResponses[i] = PostResponse{
			ID:         post.ID,
			CreatedAt:  post.CreatedAt,
			UpdatedAt:  post.UpdatedAt,
			Title:      post.Title,
			Slug:       post.Slug,
			Content:    post.Content,
			CoverImage: post.CoverImage,
			ReadTime:   post.ReadTime,
		}
	}
	return postResponses
}

func (pr *PostRepository) AllPostsWithUsers() ([]PostResponseWithUser, error) {
	var posts []models.Post
	result := database.DB.Order("created_at DESC").Preload("User").Find(&posts)
	if result.Error != nil {
		return []PostResponseWithUser{}, result.Error
	}

	return PostsToPostResponsesSafeUser(posts), nil
}
func (pr *PostRepository) AllPosts() ([]PostResponse, error) {
	var posts []models.Post
	result := database.DB.Order("created_at DESC").Find(&posts)
	if result.Error != nil {
		return []PostResponse{}, result.Error
	}

	return PostsToPostResponses(posts), nil
}
func (pr *PostRepository) AddPost(post *models.Post) (*models.Post, error) {
	post.UserID = 1
	result := database.DB.Create(post)
	if result.Error != nil {
		return nil, result.Error
	}

	return post, nil
}

func (pr *PostRepository) GetPost(id string) (*models.Post, error) {
	var post models.Post
	result := database.DB.First(&post, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return &post, nil
}

func (pr *PostRepository) GetPostWithUser(id string) (*models.Post, error) {
	var post models.Post
	result := database.DB.Preload("User").First(&post, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return &post, nil
}

func (pr *PostRepository) GetPostBySlug(slug string) (*models.Post, error) {
	var post models.Post
	result := database.DB.Where("slug = ?", slug).First(&post)
	if result.Error != nil {
		return nil, result.Error
	}
	return &post, nil
}

func (pr *PostRepository) GetPostWithUserBySlug(slug string) (*models.Post, error) {
	var post models.Post
	result := database.DB.Preload("User").Where("slug = ?", slug).First(&post)
	if result.Error != nil {
		return nil, result.Error
	}
	return &post, nil
}
