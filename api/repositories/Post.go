package repositories

import (
	"proevilz/blog-api/database"
	"proevilz/blog-api/models"
	"time"
)

type PostRepository struct{}
type PostResponse struct {
	ID         uint      `json:"id"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	CoverImage string    `json:"cover_image"`
	ReadTime   int       `json:"read_time"`
	UserID     uint      `json:"user_id"`
}

func PostsToPostResponses(posts []models.Post) []PostResponse {
	postResponses := make([]PostResponse, len(posts))
	for i, post := range posts {
		postResponses[i] = PostResponse{
			ID:         post.ID,
			CreatedAt:  post.CreatedAt,
			UpdatedAt:  post.UpdatedAt,
			Title:      post.Title,
			Content:    post.Content,
			CoverImage: post.CoverImage,
			ReadTime:   post.ReadTime,
			UserID:     post.UserID,
		}
	}
	return postResponses
}

func (pr *PostRepository) AllPostsWithUsers() ([]models.Post, error) {
	var posts []models.Post
	result := database.DB.Preload("User").Find(&posts)
	if result.Error != nil {
		return []models.Post{}, result.Error
	}

	return posts, nil
}
func (pr *PostRepository) AllPosts() ([]PostResponse, error) {
	var posts []models.Post
	result := database.DB.Find(&posts)
	if result.Error != nil {
		return []PostResponse{}, result.Error
	}

	return PostsToPostResponses(posts), nil
}
func (pr *PostRepository) AddPost(post *models.Post) (*models.Post, error) {
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
