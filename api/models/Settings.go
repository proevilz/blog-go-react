package models

import (
	"time"

	"gorm.io/gorm"
)

type Settings struct {
	ID                 uint           `gorm:"primarykey" json:"id"`
	DeletedAt          gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	UserId             uint           `json:"userId"`
	User               *User          `json:"user,omitempty"`
	CreatedAt          time.Time      `json:"createdAt"`
	UpdatedAt          time.Time      `json:"updatedAt"`
	DisplayEmail       *bool          `json:"displayEmail"`
	WebsiteUrl         *string        `json:"websiteUrl"`
	Location           *string        `json:"location"`
	Bio                *string        `json:"bio"`
	CurrentlyHackingOn *string        `json:"currentlyHackingOn"`
	AvailableFor       *string        `json:"availableFor"`
	CurrentlyLearning  *string        `json:"currentlyLearning"`
	SkillsLangs        *string        `json:"skillsLangs"`
	Pronouns           *string        `json:"pronouns"`
	Education          *string        `json:"education"`
	Work               *string        `json:"work"`
	FavoriteColor      *string        `json:"favoriteColor"`
}
