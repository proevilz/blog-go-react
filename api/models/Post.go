package models

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	ID         uint           `gorm:"primarykey" json:"id"`
	CreatedAt  time.Time      `json:"createdAt"`
	UpdatedAt  time.Time      `json:"updatedAt"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Title      string         `json:"title"`
	Slug       string         `json:"slug"`
	Content    string         `json:"content"`
	CoverImage string         `json:"coverImage"`
	ReadTime   int            `json:"readTime"`
	UserID     uint           `json:"userId"`
	Draft      bool           `json:"draft"`
	User       *User          `json:"user,omitempty"`
	Tags       []*Tags        `gorm:"many2many:post_tags;" json:"tags,omitempty"`
}
