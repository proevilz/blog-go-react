package repositories

import (
	"proevilz/blog-api/database"
	"proevilz/blog-api/models"
)

type UserRepository struct{}

func (ur *UserRepository) GetAllUsers() ([]models.User, error) {
	var users []models.User

	result := database.DB.Find(&users)
	if result.Error != nil {

		return []models.User{}, result.Error
	}

	return users, nil
}
func (ur *UserRepository) GetAllUsersWithPosts() ([]models.User, error) {
	var users []models.User

	err := database.DB.Preload("Posts").Find(&users).Error
	if err != nil {
		return []models.User{}, err
	}

	return users, nil
}
func (ur *UserRepository) AddUser(user *models.User) (*models.User, error) {

	result := database.DB.Create(user)

	if result.Error != nil {
		return nil, result.Error
	}

	return user, nil
}

func (ur *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User

	result := database.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}
