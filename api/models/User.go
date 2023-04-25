package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	FirstName string         `json:"firstName"`
	LastName  string         `json:"lastName"`
	Avatar    string         `json:"avatar"`
	Username  string         `json:"username" gorm:"unique"`
	Email     string         `json:"email" gorm:"unique"`
	Password  string         `json:"password"`
	Posts     *[]Post        `json:"posts,omitempty"`
}
type UserResponse struct {
	ID             uint           `json:"id"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `json:"deletedAt,omitempty"`
	FirstName      string         `json:"firstName"`
	LastName       string         `json:"lastName"`
	Username       string         `json:"username"`
	Email          string         `json:"email"`
	Posts          *[]Post        `json:"posts,omitempty"`
	ExpirationTime time.Time      `json:"expirationTime"`
}

func (user *User) ToUserResponse() UserResponse {
	ExpirationTime := time.Now().Add(30 * time.Minute)
	return UserResponse{
		ID:             user.ID,
		CreatedAt:      user.CreatedAt,
		UpdatedAt:      user.UpdatedAt,
		FirstName:      user.FirstName,
		LastName:       user.LastName,
		Username:       user.Username,
		Email:          user.Email,
		Posts:          user.Posts,
		ExpirationTime: ExpirationTime,
	}
}
