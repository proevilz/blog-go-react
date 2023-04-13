package models

import (
	"time"
)

// Reactions model
type Reactions struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	PostID    uint      `json:"postId"`
	Post      *Post     `json:"post,omitempty"`
	UserID    uint      `json:"userId"`
	User      *User     `json:"user,omitempty"`
	Reaction  string    `json:"reaction"`
}
