package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model

	Title      string `json:"title"`
	Content    string `json:"content"`
	CoverImage string `json:"cover_image"`
	ReadTime   int    `json:"read_time"`
	UserID     uint   `json:"user_id"`
	User       *User  `json:"user,omitempty"`
}
