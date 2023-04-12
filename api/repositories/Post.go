package repositories

import (
	"proevilz/blog-api/database"
	"proevilz/blog-api/models"
	"time"
)

type PostRepositry struct{}
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
		postResponses[i] = PostToPostResponse(post)
	}

	return postResponses
}
func PostToPostResponse(post models.Post) PostResponse {
	return PostResponse{
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

func (pr *PostRepositry) AllPosts(includeUsers bool) ([]PostResponse, []models.Post, error) {
	var posts []models.Post
	result := database.DB.Find(&posts)
	if result.Error != nil {
		return []PostResponse{}, result.Error // Corrected the syntax here
	}
	postResponses := PostsToPostResponses(posts)

	return postResponses, nil
}

func (pr *PostRepositry) AddPost(post *models.Post) (*models.Post, error) {
	result := database.DB.Create(post)
	if result.Error != nil {
		return nil, result.Error
	}

	return post, nil
}

func (pr *PostRepositry) GetPost(id string) (*models.Post, error) {
	var post models.Post
	result := database.DB.First(&post, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return &post, nil
}
